/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool')

const ThreadCommentsTableTestHelper = {
  async addComment ({
    id = 'threadComment-123', threadId = 'thread-123', owner = 'user-123',
    content = 'some comment', date = new Date().toISOString(), isDeleted = false
  }) {
    const query = {
      text: 'INSERT INTO thread_comments (id, thread_id, owner, content, date, is_deleted) VALUES($1, $2, $3, $4, $5, $6)',
      values: [id, threadId, owner, content, date, isDeleted]
    }

    await pool.query(query)
  },

  async findCommentById (id) {
    const query = {
      text: 'SELECT * FROM thread_comments WHERE id = $1',
      values: [id]
    }

    const { rows } = await pool.query(query)

    return rows[0]
  },

  async cleanTable () {
    await pool.query('DELETE FROM thread_comments WHERE 1=1')
  }
}

module.exports = ThreadCommentsTableTestHelper
