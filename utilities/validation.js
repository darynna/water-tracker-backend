const Joi = require("joi");
// const convertTimeToDateTime = require("../utilities/validateTime");

const bodyValidation = Joi.object({
  waterAmount: Joi.number()
    .min(1)
    .max(5000)
    .required()
    .messages({ "any.required": "missing required waterAmount field" }),
  date: Joi
    // .custom(convertTimeToDateTime,  'custom validation')
    .string()
    .required()
    .messages({ "any.required": "missing required date field" }),
});
const dailyNormaValidation = Joi.object({
  dailyNorma: Joi.number()
    .min(1)
    .max(15000)
    .required()
    .messages({ "any.required": "missing required dailyNorma field" }),
  // gender: Joi.string()
  //   .required()
  //   .messages({ "any.required": "missing required gender field" }),
  // weight: Joi.number()
  //   .min(1)
  //   .max(200)
  //   .required()
  //   .messages({ "any.required": "missing required weight field" }),
  // time: Joi.number()
  //   .min(1)
  //   .max(24)
  //   .required()
  //   .messages({ "any.required": "missing required time field" }),
  // yourAmountWater: Joi.number().min(1).max(15000),
});

const authValidation = Joi.object({
  email: Joi.string()
    .min(4)
    .required()
    .messages({ "any.required": "not acceptable data" }),
  password: Joi.string()
    .min(4)
    .required()
    .messages({ "any.required": "not acceptable data" }),
});

module.exports = {
  bodyValidation,
  authValidation,
  dailyNormaValidation,
};
