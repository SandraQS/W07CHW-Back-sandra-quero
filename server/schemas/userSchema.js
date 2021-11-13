const { Joi } = require("express-validation");

const userLoginValidation = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  userLoginValidation,
};
