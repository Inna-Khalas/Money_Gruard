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

  const session = await SessionsCollections.create({
    userId: user._id,
    ...createSession(),
  });
  return {
    accessToken: session.accessToken,
    refreshToken: session.refreshToken,
    sessionId: session._id,
  };
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

export const refreshSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionsCollections.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Unauthorized');
  }

  const sesionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (sesionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  await SessionsCollections.deleteOne({ _id: sessionId, refreshToken });
  const sessionCreate = await SessionsCollections.create({
    userId: session.userId,
    ...createSession(),
  });

  return {
    accessToken: sessionCreate.accessToken,
    refreshToken: sessionCreate.refreshToken,
    sessionId: sessionCreate._id,
  };
};
