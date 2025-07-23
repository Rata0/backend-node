import { Request, Response } from 'express';

import CustomError from '../error/СustomError';

export default (error: Error, req: Request, res: Response) => {
  if (error instanceof CustomError) {
    return res.status(error.status).json({ message: error.message });
  }

  return res.status(500).json({ message: 'Unhandled error'});
};
