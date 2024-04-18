const Joi = require('joi')

const ThreadCommentPayloadSchema = Joi.object({
  content: Joi.string().required(),
  owner: Joi.string().required().max(36),
  threadId: Joi.string().required().max(36)
})

module.exports = { ThreadCommentPayloadSchema }
