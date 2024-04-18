const ThreadCommentRepository = require('../../Domains/threadComments/ThreadCommentRepository')
const NotFoundError = require('../../Commons/exceptions/NotFoundError')
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError')
const DetailThreadComment = require('../../Domains/threadComments/entities/DetailThreadComment')
const AddedThreadComment = require('../../Domains/threadComments/entities/AddedThreadComment')

class ThreadCommentRepositoryPostgres extends ThreadCommentRepository {
  constructor (pool, idGenerator, dateGenerator) {
    super()
    this._pool = pool
    this._idGenerator = idGenerator
    this._dateGenerator = dateGenerator
  }

  async addComment (newComment) {
    const { content, threadId, owner } = newComment
    const id = `threadComment-${this._idGenerator(10)}`
    const date = new this._dateGenerator().toISOString()

    const query = {
      text: 'INSERT INTO thread_comments VALUES($1, $2, $3, $4, $5) RETURNING id, content, owner',
      values: [id, content, owner, threadId, date]
    }

    const { rows } = await this._pool.query(query)

    return new AddedThreadComment({ ...rows[0] })
  }

  async deleteCommentById (commentId) {
    const query = {
      text: 'UPDATE thread_comments SET is_deleted = TRUE WHERE id = $1',
      values: [commentId]
    }

    await this._pool.query(query)
  }

  async verifyCommentAccess (commentId, ownerId) {
    const query = {
      text: 'SELECT 1 FROM thread_comments WHERE id = $1 AND owner = $2',
      values: [commentId, ownerId]
    }

    const { rowCount } = await this._pool.query(query)

    if (!rowCount) {
      throw new AuthorizationError('Proses gagal karena Anda tidak mempunyai akses ke aksi ini')
    }
  }

  async checkCommentIsExist (threadId, commentId) {
    const query = {
      text: `
        SELECT 1
        FROM thread_comments AS tc
        INNER JOIN threads AS th ON tc.thread_id = th.id
        WHERE th.id = $1
        AND tc.id = $2
        AND tc.is_deleted = FALSE
      `,
      values: [threadId, commentId]
    }

    const { rowCount } = await this._pool.query(query)

    if (!rowCount) {
      throw new NotFoundError('Comment yang Anda cari tidak ada')
    }
  }

  async getCommentsByThreadId (id) {
    const query = {
      text: `
              SELECT tc.id, tc.content, tc.date, tc.is_deleted,
              usr.username
              FROM thread_comments tc 
              INNER JOIN users usr
              ON tc.owner = usr.id
              WHERE tc.thread_id = $1
              ORDER BY tc.date ASC
            `,
      values: [id]
    }

    const { rows } = await this._pool.query(query)

    return rows.map((data) => new DetailThreadComment({
      ...data, date: data.date.toISOString(), isDeleted: data.is_deleted
    }))
  }
}

module.exports = ThreadCommentRepositoryPostgres
