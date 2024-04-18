const NotFoundError = require('../../Commons/exceptions/NotFoundError')
const ThreadRepository = require('../../Domains/threads/ThreadRepository')
const AddedThread = require('../../Domains/threads/entities/AddedThread')
const ThreadDetail = require('../../Domains/threads/entities/ThreadDetail')

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor (pool, idGenerator, dateGenerator) {
    super()
    this._pool = pool
    this._idGenerator = idGenerator
    this._dateGenerator = dateGenerator
  }

  async addThread (newThread) {
    const { title, body, owner } = newThread
    const id = `thread-${this._idGenerator(10)}`
    const date = new this._dateGenerator().toISOString()
    const query = {
      text: 'INSERT INTO threads VALUES ($1, $2, $3, $4, $5) RETURNING id, title, body, owner',
      values: [id, title, body, owner, date]
    }

    const { rows } = await this._pool.query(query)
    return new AddedThread({ ...rows[0], date })
  }

  async getThreadById (id) {
    const query = {
      text: `
              SELECT th.id, th.title, th.body, th.date, users.username 
              FROM threads AS th
              INNER JOIN users ON th.owner = users.ID
              WHERE th.id = $1
            `,
      values: [id]
    }

    const { rows } = await this._pool.query(query)
    const [data] = rows

    return new ThreadDetail({ ...data, date: data.date.toISOString(), comments: [] })
  }

  async checkThreadIsExist (id) {
    const query = {
      text: 'SELECT 1 from threads WHERE id = $1',
      values: [id]
    }

    const { rowCount } = await this._pool.query(query)

    if (!rowCount) {
      throw new NotFoundError('Thread yang Anda cari tidak ada')
    }
  }
}

module.exports = ThreadRepositoryPostgres
