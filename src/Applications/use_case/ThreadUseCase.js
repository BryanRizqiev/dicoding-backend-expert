const NewThread = require('../../Domains/threads/entities/NewThread')

class ThreadUsecase {
  constructor ({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository
    this._commentRepository = commentRepository
  }

  async addThread (payload, userId) {
    const newThread = new NewThread({ ...payload, owner: userId })

    return this._threadRepository.addThread(newThread)
  }

  async getThread (param) {
    const { threadId } = param

    await this._threadRepository.checkThreadIsExist(threadId)
    const threadDetail = await this._threadRepository.getThreadById(threadId)
    threadDetail.comments = await this._commentRepository.getCommentsByThreadId(threadId)

    threadDetail.comments.forEach((data) => {
      data.content = data.isDeleted ? '**komentar telah dihapus**' : data.content
      delete data.isDeleted
    })

    return threadDetail
  }
}

module.exports = ThreadUsecase
