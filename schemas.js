const Joi = require("joi");

const signupDataSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string()
    .min(7)
    .required()
    .strict()
});

module.exports = {
  "/signup": signupDataSchema,
  "/login": signupDataSchema
};
