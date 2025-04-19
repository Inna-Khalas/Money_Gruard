import Joi from 'joi';

export const createTransactionSchema = Joi.object({
  comment: Joi.string().allow(''),
  type: Joi.string().valid('income', 'expense').required(),
  category: Joi.string().when('type', {
    is: 'expense',
    then: Joi.string()
      .valid(
        'Main expenses',
        'Products',
        'Car',
        'Self care',
        'Child care',
        'Household products',
        'Education',
        'Leisure',
        'Other expenses',
        'Entertainment',
      )
      .required(),
    otherwise: Joi.forbidden(),
  }),
  value: Joi.number().min(0).required(),
  date: Joi.date().required(),
});

export const putTransactionSchema = Joi.object({
    comment: Joi.string(),
    owner: Joi.string(),
    type: Joi.string().valid('expense', 'income'),
    value: Joi.number(),
    category: Joi.string().valid('Main expenses', 'Products', 'Car', 'Self care', 'Child care', 'Household products',
        'Education', 'Leisure', 'Other expenses', 'Entertainment',),
    date: Joi.date()
});