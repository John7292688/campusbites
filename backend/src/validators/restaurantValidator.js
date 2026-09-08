const Joi = require("joi");

const createRestaurantSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),

  description: Joi.string().trim().allow("", null),

  location: Joi.string().trim().max(255).required(),

  phone: Joi.string().trim().min(10).max(15).required(),

  image_url: Joi.string().uri().allow(null, ""),

  logo_url: Joi.string().uri().allow(null, ""),
});

module.exports = {
  createRestaurantSchema,
};