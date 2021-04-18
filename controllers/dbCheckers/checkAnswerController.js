// This is where user answers to the assessment are verified and progress is incremented
const dbFinder = require('../../models/dbFind');

module.exports = (req, res) => {
  console.log(req.body);
  const userAnswer = req.body.answer; // { answer: 'test' }
  const questionIdFromUrl = parseInt(req.body.questionId);
  const topicId = req.body.topicId;
  const quizId = req.body.quizId;
  const totalQuestionsPerQuiz = 3;
  if(!req.session.loggedin){

    res.status(401).json({message:"You're not authorized to do this"});
  }
  else{
    //req.body not working
    

    // find answer to question in db, then check answer, and return TRUE/FALSE
    dbFinder
      .findQuestionAnswerById(questionIdFromUrl)
      .then(answer => {

        if(userAnswer.toLowerCase() == answer.toLowerCase())
        {

          if(quizId == 1 || quizId == 2)
          {
            // This is topic 1 quizzes one and two
            // if we've exceeded the amount of questions per quiz we don't update the progress anymore
            // yes we know that a person can technically answer the same question over and over to get maximum progress but we don't wanna keep track of a boolean for every single question for something so minor
            if(req.session.progressArray[topicId-1][quizId-1] < totalQuestionsPerQuiz)
            {                 
              req.session.progressArray[topicId-1][quizId-1]++;
            }
            // We have to parse to float for success because javascript thinks everything is always a string   
            // if we're at 100% don't bother incrementing the progress any further                  
            if(req.session.successArray[topicId-1][quizId-1] < 100){                                                       
              req.session.successArray[topicId-1][quizId-1] = parseFloat(req.session.successArray[topicId-1][quizId-1]) + parseFloat(1/totalQuestionsPerQuiz);
            }
          }
          if(quizId == 3 || quizId == 4){
            // This is topic 2 quizzes one and two          
            if(req.session.progressArray[topicId-1][quizId-3] < totalQuestionsPerQuiz)
            {                 
              req.session.progressArray[topicId-1][quizId-3]++;
            }           
                  
            if(req.session.successArray[topicId-1][quizId-3] < 100){                                                       
              req.session.successArray[topicId-1][quizId-3] = parseFloat(req.session.successArray[topicId-1][quizId-3]) + parseFloat(1/totalQuestionsPerQuiz);
            }
          }          

        }
        res.status(200).json(userAnswer.toLowerCase() == answer.toLowerCase());
               

      })
      .catch(err => {
        res.status(500).json({
          message: `cannot find answer to question ${questionIdFromUrl}`,
        });
        console.log(err);
      });
  }

};
