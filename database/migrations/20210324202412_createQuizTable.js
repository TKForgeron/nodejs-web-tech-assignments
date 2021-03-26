exports.up = function (knex) {
  return knex.schema
    .createTable('quizzes', table => {
      table.increments('quizId');
      table.text('title', 128).notNullable();
    })
    .createTable('questions', table => {
      table.increments('questionId');
      table.text('title', 128).notNullable();
      table.text('image', 128).notNullable();
      table.text('explanation', 128).notNullable();
      table.text('answer', 128).notNullable();
      table.text('otherOptions'); // is NULL for open questions
      // foreign key info to 'quizzes' table
      table
        .integer('quizId_fk')
        .unsigned()
        .notNullable()
        .references('quizId')
        .inTable('quizzes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .createTable('user', table => {
      table.increments('userId');
      table.text('username', 128).notNullable();
      table.text('password', 128).notNullable();
      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('questions')
    .dropTableIfExists('quizzes');
};
