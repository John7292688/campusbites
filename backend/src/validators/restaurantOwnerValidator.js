const Joi = require("joi");

const registerRestaurantOwnerSchema = Joi.object({
  full_name: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required(),

  phone: Joi.string()
    .trim()
    .min(10)
    .max(15)
    .required(),

  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .min(8)
    .required(),
});

const loginRestaurantOwnerSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .required(),

  fcmToken: Joi.string()
    .allow("", null),
});

const ownerForgotPasswordSchema =
  Joi.object({
    email: Joi.string()
      .email()
      .required(),
  });

const ownerVerifyOtpSchema =
  Joi.object({
    email: Joi.string()
      .email()
      .required(),

    otp: Joi.string()
      .length(6)
      .required(),
  });

const ownerResetPasswordSchema =
  Joi.object({
    email: Joi.string()
      .email()
      .required(),

    otp: Joi.string()
      .length(6)
      .required(),

    password: Joi.string()
      .min(8)
      .required(),

    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only":
          "Passwords do not match",
      }),
  });

module.exports = {
  registerRestaurantOwnerSchema,
  loginRestaurantOwnerSchema,
  ownerForgotPasswordSchema,
  ownerVerifyOtpSchema,
  ownerResetPasswordSchema,
};