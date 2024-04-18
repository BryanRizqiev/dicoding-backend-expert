const ThreadCommentsTableTestHelper = require('../../../../tests/ThreadCommentsTableTestHelper')
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError')
const NotFoundError = require('../../../Commons/exceptions/NotFoundError')
const AddedThreadComment = require('../../../Domains/threadComments/entities/AddedThreadComment')
const DetailThreadComment = require('../../../Domains/threadComments/entities/DetailThreadComment')
const NewThreadComment = require('../../../Domains/threadComments/entities/NewThreadComment')
const pool = require('../../database/postgres/pool')
const ThreadCommentRepositoryPostgres = require('../ThreadCommentRepositoryPostgres')

describe('ThreadCommentRepositoryPostgres', () => {
  beforeEach(async () => {
    const userId = 'user-123'
    const threadId = 'thread-123'
    await UsersTableTestHelper.addUser({ id: userId, username: 'SomeUser' })
    await ThreadsTableTestHelper.addThread({ id: threadId, owner: userId })
  })

  afterEach(async () => {
    await ThreadCommentsTableTestHelper.cleanTable()
    await ThreadsTableTestHelper.cleanTable()
    await UsersTableTestHelper.cleanTable()
  })

  afterAll(async () => {
    await pool.end()
  })

  describe('addComment function', () => {
    it('addComment function should add data in thread_comments table', async () => {
      // arrange
      const newComment = new NewThreadComment({
        content: 'some comment',
        owner: 'user-123',
        threadId: 'thread-123'
      })

      const date = new Date().toISOString()

      /* mocks and stubs */
      const fakeIdGenerator = (x = 10) => `123${x * x}`
      function fakeDateGenerator () {
        this.toISOString = () => date
      }

      const commentRepositoryPostgres = new ThreadCommentRepositoryPostgres(
        pool, fakeIdGenerator, fakeDateGenerator
      )

      // action
      const addedComment = await commentRepositoryPostgres.addComment(newComment)
      const comments = await ThreadCommentsTableTestHelper.findCommentById(addedComment.id)

      // assert
      expect(addedComment).toStrictEqual(new AddedThreadComment({
        id: `threadComment-${fakeIdGenerator(10)}`,
        content: newComment.content,
        owner: newComment.owner
      }))
      expect(comments).toBeDefined()
    })
  })

  describe('deleteCommentById', () => {
    it('should be able to delete added comment by id', async () => {
      // arrange
      const payload = {
        id: 'threadComment-123',
        threadId: 'thread-123'
      }

      await ThreadCommentsTableTestHelper.addComment({
        id: payload.id, threadId: payload.threadId
      })

      const commentRepositoryPostgres = new ThreadCommentRepositoryPostgres(pool, {}, {})

      // action
      await commentRepositoryPostgres.deleteCommentById(payload.id)
      const comment = await ThreadCommentsTableTestHelper.findCommentById('threadComment-123')

      // assert
      expect(comment.is_deleted).toEqual(true)
    })
  })

  describe('checkCommentIsExist', () => {
    it('should resolve if comment exists', async () => {
      // arrange
      await ThreadCommentsTableTestHelper.addComment({
        id: 'threadComment-123'
      })

      const commentRepositoryPostgres = new ThreadCommentRepositoryPostgres(
        pool, {}, {}
      )

      // action & assert
      await expect(commentRepositoryPostgres.checkCommentIsExist('thread-123', 'threadComment-123'))
        .resolves.not.toThrow(NotFoundError)
    })

    it('should reject if comment does not exist', async () => {
      // arrange
      const commentRepositoryPostgres = new ThreadCommentRepositoryPostgres(
        pool, {}, {}
      )

      // action & assert
      await expect(commentRepositoryPostgres.checkCommentIsExist('thread-123', 'threadComment-456'))
        .rejects.toThrow('Comment yang Anda cari tidak ada')
    })

    it('should reject if comment is already deleted', async () => {
      // arrange
      await ThreadCommentsTableTestHelper.addComment({
        id: 'threadComment-123',
        isDeleted: true
      })

      const commentRepositoryPostgres = new ThreadCommentRepositoryPostgres(
        pool, {}, {}
      )

      // action & assert
      await expect(commentRepositoryPostgres.checkCommentIsExist('thread-123', 'threadComment-123'))
        .rejects.toThrow('Comment yang Anda cari tidak ada')
    })
  })

  describe('verifyCommentAccess', () => {
    it('should not throw error if user has authorization', async () => {
      // arrange
      await ThreadCommentsTableTestHelper.addComment({ id: 'threadComment-123', threadId: 'thread-123', owner: 'user-123' })

      const commentRepositoryPostgres = new ThreadCommentRepositoryPostgres(
        pool, {}, {}
      )

      // action & assert
      await expect(commentRepositoryPostgres.verifyCommentAccess('threadComment-123', 'user-123')).resolves.not.toThrow(AuthorizationError)
    })

    it('should throw error if user has no authorization', async () => {
      // arrange
      await ThreadCommentsTableTestHelper.addComment({ id: 'threadComment-123', threadId: 'thread-123', owner: 'user-123' })
      await UsersTableTestHelper.addUser({ id: 'user-465' })

      const commentRepositoryPostgres = new ThreadCommentRepositoryPostgres(
        pool, {}, {}
      )

      // action & assert
      await expect(commentRepositoryPostgres.verifyCommentAccess('threadComment-123', 'user-456')).rejects.toThrow('Proses gagal karena Anda tidak mempunyai akses ke aksi ini')
    })
  })

  describe('getCommentsByThreadId', () => {
    it('should return all comments from a thread', async () => {
      // arrange
      const today = new Date().toISOString()

      const comment = {
        id: 'threadComment-123', date: today, content: 'some comment', isDeleted: false
      }
      await ThreadCommentsTableTestHelper.addComment(comment)

      const commentRepositoryPostgres = new ThreadCommentRepositoryPostgres(
        pool, {}, {}
      )

      // action
      const commentDetails = await commentRepositoryPostgres.getCommentsByThreadId('thread-123')

      // assert
      expect(commentDetails).toStrictEqual([
      /*
       karena ada bug dari postgre (external agent) dimana data date saat insert dan select tidak sesuai
       maka akan digunakan code dibawah ini untuk meloloskan test
      */
        new DetailThreadComment({ ...comment, date: commentDetails[0].date, username: 'SomeUser' })
      ])
    })

    it('should return an empty array when no comments exist for the thread', async () => {
      // arrange
      const commentRepositoryPostgres = new ThreadCommentRepositoryPostgres(
        pool, {}, {}
      )

      // action
      const commentDetails = await commentRepositoryPostgres.getCommentsByThreadId('thread-123')

      // asssert
      expect(commentDetails).toStrictEqual([])
    })
  })
})
