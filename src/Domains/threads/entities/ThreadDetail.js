class ThreadDetail {
  constructor (payload) {
    this._verifyPayload(payload)

    const { id, title, body, date, username, comments } = payload

    this.id = id
    this.title = title
    this.body = body
    this.date = date
    this.username = username
    this.comments = comments
  }

  _verifyPayload (payload) {
    if (this._isNotContainNeededProp(payload)) {
      throw new Error('DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (this._isNotMeetDataTypeSpec(payload)) {
      throw new Error('DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }

  _isNotContainNeededProp ({ id, title, body, date, username, comments }) {
    return !id || !title || !body || !date || !username || !comments
  }

  _isNotMeetDataTypeSpec ({ id, title, body, date, username, comments }) {
    return (
      typeof id !== 'string' ||
      typeof title !== 'string' ||
      typeof body !== 'string' ||
      typeof date !== 'string' ||
      typeof username !== 'string' ||
      !(Array.isArray(comments))
    )
  }
}

module.exports = ThreadDetail
