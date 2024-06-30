import * as Joi from 'joi';

export const createUserJoiValidation = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': `"name" cannot be an empty field`,
    'any.required': `"name" is a required field`,
  }),
  email: Joi.string().trim().required().messages({
    'string.empty': `"email" cannot be an empty field`,
    'any.required': `"email" is a required field`,
  }),
  password: Joi.string().trim().required().messages({
    'string.empty': `"password" cannot be an empty field`,
    'any.required': `"password" is a required field`,
  }),
  mobile: Joi.string().trim().required().messages({
    'string.empty': `"mobile" cannot be an empty field`,
    'any.required': `"mobile" is a required field`,
  }),
  image: Joi.string().optional(),
});

export const loginUserJoiValidation = Joi.object({
  email: Joi.string().trim().required().messages({
    'string.empty': `"email" cannot be an empty field`,
    'any.required': `"email" is a required field`,
  }),
  password: Joi.string().trim().required().messages({
    'string.empty': `"password" cannot be an empty field`,
    'any.required': `"password" is a required field`,
  }),

});

export const updateUserJoiValidation = Joi.object({
  name: Joi.string().trim().optional(),
  email: Joi.string().trim().optional(),
  password: Joi.string().trim().optional(),
  mobile: Joi.string().trim().optional(),
  image: Joi.string().optional(),
});
