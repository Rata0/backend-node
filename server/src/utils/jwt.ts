import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: number | undefined,
  name: string,
  email: string,
  role: string,
}

export const generateJwtToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, process.env.SECRET_JWT!, { expiresIn: '1h' })
}
