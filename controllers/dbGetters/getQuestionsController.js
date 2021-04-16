const dbFinder = require('../../models/dbFind');
const helper = require('../controllerHelpers');

module.exports = (req, res) => {
  const quizId_fk = req.params.quizId;
  dbFinder
    .findQuestionsByQuizId(quizId_fk)
    .then(questions => {
      // questions deconstructen, answer leegmaken bij open vraag en in otherOptions stoppen bij MC vraag
      questions.forEach(question => {
        hideAnswer(question);
      });
      res.status(200).json(questions);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Unable to perform 'findQuestionsByQuizId' operation",
      });
    });
};

// sets answer in the otherOptions attribute of question (at random position)
function hideAnswer(question) {
  if (question.otherOptions) {
    let options = question.otherOptions.split(',');
    options.push(question.answer);
    question.otherOptions = helper.shuffle(options).toString();
  }
  question.answer = '';

  return question;
}
