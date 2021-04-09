const dbFinder = require('../../models/dbFind');

module.exports = (req, res) => {
  console.log(req.body);
  const userAnswer = req.body.answer; // { answer: 'test' }
  const questionIdFromUrl = parseInt(req.body.questionId);
  const topicId = req.body.topicId;
  const quizId = req.body.quizId;
  const totalQuestionsPerQuiz = 3;
  if(!req.session.loggedin){
    console.log("not logged in during assessment");
    res.status(401).json({message:"You're not authorized to do this"});
  }
  else{
    //req.body not working
    

    // find answer to question in db, then check answer, and return TRUE/FALSE
    dbFinder
      .findQuestionAnswerById(questionIdFromUrl)
      .then(answer => {
        console.log("TopicId: " + topicId);
        console.log("QuizId: " + quizId);
        if(userAnswer == answer){
          console.log("in the if");
          for (let i = 1; i < 3; i++) 
          {
            if(topicId == i)
            {            
              for(let j = 1; j < 3; j++)
              {
                if(quizId == j){
                  // if we've exceeded the amount of questions per quiz we don't update the progress anymore
                  // yes we know that a person can technically answer the same question over and over to get maximum progress but we don't wanna keep track of a boolean for every single question for something so minor
                  if(req.session.progressArray[i-1][j-1] < totalQuestionsPerQuiz){                 
                    req.session.progressArray[i-1][j-1]++;
                  }
                  // if we're at 100% don't bother incrementing the progress any further
                  
                  if(req.session.successArray[i-1][j-1] < 1){                                                       
                    req.session.successArray[i-1][j-1] += 1/totalQuestionsPerQuiz;
                  }
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
  }
  // const questionIdFromBody = parseInt(userAnswerObj.quizId);

  // if (questionIdFromBody != questionIdFromUrl) {
  //   console.log(
  //     `You're posting a question that does not belong to this quiz. \n questionIdFromBody: ${questionIdFromBody} questionIdFromUrl: ${questionIdFromUrl}`
  //   );
  // }
};
