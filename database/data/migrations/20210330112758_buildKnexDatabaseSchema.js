exports.up = knex => {
  return (
    knex.schema
      .createTable('topic', table => {
        table.increments();
        table.text('name').notNullable();
      })
      // quiz belonging to a topic
      .createTable('quiz', table => {
        table.increments(); // is called id
        table.text('title', 128).notNullable();
        table
          .integer('topicId_fk')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('topic')
          .onDelete('CASCADE')
          .onUpdate('CASCADE');
      })
      // question belonging to a quiz
      .createTable('question', table => {
        table.increments();
        table.text('title', 128).notNullable();
        table.text('image', 128);
        table.text('question', 128).notNullable();
        table.text('explanation', 128);
        table.text('answer', 128).notNullable();
        table.text('reference', 128);
        table.text('otherOptions', 128); // is NULL for open questions
        // foreign key info to 'quiz' table
        table
          .integer('quizId_fk')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('quiz')
          .onDelete('CASCADE')
          .onUpdate('CASCADE');
      })
      .createTable('user', table => {
        table.increments();
        table.text('name', 128).notNullable();
        table.text('username', 128).notNullable();
        table.text('password', 128).notNullable();
        // table.decimal('successRate').unsigned(); // is optional, could also be calculated through a function locally querying 'userQuizStats' => more efficient data wise
        table.timestamps(true, true);
      })
      // Per user per quiz, progress and success rate will be recorded
      .createTable('userQuizStats', table => {
        table.increments();
        table
          .integer('userId_fk')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('user')
          .onDelete('CASCADE')
          .onUpdate('CASCADE');
        table
          .integer('quizId_fk')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('quiz')
          .onDelete('CASCADE')
          .onUpdate('CASCADE');
        table.integer('quizProgress', 128).unsigned(); // gwn bij welke vraag van deze quiz de user is (zodat wann hij uitgelogd is, hij verder kan gaan waar hij was... soort van)
        table.decimal('quizSuccessRate').unsigned(); // percentage. (vragen goed)/(totaal vragen in quiz) * 100%
      })
      .catch(err => {
        console.error(err);
        throw err;
      })
  );
};

exports.down = knex => {
  return knex.schema
    .dropTableIfExists('topic')
    .dropTableIfExists('quiz')
    .dropTableIfExists('question')
    .dropTableIfExists('user')
    .dropTableIfExists('userQuizStats')
    .catch(err => {
      console.error(err);
      throw err;
    });
};
