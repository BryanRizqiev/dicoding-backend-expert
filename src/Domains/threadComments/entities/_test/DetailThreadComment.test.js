const DetailThreadComment = require('../DetailThreadComment')

describe('a DetailThreadComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'threadComment-123',
      username: 'abc',
      date: new Date().toISOString(),
      content: 'bryan'
    }

    // Action and Assert
    expect(() => new DetailThreadComment(payload)).toThrow('DETAIL_THREAD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'threadComment-123',
      username: 'abc',
      date: new Date().toISOString(),
      content: 'bryan',
      isDeleted: 'true'
    }

    // Action and Assert
    expect(() => new DetailThreadComment(payload)).toThrow('DETAIL_THREAD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create detailThreadComment object correctly', () => {
    // Arrange
    const payload = {
      id: 'threadComment-123',
      username: 'abc',
      date: new Date().toISOString(),
      content: 'some content',
      isDeleted: true
    }

    // Action
    const { id, username, date, content, isDeleted } = new DetailThreadComment(payload)

    // Assert
    expect(id).toEqual(payload.id)
    expect(username).toEqual(payload.username)
    expect(date).toEqual(payload.date)
    expect(content).toEqual(payload.content)
    expect(isDeleted).toEqual(payload.isDeleted)
  })
})
