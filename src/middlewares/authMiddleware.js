import jwt from 'jsonwebtoken';
import { UsersCollections } from '../db/models/user.js';

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UsersCollections.findById(id);

    if (!user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log(err);

    res.status(401).json({ message: 'Invalid token' });
  }
};
