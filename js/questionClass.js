class Question {
    constructor(id, title, image, question, explanation, answer){
        this.id = id;
        this.image = image;
        this.title = title;
        this.question = question;
        this.answer = answer;
        this.explanation = explanation;
    }
    checkAnswer(input) {
        return input == this.answer;
    }
}

class MultipleChoice extends Question {
    constructor(id, title, image, question, explanation, answer, otherOptions) {
        super(id, title, image, question, explanation, answer);
        this.options = otherOptions;
    }
    getAllOptions(){
        this.options.push(this.answer);
        for (var i = 0; i < this.options.length; i++) {
            console.log(this.options[i]);
        }
        console.log(typeof this.options);
        return this.options;
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