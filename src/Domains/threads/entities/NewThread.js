const ThreadValidator = require('../validator')

class NewThread {
  constructor (payload) {
    ThreadValidator.validatePayload(payload)

    const { title, body, owner } = payload

    this.title = title
    this.body = body
    this.owner = owner
  }
}

module.exports = NewThread
