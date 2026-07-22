const Joi = require("joi");

const createMenuItemSchema = Joi.object({
  restaurant_id: Joi.number().integer().positive().required(),

  name: Joi.string().trim().min(2).max(100).required(),

  description: Joi.string().trim().allow("", null),

  price: Joi.number().positive().required(),

  image_url: Joi.string().uri().allow("", null),
});

module.exports = {
  createMenuItemSchema,
};