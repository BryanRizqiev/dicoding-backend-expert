const NewThreadComment = require('../../Domains/threadComments/entities/NewThreadComment')

class ThreadCommentUseCase {
  constructor ({
    threadRepository,
    commentRepository
  }) {
    this._threadRepository = threadRepository
    this._commentRepository = commentRepository
  }

  async addThreadComment (payload, param, userId) {
    const { threadId } = param

    await this._threadRepository.checkThreadIsExist(threadId)
    const newComment = new NewThreadComment({ ...payload, owner: userId, threadId })

    return this._commentRepository.addComment(newComment)
  }

  async deleteThreadComment (param, userId) {
    const { threadId, commentId } = param

    await this._commentRepository.checkCommentIsExist(threadId, commentId)
    await this._commentRepository.verifyCommentAccess(commentId, userId)
    await this._commentRepository.deleteCommentById(commentId)
  }
}
module.exports = ThreadCommentUseCase
