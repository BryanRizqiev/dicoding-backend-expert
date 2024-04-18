/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('threads', {
    id: {
      type: 'VARCHAR(36)',
      primaryKey: true
    },
    title: {
      type: 'VARCHAR(64)',
      notNull: true
    },
    body: {
      type: 'TEXT',
      notNull: true
    },
    owner: {
      type: 'VARCHAR(36)',
      notNull: true,
      references: '"users"',
      onDelete: 'CASCADE'
    },
    date: {
      type: 'TIMESTAMP',
      notNull: true
    }
  })
}

exports.down = (pgm) => {
  pgm.dropTable('threads')
}
