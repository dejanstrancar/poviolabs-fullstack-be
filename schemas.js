const Joi = require("joi");

const signupDataSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string()
    .min(7)
    .required()
    .strict()
});

const login = signupDataSchema;

const changePasswordDataSchema = Joi.object({
  password: Joi.string()
    .min(7)
    .required()
    .strict()
});

module.exports = {
  "/signup": signupDataSchema,
  "/login": login,
  "/me/update-password": changePasswordDataSchema
};
