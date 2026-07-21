const Joi = require("joi");

const registerSchema = Joi.object({
  full_name: Joi.string().trim().min(3).max(100).required(),

  phone: Joi.string().trim().min(10).max(15).required(),

  email: Joi.string().email().required(),

  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};