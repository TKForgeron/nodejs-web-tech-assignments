const dbFinder = require('../../models/dbFind');
const dbAdder = require('../../models/dbAdd');

module.exports = (req, res) => {
  const { id } = parseInt(req.params, 10);
  const question = JSON.stringify(req.body);

  dbFinder
    .findQuizById(id)
    .then(quiz => {
      if (!quiz) {
        res.status(404).json({ message: 'Record not found' });
      }

      if (id != question.quizId_fk) {
        res.status(422).json({
          message: `URL quizId_fk: ${id}, body quizId_fk: ${question.quizId_fk}. Please make sure the id stated in the URL matches the id passed through the body`,
        });
      }

      // if all NOTNULLABLE fields are filled out, add then question
      if (!question.quizId_fk) {
        question['quizId_fk'] = id;
      } else if (!question.title || !question.explanation || !question.answer) {
        res.status(422).json({
          message:
            'Please provide title, answer, and explanation to the question',
        });
      } else {
        dbAdder
          .addQuestion(question, id)
          .then(q => {
            res.status(200).json(q);
          })
          .catch(err =>
            res.status(500).json({
              message:
                "Unable to add question, i.e. perform the 'addQuestion' operation",
            })
          );
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Unable to perform 'findQuizById' operation" });
    });
};
