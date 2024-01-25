const Joi = require('joi');

const bodyValidation = Joi.object({
    name: Joi.string()
      .min(2)
      .required()
      .messages({ "any.required": "missing required name field" }),
    email: Joi.string()
      .min(4)
      .required()
      .messages({ "any.required": "missing required email field" }),
    phone: Joi.string()
      .required()
      .min(6)
      .messages({ "any.required": "missing required phone field" }),
      favorite: Joi.boolean(),
      
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
    authValidation
  };


  