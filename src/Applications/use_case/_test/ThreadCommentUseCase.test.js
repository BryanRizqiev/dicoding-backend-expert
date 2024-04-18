const AddedThreadComment = require('../../../Domains/threadComments/entities/AddedThreadComment')
const NewThreadComment = require('../../../Domains/threadComments/entities/NewThreadComment')
const ThreadCommentRepository = require('../../../Domains/threadComments/ThreadCommentRepository')
const ThreadRepository = require('../../../Domains/threads/ThreadRepository')
const ThreadCommentUseCase = require('../ThreadCommentUseCase')

describe('ThreadCommentUseCase', () => {
  describe('when addThreadComment method invoked', () => {
    it('should orchestrate action correctly', async () => {
      // arrange
      const payload = {
        content: 'some comment'
      }

      const param = {
        threadId: 'thread-123'
      }

      const expectedAddedThreadComment = new AddedThreadComment({
        id: 'threadComment-123',
        content: payload.content,
        owner: 'user-123'
      })

      /* mocking */
      const mockThreadRepository = new ThreadRepository()
      const mockThreadCommentRepository = new ThreadCommentRepository()

      mockThreadRepository.checkThreadIsExist = jest.fn()
        .mockImplementation(() => Promise.resolve())

      mockThreadCommentRepository.addComment = jest.fn()
        .mockImplementation(() => Promise.resolve(expectedAddedThreadComment))

      /* creating use case instance */
      const threadCommentUseCase = new ThreadCommentUseCase({
        threadRepository: mockThreadRepository,
        commentRepository: mockThreadCommentRepository
      })

      // action
      const addedThreadComment = await threadCommentUseCase.addThreadComment(payload, param, expectedAddedThreadComment.owner)

      // assert
      expect(addedThreadComment).toStrictEqual(new AddedThreadComment({
        id: 'threadComment-123',
        content: payload.content,
        owner: 'user-123'
      }))

      expect(mockThreadRepository.checkThreadIsExist).toHaveBeenCalledWith(param.threadId)
      expect(mockThreadCommentRepository.addComment).toHaveBeenCalledWith(new NewThreadComment({
        content: payload.content,
        owner: expectedAddedThreadComment.owner,
        threadId: param.threadId
      }))
    })
  })

  describe('when deleteThreadComment method invoked', () => {
    it('should orchestrate action correctly', async () => {
      // arrange
      const param = {
        threadId: 'thread-123',
        commentId: 'threadComment-123'
      }

      const userId = 'user-123'

      /* mocking */
      const mockThreadCommentRepository = new ThreadCommentRepository()

      mockThreadCommentRepository.checkCommentIsExist = jest.fn()
        .mockImplementation(() => Promise.resolve())
      mockThreadCommentRepository.verifyCommentAccess = jest.fn()
        .mockImplementation(() => Promise.resolve())
      mockThreadCommentRepository.deleteCommentById = jest.fn()
        .mockImplementation(() => Promise.resolve())

      /* creating use case instance */
      const threadCommentUseCase = new ThreadCommentUseCase({
        threadRepository: {},
        commentRepository: mockThreadCommentRepository
      })

      // action
      await threadCommentUseCase.deleteThreadComment(param, userId)

      // assert
      expect(mockThreadCommentRepository.checkCommentIsExist).toHaveBeenCalledWith(param.threadId, param.commentId)
      expect(mockThreadCommentRepository.verifyCommentAccess).toHaveBeenCalledWith(param.commentId, userId)
      expect(mockThreadCommentRepository.deleteCommentById).toHaveBeenCalledWith(param.commentId)
    })
  })
})
