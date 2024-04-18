const ThreadCommentRepository = require('../ThreadCommentRepository')

describe('ThreadCommentRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const threadCommentRepository = new ThreadCommentRepository()

    // Action and Assert
    await expect(threadCommentRepository.addComment('')).rejects.toThrow('THREAD_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    await expect(threadCommentRepository.getCommentsByThreadId('')).rejects.toThrow('THREAD_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    await expect(threadCommentRepository.verifyCommentAccess({})).rejects.toThrow('THREAD_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    await expect(threadCommentRepository.deleteCommentById('')).rejects.toThrow('THREAD_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    await expect(threadCommentRepository.checkCommentIsExist('', '')).rejects.toThrow('THREAD_COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  })
})
