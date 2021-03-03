class Question = {
    constructor(id, title, description, question, answer){
        this.id = id;
        this.title = title;
        this.description = description;
        this.question = question;
        this.answer = answer;
    }
    checkAnswer(input) {
        return input == this.answer;
    }
};