// Open: id, title, image, question, explanation, answer, reference
// Multiple choice: id, title, image, question, explanation, answer, otherOptions, reference

// Topic2: Coding related
// Quiz title: storing data

// Multiple choice
var question1 = {
    id: 0,
    title: "Variables",
    image: "",
    question: "Which type of variable cant be changed after it is set?",
    explanation: "",
    answer: "const",
    otherOptions: ["var","let","stbl"],
    reference: "" // Nowhere (yet)
}

// Multiple choice
var question2 = {
    id: 1,
    title: "Objects",
    image: "",
    question: "What is the correct syntax to store \"name = John\" in a JavaScript object?",
    explanation: "",
    answer: "var person = {name: \"John\"};",
    otherOptions: ["var person = {\"name\": \"John\"};","var person = [name: \"John\"];","var person = {name = \"John\"};"],
    reference: "/examples.html" // First example
}

// Open
var question3 = {
    id: 2,
    title: "",
    image: "", // Put clarifying image here
    question: "What do you use when you have to create many instances with the same attributes",
    explanation: "",
    answer: "Classes",
    reference: "/examples.html" // Last example
}