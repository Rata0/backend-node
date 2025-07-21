import { Request, Response, NextFunction } from 'express';
import CustomError from '../error/СustomError';
import User from '../models/user';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../utils/jwt';
import { AuthenticatedRequest } from '../middleware/jwtAuthMiddleware';

class userController {
  static async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email }})

    if (!user) {
      return next(CustomError.badRequest('The user with this email address is not registered'))
    }

    const checkPassword = bcrypt.compareSync(password, user.password)

    if (!checkPassword) {
      return next(CustomError.badRequest('Invalid password'))
    }

    const jwtToken = generateJwtToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });

    res.json(jwtToken)
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    const { name, email, password, role } = req.body

    if (!name || !email || !password) {
      return next(CustomError.badRequest('Invalid email, name, password'));
    }

    const existingUser = await User.findOne({ where: { email } })

    if (existingUser) {
      return next(CustomError.badRequest('The user with this email exists'));
    }

    const hashPassword = await bcrypt.hash(password, 12)

    const user = await User.create({ 
      name, 
      email, 
      password: hashPassword, 
      role: role || 'USER' 
    })

    const jwtToken = generateJwtToken({
      id: user.id,
      name,
      email,
      role,
    });

    return res.json({ token: jwtToken })
  }

  static async check(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    if (!req.user) {
      return next(CustomError.unauthorized('User not authenticated'));
    }
    
    const { id, name, email, role } = req.user;
    const jwtToken = generateJwtToken({ id, name, email, role });

    return res.status(200).json({ token: jwtToken })
  }
}

export default userController
