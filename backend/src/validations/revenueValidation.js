const Joi = require("joi");
const { formatJoiErrors } = require("../utils/messages");

const create = async (req, res, next) => {
  const schema = Joi.object({
    amount: Joi.number().positive().required(),
    source: Joi.string().valid('POS', 'EATCLUB','LABOUR').required(),
    date: Joi.date().required()
  });
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(400).json(formatJoiErrors(error));
  }
};
const update = async (req, res, next) => {
  const schema = Joi.object({
    amount: Joi.number().positive(),
    source: Joi.string().valid('POS', 'EATCLUB','LABOUR'),
    date: Joi.date()
  });
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(400).json(formatJoiErrors(error));
  }
};
module.exports = {
  create,
  update,
};