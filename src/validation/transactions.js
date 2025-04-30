import Joi from 'joi';
import mongoose from 'mongoose';

                       //       export const createTransactionSchema = Joi.object({
                       //         comment: Joi.string().allow(''),
                       //         type: Joi.string().valid('income', 'expense').required(),
                       //         category: Joi.string().when('type', {
                       //           is: 'expense',
                       //           then: Joi.string()
                       //             .valid(
                       //               'Main expenses',
                       //               'Products',
                       //               'Car',
                       //               'Self care',
                       //               'Child care',
                       //               'Household products',
                       //               'Education',
                       //               'Leisure',
                       //               'Other expenses',
                       //               'Entertainment',
                       //             )
                       //             .required(),
                       //           otherwise: Joi.forbidden(),
                       //         }),
                       //         value: Joi.number().min(0).required(),
                       //         date: Joi.date().required(),
                      //       });
                       
const objectIdValidator = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
}, 'ObjectId Validation');

export const createTransactionSchema = Joi.object({
  comment: Joi.string().allow(''),
  type: Joi.string().valid('income', 'expense').required(),
  category: Joi.when('type', {
    is: 'expense',
    then: objectIdValidator.required(), // category должен быть валидным ObjectId
    otherwise: Joi.forbidden(),
  }),
  value: Joi.number().min(0).required(),
  date: Joi.date().required(),
});

              ///        export const putTransactionSchema = Joi.object({
              ///            comment: Joi.string(),
              ///            owner: Joi.string(),
              ///            type: Joi.string().valid('expense', 'income'),
              ///            value: Joi.number(),
              ///            category: Joi.string().valid('Main expenses', 'Products', 'Car', 'Self care', 'Child care', 'Household products',
              ///                'Education', 'Leisure', 'Other expenses', 'Entertainment',),
              ///            date: Joi.date()
              ///        });
              export const putTransactionSchema = Joi.object({
  comment: Joi.string(),
  owner: Joi.string(), 
  type: Joi.string().valid('expense', 'income'),

  value: Joi.number().min(0), //  минимальное значение — неотрицательное

  category: Joi.string()
    .hex()
    .length(24)
    .when('type', {
      is: 'expense',
      then: Joi.required(),
      otherwise: Joi.forbidden(), 
    }),

  date: Joi.date().required(), 
});