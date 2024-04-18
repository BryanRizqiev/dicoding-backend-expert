const InvariantError = require('../../../Commons/exceptions/InvariantError')
const { ThreadCommentPayloadSchema } = require('./schema')

const ThreadCommentValidator = {
  validatePayload: (payload) => {
    const validationResult = ThreadCommentPayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  }
}

module.exports = ThreadCommentValidator
