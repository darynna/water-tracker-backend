const Joi = require("joi");

const bodyValidation = Joi.object({
  waterAmount: Joi.number()
    .min(1)
    .max(5000)
    .required()
    .messages({ "any.required": "missing required waterAmount field" }),
  date: Joi.string()
    .required()
    .messages({ "any.required": "missing required date field" }),
});
const dailyNormaValidation = Joi.object({
  dailyNorma: Joi.number()
    .min(1)
    .max(15000)
    .required()
    .messages({ "any.required": "missing required dailyNorma field" }),
});

const authValidation = Joi.object({
  email: Joi.string()
    .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    .required()
    .messages({ "any.required": "not acceptable data" }),
  password: Joi.string()
    .min(4)
    .required()
    .messages({ "any.required": "not acceptable data" }),
});

const todayDatevalidation = Joi.object({
  date: Joi.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      "string.pattern.base": '"date" must be in the "yyyy-mm-dd" format',
    }),
});

const validateInput = Joi.object({
  year: Joi.number().integer().min(1900).max(2100).required(),
  month: Joi.number().integer().min(1).max(12).required(),
});

const changeUserInfoValidation = Joi.object({
  name: Joi.string()
  .min(4),
  email: Joi.string()
  .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/),
  avatarURL: Joi.string(),
  gender: Joi.string().valid('male', 'female'),
  dailyNorma: Joi.number()    
  .min(1)
  .max(15000),
  currentPassword: Joi.string().min(4),
  newPassword: Joi.string().min(4).min(4)
});

module.exports = {
  bodyValidation,
  authValidation,
  dailyNormaValidation,
  todayDatevalidation,
  validateInput,
  changeUserInfoValidation
};
