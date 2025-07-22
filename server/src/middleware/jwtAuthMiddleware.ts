import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' })
    }

    const [bearer, token] = authHeader.split(' ');
    
    if (bearer !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'Invalid token format' })
    }

    const decoded = jwt.verify(token, process.env.SECRET_JWT!) as UserPayload;
    req.user = decoded
    
    return next()
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Token expired' })
    }

    if (e instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token' })
    }

    console.error('Authentication error:', e);
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}
