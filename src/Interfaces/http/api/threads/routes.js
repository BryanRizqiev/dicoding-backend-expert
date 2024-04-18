const routes = (handler) => [
  {
    method: 'POST',
    path: '/threads',
    handler: (req, h) => handler.postThreadHandler(req, h),
    options: {
      auth: 'forum_api'
    }
  },
  {
    method: 'GET',
    path: '/threads/{threadId}',
    handler: (req, h) => handler.getThreadHandler(req, h)
  }
]

module.exports = routes
