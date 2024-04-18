/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool')

const ThreadsTableTestHelper = {
  async cleanTable () {
    await pool.query('DELETE FROM users WHERE 1=1')
  },

  async findThreadById (id) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [id]
    }
    const { rows } = await pool.query(query)
    return rows[0]
  },

  async addThread ({
    id = 'thread-123', title = 'some thread', body = 'some thread body', owner = 'user-123', date = new Date().toISOString()
  }) {
    const query = {
      text: 'INSERT INTO threads (id, title, body, owner, date) VALUES($1, $2, $3, $4, $5) RETURNING date',
      values: [id, title, body, owner, date]
    }
    await pool.query(query)
  }
}

module.exports = ThreadsTableTestHelper
