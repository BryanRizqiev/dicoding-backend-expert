class DetailThreadComment {
  constructor (payload) {
    this._verifyPayload(payload)

    const { id, username, date, content, isDeleted } = payload

    this.id = id
    this.username = username
    this.date = date
    this.content = content
    this.isDeleted = isDeleted
  }

  _verifyPayload (payload) {
    if (this._isNotContainNeededProp(payload)) {
      throw new Error('DETAIL_THREAD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
    }
    if (this._isNotMeetDataTypeSpec(payload)) {
      throw new Error('DETAIL_THREAD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }

  _isNotContainNeededProp ({ id, username, date, content, isDeleted }) {
    return !id || !username || !date || !content || isDeleted === undefined
  }

  _isNotMeetDataTypeSpec ({ id, username, date, content, isDeleted }) {
    return (
      typeof id !== 'string' ||
      typeof username !== 'string' ||
      typeof date !== 'string' ||
      typeof content !== 'string' ||
      typeof isDeleted !== 'boolean'
    )
  }
}

module.exports = DetailThreadComment
