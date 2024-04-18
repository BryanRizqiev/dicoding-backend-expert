const ThreadUsecase = require('../../../../Applications/use_case/ThreadUseCase')

class ThreadsHandler {
  constructor (container) {
    this._container = container
  }

  async postThreadHandler (req, h) {
    const threadUsecase = this._container.getInstance(ThreadUsecase.name)
    const { auth, payload } = req

    const addedThread = await threadUsecase.addThread(payload, auth.credentials.id)

    const res = h.response({
      status: 'success',
      data: {
        addedThread
      }
    }).code(201)

    return res
  }

  async getThreadHandler (req, h) {
    const threadUsecase = this._container.getInstance(ThreadUsecase.name)
    const { params } = req

    const detailThread = await threadUsecase.getThread(params)

    const res = h.response({
      status: 'success',
      data: {
        thread: detailThread
      }
    })

    return res
  }
}

module.exports = ThreadsHandler
