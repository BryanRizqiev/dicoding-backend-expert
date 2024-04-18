class AddedThread {
  constructor (payload) {
    this._verifyPayload(payload)

    const { id, title, body, owner, date } = payload

    this.id = id
    this.title = title
    this.body = body
    this.owner = owner
    this.date = date
  }

  _verifyPayload (payload) {
    if (this._isNotContainNeededProp(payload)) {
      throw new Error('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (this._isNotMeetDataTypeSpec(payload)) {
      throw new Error('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }

  _isNotContainNeededProp ({ id, title, body, owner, date }) {
    return !id || !title || !body || !owner || !date
  }

  _isNotMeetDataTypeSpec ({ id, title, body, owner, date }) {
    return (
      typeof id !== 'string' ||
      typeof title !== 'string' ||
      typeof body !== 'string' ||
      typeof owner !== 'string' ||
      typeof date !== 'string'
    )
  }
}

module.exports = AddedThread
