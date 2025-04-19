import bcrypt from 'bcrypt';
import { UsersCollections } from '../db/models/user.js';

export const registerUser = async (name, email, password) => {
  const existingUser = await UsersCollections.findOne({ email });
  if (existingUser) {
    throw new Error('Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await UsersCollections.create({
    name,
    email,
    password: hashedPassword,
  });

  return newUser;
};
