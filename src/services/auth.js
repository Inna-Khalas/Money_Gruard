import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { UsersCollections } from '../db/models/user.js';
import { SessionsCollections } from '../db/models/session.js';
import { createSession } from '../utils/createSession.js';

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

// login

export const loginUser = async (payload) => {
  const user = await UsersCollections.findOne({ email: payload.email });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await SessionsCollections.deleteOne({ userId: user._id });

  return await SessionsCollections.create({
    userId: user._id,
    ...createSession(),
  });
};

// logout

export const logoutUser = async (res) => {
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
};

// Update User

export const updateUser = async (id, payload = {}) => {
  const rawResult = await UsersCollections.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (!rawResult) {
    return null;
  }

  return rawResult;
};
