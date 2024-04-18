const ThreadValidator = require('../validator')

class NewThreadComment {
  constructor (payload) {
    ThreadValidator.validatePayload(payload)

    const { content, owner, threadId } = payload

    this.content = content
    this.owner = owner
    this.threadId = threadId
  }
}

module.exports = NewThreadComment
