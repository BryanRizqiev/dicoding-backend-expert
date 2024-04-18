class AddedThreadComment {
  constructor (payload) {
    this._verifyPayload(payload)
    const { id, content, owner } = payload

    this.id = id
    this.content = content
    this.owner = owner
  }

  _verifyPayload (payload) {
    if (this._isNotContainNeededProp(payload)) {
      throw new Error('ADDED_THREAD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
    }
    if (this._isNotMeetDataTypeSpec(payload)) {
      throw new Error('ADDED_THREAD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }

  _isNotContainNeededProp ({ id, content, owner }) {
    return !id || !content || !owner
  }

  _isNotMeetDataTypeSpec ({ id, content, owner }) {
    return (
      typeof id !== 'string' ||
      typeof content !== 'string' ||
      typeof owner !== 'string'
    )
  }
}

module.exports = AddedThreadComment
