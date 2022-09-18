const Joi = require("@hapi/joi");

// // registerValidation
// stckover flow
// const Joi = require("@hapi/joi");

// const registerValidation = () => {
const registerValidationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().min(4).required().email(),
  password: Joi.string().min(6).required(),
});
//   return registerValidationSchema;
// };
const logginValidation = Joi.object({
  email: Joi.string().min(4).required().email(),
  password: Joi.string().min(6).required(),
});

module.exports = { registerValidationSchema, logginValidation };
