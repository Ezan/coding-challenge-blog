import { AuthenticationError } from 'apollo-server-express';
import * as jwt from 'jsonwebtoken';

export default (context: any) => {
  const authHeader = context.req.header.authorization;

  if (authHeader) {
    const token = authHeader.split(`Bearer `)[1];
    if (token) {
      try {
        const user = jwt.verify(token, 'secret');
        return user;
      } catch (err: any) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }
    throw new Error('Authenticatio token must be valid');
  }
};
