// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: `${__dirname}/data/database.db3` },
    migrations: { directory: `${__dirname}/data/migrations` },    
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
    useNullAsDefault: true,
  },
};
