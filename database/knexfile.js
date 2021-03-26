// Update with your config settings.

const path = require('path');

module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: path.join(__dirname, 'database.db3') },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
    useNullAsDefault: true,
  },
};
