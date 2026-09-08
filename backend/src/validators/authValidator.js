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

const verifyOtpSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().length(6).required(),
});

const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().length(6).required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Passwords do not match",
    }),
});

module.exports = {
  registerSchema,
  loginSchema,
  verifyOtpSchema,
  resetPasswordSchema,
};