import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: number | undefined,
  name: string,
  email: string,
  role: string,
}

export const generateJwtToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, 'testsds', { expiresIn: '1h' })
}
