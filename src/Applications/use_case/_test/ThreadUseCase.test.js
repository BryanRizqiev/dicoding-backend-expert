const DetailThreadComment = require('../../../Domains/threadComments/entities/DetailThreadComment')
const ThreadCommentRepository = require('../../../Domains/threadComments/ThreadCommentRepository')
const AddedThread = require('../../../Domains/threads/entities/AddedThread')
const NewThread = require('../../../Domains/threads/entities/NewThread')
const ThreadDetail = require('../../../Domains/threads/entities/ThreadDetail')
const ThreadRepository = require('../../../Domains/threads/ThreadRepository')
const ThreadUseCase = require('../ThreadUseCase')

describe('ThreadUseCase', () => {
  describe('when addThread method invoked', () => {
    it('should orchestrate action correctly', async () => {
      // arrange
      const payload = {
        title: 'some title',
        body: 'some body'
      }

      const date = new Date().toISOString()

      const expectedAddedThread = new AddedThread({
        id: 'thread-123',
        title: 'some title',
        body: 'some body',
        owner: 'user-123',
        date
      })

      /* mocking */
      const mockThreadRepository = new ThreadRepository()

      mockThreadRepository.addThread = jest.fn()
        .mockImplementation(() => Promise.resolve(
          expectedAddedThread
        ))

      /* creating use case instance */
      const threadUseCase = new ThreadUseCase({
        threadRepository: mockThreadRepository,
        commentRepository: {}
      })

      // action
      const addedThread = await threadUseCase.addThread(payload, expectedAddedThread.owner)

      // assert
      expect(addedThread).toStrictEqual(new AddedThread({
        id: 'thread-123',
        title: 'some title',
        body: 'some body',
        owner: 'user-123',
        date
      }))

      expect(mockThreadRepository.addThread).toHaveBeenCalledWith(new NewThread({
        title: payload.title,
        body: payload.body,
        owner: expectedAddedThread.owner
      }))
    })
  })

  describe('when getThread method invoked', () => {
    it('should orchestrate action correctly', async () => {
      // arrange
      const param = {
        threadId: 'thread-123'
      }

      const date = new Date().toISOString()

      /* detail thread */
      const detailThreadRetrieved = new ThreadDetail({
        id: 'thread-123',
        title: 'some title',
        body: 'some body',
        date,
        username: 'Bryan',
        comments: []
      })

      const expectedDetailThread = new ThreadDetail({
        id: 'thread-123',
        title: 'some title',
        body: 'some body',
        date,
        username: 'Bryan',
        comments: []
      })

      const commentsRetrieved = [
        new DetailThreadComment({
          id: 'threadComment-123',
          username: 'user 1',
          date,
          content: 'comment 1',
          isDeleted: false
        }),
        new DetailThreadComment({
          id: 'threadComment-234',
          username: 'user 2',
          date,
          content: 'comment 2',
          isDeleted: true
        })
      ]

      const expectedComments = [
        new DetailThreadComment({
          id: 'threadComment-123',
          username: 'user 1',
          date,
          content: 'comment 1',
          isDeleted: false
        }),
        new DetailThreadComment({
          id: 'threadComment-234',
          username: 'user 2',
          date,
          content: 'comment 2',
          isDeleted: true
        })
      ]
      expectedComments.forEach((data) => {
        data.content = data.isDeleted ? '**komentar telah dihapus**' : data.content
        delete data.isDeleted
      })

      /* mocking */
      const mockThreadRepository = new ThreadRepository()
      const mockCommentRepository = new ThreadCommentRepository()

      mockThreadRepository.checkThreadIsExist = jest.fn()
        .mockImplementation(() => Promise.resolve())

      mockThreadRepository.getThreadById = jest.fn()
        .mockImplementation(() => Promise.resolve(detailThreadRetrieved))

      mockCommentRepository.getCommentsByThreadId = jest.fn()
        .mockImplementation(() => Promise.resolve(commentsRetrieved))

      /* creating use case instance */
      const threadUseCase = new ThreadUseCase({
        threadRepository: mockThreadRepository,
        commentRepository: mockCommentRepository
      })

      // action
      const threadDetail = await threadUseCase.getThread(param)

      // assert
      expect(threadDetail).toStrictEqual(new ThreadDetail({
        ...expectedDetailThread, comments: expectedComments
      }))
      expect(mockThreadRepository.checkThreadIsExist).toHaveBeenCalledWith(param.threadId)
      expect(mockThreadRepository.getThreadById).toHaveBeenCalledWith(param.threadId)
      expect(mockCommentRepository.getCommentsByThreadId).toHaveBeenCalledWith(param.threadId)
    })
  })
})
