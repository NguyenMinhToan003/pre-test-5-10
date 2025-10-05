const Joi = require('joi');
const { formatJoiErrors } = require('../utils/messages');

const login = async (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().email().required(),
    password: Joi.string().min(1).required()
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(400).json(formatJoiErrors(error));
  }
};

module.exports = { login };
