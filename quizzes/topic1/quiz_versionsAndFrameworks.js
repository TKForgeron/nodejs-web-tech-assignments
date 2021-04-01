// Open: id, title, image, question, explanation, answer, reference
// Multiple choice: id, title, image, question, explanation, answer, otherOptions, reference

// Topic1: Basic facts about JavaScript

// Open
var question1 = {
    id: 0,
    title: "Versions",
    image: "",
    question: "Since what version/when did they stop bringing out versions and start bringing out yearly updates? ",
    explanation: "",
    answer: "ES6/2016",
    reference: "/versionsFrameworks.html" // Table/text above table, 2nd line
}

// Multiple choice
var question2 = {
    id: 1,
    title: "Usage",
    image: "",
    question: "Where is JavaScript good for?",
    explanation: "",
    answer: "To create and control dynamic web components",
    otherOptions: ["To create and control static web components","To learn programming Java in an easier way","JavaScript isn't good for anything"],
    reference: "/versionsFrameworks.html" // Frameworks section, 2nd line
}

// Multiple choice
var question3 = {
    id: 2,
    title: "Frameworks",
    image: "",
    question: "What is the idea behind a JavaScript framework?",
    explanation: "",
    answer: "JavaScript frameworks provide developers with pre-written JavaScript code to use for routine programming features and tasks",
    otherOptions: ["To create more robust JavaScript code","It is just JavaScript, but with a different syntax than used in vanilla JavaScript, just like an accent of a language","None of the above"],
    reference: "/versionsFrameworks.html" // What is a JavaScript framework? section, quote
}