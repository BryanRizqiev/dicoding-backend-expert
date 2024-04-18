const NewThreadComment = require('../NewThreadComment')

describe('a NewThreadComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      content: 'abc'
    }
    // Action and Assert
    expect(() => new NewThreadComment(payload)).toThrow('"owner" is required')
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      content: 123,
      owner: 'abcde',
      threadId: 'thread-123'
    }

    // Action and Assert
    expect(() => new NewThreadComment(payload)).toThrow('"content" must be a string')
  })

  it('should throw error when ower contains more than 64 character', () => {
    // Arrange
    const payload = {
      content: 'oke',
      owner: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      threadId: 'thread-123'
    }

    // Action and Assert
    expect(() => new NewThreadComment(payload)).toThrow('"owner" length must be less than or equal to 36 characters long')
  })

  it('should create newThreadComment object correctly', () => {
    // Arrange
    const payload = {
      content: 'oke',
      owner: 'abcde',
      threadId: 'thread-123'
    }

    // Action
    const { content, owner, threadId } = new NewThreadComment(payload)

    // Assert
    expect(content).toEqual(payload.content)
    expect(owner).toEqual(payload.owner)
    expect(threadId).toEqual(payload.threadId)
  })
})
