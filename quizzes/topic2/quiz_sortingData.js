// Open: id, title, image, question, explanation, answer, reference
// Multiple choice: id, title, image, question, explanation, answer, otherOptions, reference

// Topic2: Coding related

// Multiple choice
var question1 = {
    id: 0,
    title: "Variables",
    image: "/images/t2_storingData/q1.jpg", // Not needed
    question: "Which type of variable cant be changed after it is set?",
    explanation: "/examples.html", // Nowhere (yet)
    answer: "const",
    otherOptions: ["var","let","stbl"]
}

// Multiple choice
var question2 = {
    id: 1,
    title: "Objects",
    image: "/images/t2_storingData/q2.jpg", // Not needed
    question: "What is the correct syntax to store \"name = John\" in a JavaScript object?",
    explanation: "/examples.html", // First example
    answer: "var person = {name: \"John\"};",
    otherOptions: ["var person = {\"name\": \"John\"};","var person = [name: \"John\"];","var person = {name = \"John\"};"]
}

// Open
var question3 = {
    id: 2,
    title: "Reusing structures",
    image: "/images/t2_storingData/q3.PNG",
    question: "What do you use when you have to create many instances with the same attributes? (see the blank space in the image for clarification)",
    explanation: "/examples.html", // Last example
    answer: "Classes"
}