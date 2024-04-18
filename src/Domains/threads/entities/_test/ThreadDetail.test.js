const ThreadDetail = require('../ThreadDetail')

describe('a ThreadDetail entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'abc',
      body: 'abcde',
      username: 'bryan'
    }

    // Action and Assert
    expect(() => new ThreadDetail(payload)).toThrow('DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      title: 'abc',
      body: 'abcde',
      date: new Date().toISOString(),
      username: 'bryan',
      comments: 'falsecomment'
    }

    // Action and Assert
    expect(() => new ThreadDetail(payload)).toThrow('DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create threadDetail object correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'abc',
      body: 'abcde',
      date: new Date().toISOString(),
      username: 'bryan',
      comments: []
    }

    // Action
    const { id, title, body, date, username, comments } = new ThreadDetail(payload)

    // Assert
    expect(id).toEqual(payload.id)
    expect(title).toEqual(payload.title)
    expect(body).toEqual(payload.body)
    expect(date).toEqual(payload.date)
    expect(username).toEqual(payload.username)
    expect(comments).toStrictEqual(payload.comments)
  })
})
