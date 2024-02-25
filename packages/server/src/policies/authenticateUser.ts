/**
 * @module authenticateUser
 * Middleware used to check for valid auth credentials
 */
/* external dependencies */
import type { NextFunction, Request, Response } from 'express';

export function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.headers.authorization) {
    const auth = req.headers.authorization.split(' ')[1];
    const [user, password] = Buffer.from(auth, 'base64').toString().split(':');

    if (user === process.env.USERNAME && password === process.env.PASSWORD) {
      return next();
    }
  }

  res.set('WWW-Authenticate', 'Basic realm=server_credentials');

  return res.status(401).json({
    title: 'Authentication required.',
    type: 'UNAUTHORIZED',
    status: 401,
  });
}
