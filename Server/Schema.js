const joi = require("joi");

const joiSchema = joi.object({
  bookName: joi.string().required(),
  author: joi.string().required(),
  publicationYear: joi.number().required(),
  image: joi.string().required(),
  description: joi.string().required(),
  rating: joi.string().required().min(1).max(5),
});

module.exports = joiSchema;