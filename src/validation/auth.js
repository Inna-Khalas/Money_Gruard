import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().max(64).required(),
  password: Joi.string().min(8).max(64).required(),
});
