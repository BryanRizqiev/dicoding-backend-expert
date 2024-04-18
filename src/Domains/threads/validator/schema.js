const Joi = require('joi')

const ThreadPayloadSchema = Joi.object({
  title: Joi.string().required().max(64),
  body: Joi.string().required(),
  owner: Joi.string().required().max(36)
})

module.exports = { ThreadPayloadSchema }
