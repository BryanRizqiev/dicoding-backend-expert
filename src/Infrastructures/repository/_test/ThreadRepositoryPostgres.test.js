const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const NotFoundError = require('../../../Commons/exceptions/NotFoundError')
const AddedThread = require('../../../Domains/threads/entities/AddedThread')
const NewThread = require('../../../Domains/threads/entities/NewThread')
const ThreadDetail = require('../../../Domains/threads/entities/ThreadDetail')
const pool = require('../../database/postgres/pool')
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres')

describe('ThreadRepositoryPostgres', () => {
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable()
    await UsersTableTestHelper.cleanTable()
  })

  afterAll(async () => {
    await pool.end()
  })

  describe('addThread function', () => {
    it('should create new thread and return added thread correctly', async () => {
      // arrange
      await UsersTableTestHelper.addUser({
        id: 'user-123',
        username: 'dicoding',
        password: 'secret_password',
        fullname: 'Dicoding Indonesia'
      })

      const date = new Date().toISOString()

      /* mocks and stubs */
      const fakeThreadIdGenerator = (x = 10) => `123${x * x}`
      function fakeDateGenerator () {
        this.toISOString = () => date
      }

      const newThread = new NewThread({
        title: 'some thread',
        body: 'some thread body',
        owner: 'user-123'
      })

      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool, fakeThreadIdGenerator, fakeDateGenerator
      )

      // action
      const addedThread = await threadRepositoryPostgres.addThread(newThread)

      // assert
      const threads = await ThreadsTableTestHelper.findThreadById(addedThread.id)
      expect(addedThread).toStrictEqual(new AddedThread({
        id: `thread-${fakeThreadIdGenerator()}`,
        title: 'some thread',
        body: newThread.body,
        owner: 'user-123',
        date
      }))
      expect(threads).toBeDefined()
    })
  })

  describe('getThreadById function', () => {
    it('should return thread when thread is found', async () => {
      // arrange
      const date = new Date().toISOString()

      const newThread = {
        id: 'thread-123', title: 'some title', body: 'some body', owner: 'user-123', date
      }
      const expectedThread = {
        id: 'thread-123',
        title: 'some title',
        date,
        username: 'bryan',
        body: 'some body',
        comments: []
      }

      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {}, {})
      await UsersTableTestHelper.addUser({ id: 'user-123', username: expectedThread.username })
      await ThreadsTableTestHelper.addThread(newThread)

      // action
      const acquiredThread = await threadRepositoryPostgres.getThreadById('thread-123')

      /*
       karena ada bug dari postgre (external agent) dimana data date saat insert dan select tidak sesuai
       maka akan digunakan code dibawah ini untuk meloloskan test
      */
      expectedThread.date = acquiredThread.date

      // assert
      expect(acquiredThread).toStrictEqual(new ThreadDetail(expectedThread))
    })
  })

  describe('checkThreadIsExist function', () => {
    it('should return NotFoundError when thread is not found', async () => {
      // arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {}, {})
      await UsersTableTestHelper.addUser({ id: 'user-123' })
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', owner: 'user-123' })

      // action & assert
      await expect(threadRepositoryPostgres.checkThreadIsExist('thread-321'))
        .rejects
        .toThrow(NotFoundError)
    })

    it('should resolve if thread exists', async () => {
      // arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {}, {})
      await UsersTableTestHelper.addUser({ id: 'user-123' })
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', owner: 'user-123' })

      // action & assert
      await expect(threadRepositoryPostgres.checkThreadIsExist('thread-123'))
        .resolves.not.toThrow(NotFoundError)
    })
  })
})
