class Question {
    constructor(id, title, description, question){
        this.id = id;
        this.title = title;
        this.description = description;
        this.question = question;
        this.rightAnswerIndex = 0;
        this.answerOptions = [];
    }
    checkAnswer(input) {
        return input == this.answer;
    }
    addAnswerOption(option) {
        this.answerOptions.push(option);
    }
};