const dbFinder = require('../../models/dbFind');

module.exports = (req, res) => {
  //req.body not working
  const userAnswer = req.params.providedAnswer; // { answer: 'test' }

  questionIdFromUrl = parseInt(req.params.questionId);

  // find answer to question in db, then check answer, and return TRUE/FALSE
  dbFinder
    .findQuestionAnswerById(questionIdFromUrl)
    .then(answer => {
      console.log("TopicId: " + req.params.topicId);
      console.log("QuizId: " + req.params.quizId);
      if(userAnswer == answer){
        console.log("in the if");
        for (i = 0; i < 2; i++) 
        {
          if(req.params.topicId == i)
          {            
            for(j = 0; j < 2; j++)
            {
              if(req.params.quizId == j){
                console.log("Progress incremented by 1 on this location " + i-1 + ", " + j-1);
                req.session.progressArray[i-1][j-1]++;
              }
            }
          }
        } 

      }
      res.status(200).json(userAnswer == answer);
      console.log(`userAnswer: ${userAnswer}, answer: ${answer}`);

    })
    .catch(err => {
      res.status(500).json({
        message: `cannot find answer to question ${questionIdFromUrl}`,
      });
      console.log(err);
    });

  // const questionIdFromBody = parseInt(userAnswerObj.quizId);

  // if (questionIdFromBody != questionIdFromUrl) {
  //   console.log(
  //     `You're posting a question that does not belong to this quiz. \n questionIdFromBody: ${questionIdFromBody} questionIdFromUrl: ${questionIdFromUrl}`
  //   );
  // }
};
