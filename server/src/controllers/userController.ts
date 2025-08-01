import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';

import sequelize from '../db';
import CustomError from '../error/СustomError';
import { AuthenticatedRequest } from '../middleware/jwtAuthMiddleware';
import Cart from '../models/cartModel';
import User from '../models/userModel';
import { generateJwtToken } from '../utils/jwt';
import { UserCreateSchema } from '../validators/user.schema';

class userController {
  static async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email }});

    if (!user) {
      return next(CustomError.badRequest('The user with this email address is not registered'));
    }

    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword) {
      return next(CustomError.badRequest('Invalid password'));
    }

    const jwtToken = generateJwtToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });

    return res.json({ token: jwtToken });
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    const validation = UserCreateSchema.safeParse(req.body);

    if (!validation.success) {
      return next(CustomError.badRequest('Invalid data'));
    }

    const { name, email, password, role } = validation.data;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return next(CustomError.badRequest('The user with this email exists'));
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const transaction = await sequelize.transaction();

    try {
      const user = await User.create({ 
        name, 
        email, 
        password: hashPassword, 
        role: role || 'USER' 
      });

      if (!user.id) {
        throw new Error('User ID is undefined');
      }

      await Cart.create({ user_id: user.id });

      const jwtToken = generateJwtToken({ id: user.id, name, email, role: user.role });

      return res.json({ token: jwtToken });
    } catch (e) {
      transaction.rollback();
      console.error('Registration error:', e);
      return next(CustomError.internal('Registration failed'));
    }
  }

  static async check(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    if (!req.user) {
      return next(CustomError.unauthorized('User not authenticated'));
    }
    
    const { id, name, email, role } = req.user;
    const jwtToken = generateJwtToken({ id, name, email, role });

    return res.status(200).json({ token: jwtToken });
  }
}

export default userController;
