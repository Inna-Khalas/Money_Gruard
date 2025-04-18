import dotenv from 'dotenv';

dotenv.config();

export function getEnvVar(name, defaultValue) {
  const value = process.env[name];
  console.log(value);

  if (value) return value;
  console.log(value);

  if (defaultValue) return defaultValue;
  throw new Error(`Missing: process.env['${name}'].`);
}
