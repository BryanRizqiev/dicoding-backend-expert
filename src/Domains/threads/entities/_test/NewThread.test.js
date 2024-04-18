const NewThread = require('../NewThread')

describe('a NewThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'abc'
    }
    // Action and Assert
    expect(() => new NewThread(payload)).toThrow('"body" is required')
  })

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      title: 123,
      body: 'abcde'
    }

    // Action and Assert
    expect(() => new NewThread(payload)).toThrow('"title" must be a string')
  })

  it('should throw error when username contains more than 64 character', () => {
    // Arrange
    const payload = {
      title: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      body: 'abcde'
    }

    // Action and Assert
    expect(() => new NewThread(payload)).toThrow('"title" length must be less than or equal to 64 characters long')
  })

  it('should create newThread object correctly', () => {
    // Arrange
    const payload = {
      title: 'abc',
      body: 'abcde',
      owner: 'user-123'
    }

    // Action
    const { title, body, owner } = new NewThread(payload)

    // Assert
    expect(title).toEqual(payload.title)
    expect(body).toEqual(payload.body)
    expect(owner).toEqual(payload.owner)
  })
})
