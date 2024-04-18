/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('thread_comments', {
    id: {
      type: 'VARCHAR(36)',
      primaryKey: true
    },
    content: {
      type: 'TEXT',
      notNull: true
    },
    owner: {
      type: 'VARCHAR(36)',
      notNull: true,
      references: '"users"',
      onDelete: 'CASCADE'
    },
    thread_id: {
      type: 'VARCHAR(36)',
      notNull: true,
      references: '"threads"',
      onDelete: 'CASCADE'
    },
    date: {
      type: 'TIMESTAMP',
      notNull: true
    },
    is_deleted: {
      type: 'BOOLEAN',
      notNull: true,
      default: false
    }
  })
}

exports.down = (pgm) => {
  pgm.dropTable('thread_comments')
}
