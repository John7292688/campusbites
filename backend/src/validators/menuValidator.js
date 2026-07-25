const Joi = require("joi");

const createMenuItemSchema = Joi.object({
  restaurant_id: Joi.number()
    .integer()
    .positive()
    .required(),

  menu_category_id: Joi.number()
    .integer()
    .positive()
    .required(),

  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required(),

  price: Joi.number()
    .positive()
    .required(),

  unit: Joi.string()
    .trim()
    .max(50)
    .required(),

  is_available: Joi.boolean().default(true),
});

module.exports = {
  createMenuItemSchema,
};