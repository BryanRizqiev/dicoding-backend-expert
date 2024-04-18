const routes = (handler) => [
  {
    method: 'POST',
    path: '/threads/{threadId}/comments',
    handler: (req, h) => handler.postThreadCommentHandler(req, h),
    options: {
      auth: 'forum_api'
    }
  },
  {
    method: 'DELETE',
    path: '/threads/{threadId}/comments/{commentId}',
    handler: (req, h) => handler.deleteCommentHandler(req, h),
    options: {
      auth: 'forum_api'
    }
  }
]

module.exports = routes
