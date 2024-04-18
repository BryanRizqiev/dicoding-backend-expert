const ThreadCommentUseCase = require('../../../../Applications/use_case/ThreadCommentUseCase')

class ThreadCommentsHandler {
  constructor (container) {
    this._container = container
  }

  async postThreadCommentHandler (req, h) {
    const threadCommentUsecase = this._container.getInstance(ThreadCommentUseCase.name)
    const { auth, params, payload } = req

    const addedComment = await threadCommentUsecase.addThreadComment(payload, params, auth.credentials.id)

    const res = h.response({
      status: 'success',
      data: {
        addedComment
      }
    }).code(201)

    return res
  }

  async deleteCommentHandler (req, h) {
    const threadCommentUsecase = this._container.getInstance(ThreadCommentUseCase.name)
    const { auth, params } = req

    await threadCommentUsecase.deleteThreadComment(params, auth.credentials.id)

    const res = h.response({
      status: 'success'
    })

    return res
  }
}

module.exports = ThreadCommentsHandler
