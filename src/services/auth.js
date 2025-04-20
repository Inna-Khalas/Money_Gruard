import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { UsersCollections } from '../db/models/user.js';

// register

export const registerUser = async (name, email, password) => {
  const existingUser = await UsersCollections.findOne({ email });
  if (existingUser) {
    throw createHttpError(409, 'Something went wrong', {
      error: 'Email in use',
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await UsersCollections.create({
    name,
    email,
    password: hashedPassword,
  });

  return newUser;
};

// logout

export const logoutUser = async (res) => {
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
};
