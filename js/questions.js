class Question {
    constructor(id, title, description, question){
        this.id = id;
        this.title = title;
        this.description = description;
        this.question = question;
        this.correctAnswer = correctAnswer;
    }
    checkAnswer(input) {
        return input == this.answer;
    }
    addAnswerOption(option) {
        this.answerOptions.push(option);
    }
}

class MultipleChoice extends Question {
    constructor(id, title, description, question, correctAnswer) {
        super(id, title, description, question, correctAnswer);
        this.correctAnswerIndex = 1;
        this.answerOptions = [];
    }
    setIncorrectAnswers(options) {
        options.push(this.correctAnswer);
        this.answerOptions = shuffle(options);
    }
    getAllOptions(){
        console.writeline(answerOptions);
        return answerOptions;
    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {    // While there remain elements to shuffle
        // Pick a remaining element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}