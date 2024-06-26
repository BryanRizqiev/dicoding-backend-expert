const AddedThreadComment = require('../AddedThreadComment')

describe('a AddedThreadComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'threadComment-123',
      content: 'abc'
    }

    // Action and Assert
    expect(() => new AddedThreadComment(payload)).toThrow('ADDED_THREAD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'threadComment-123',
      content: 'abc',
      owner: 123
    }

    // Action and Assert
    expect(() => new AddedThreadComment(payload)).toThrow('ADDED_THREAD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create addedThreadComment object correctly', () => {
    // Arrange
    const payload = {
      id: 'threadComment-123',
      content: 'abc',
      owner: 'user-123'
    }

    // Action
    const { id, content, owner } = new AddedThreadComment(payload)

    // Assert
    expect(id).toEqual(payload.id)
    expect(content).toEqual(payload.content)
    expect(owner).toEqual(payload.owner)
  })
})
