const Joi = require("joi");

const registerRestaurantOwnerSchema = Joi.object({
  full_name: Joi.string().trim().min(3).max(100).required(),

  phone: Joi.string().trim().min(10).max(15).required(),

  email: Joi.string().email().required(),

  password: Joi.string().min(8).required(),
});

const loginRestaurantOwnerSchema = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string().required(),
});

module.exports = {
  registerRestaurantOwnerSchema,
  loginRestaurantOwnerSchema,
};