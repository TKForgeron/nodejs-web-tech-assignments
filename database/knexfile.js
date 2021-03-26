// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: './data/database.db3' },
    migrations: { directory: __dirname + '/data/migrations' },
    seeds: { directory: './data/seeds/' },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
    useNullAsDefault: true,
  },
};
