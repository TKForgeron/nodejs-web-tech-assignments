# WebTech_Assignment_2
# DEADLINE: 17 mrt

## Assignment Description
Develop a dynamic version of the website created in Assignment 1 using JavaScript (if necessary, you can change/extend the main theme). Use DOM methods, elements and events to interactively modify the content and appearance of your web-pages according to user actions. Use event listeners to process the events. Implement at least 1 case of event propagation (W3C model).
Create an assessment.html page that displays three to five assessment questions about your technology. The questions should react to the user's answers indicating whether the answers are correct or not. The content of the assessment.html should be constructed purely through DOM manipulation (not document.write(), not .innerHTML). In other words, such elements as \<nav\>, \<header\>, \<footer\> and \<aside\> can still be a part of the file assessment.html, but all the actual content of the page has to be produced by JavaScript on the fly when the page is loaded and changed with feedback reacting to the user's answers.
The content of this page should be populated using an array of objects, where each object stores a structured representation of an assessment question (title, problem statement, correct answer). You will need to implement at least two types of questions: Multiple-choice and Fill-in-the-blank. Both types will need to be implemented as JS classes, and they need to have a common superclass Question - inheriting its datafields and methods, extending them and, if necessary overriding them. If necessary, you can look at Quizitor questions for inspiration.
Use ES6 classes and ES6-style object construction.
Implement two menus in your \<header\> or \<footer\> that allow the user to dynamically change the appearance  of elements on a page. One menu should be used to select an element, another to modify the selected element appearance. The options of the first menu should  contain body, header, footer, aside, articles and sections (do not go deeper in the DOM hierarchy). They should be created on the fly by traversing the DOM of the page. In other words, a page can have more than one article and more than one section, and not necessarily have aside, but the menu should be able to read them correctly from the DOM of the page. The option of the second menu should allow to change at least the font size and the color scheme of the element.
To implement menus you can use the HTML Select element. These pages explain how you can create and manipulate the Select element and its properties:
  - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
  - https://www.w3schools.com/jsref/dom_obj_select.asp

The website should continue following the principles of responsive design and accessibility.
Do not use external libraries and frameworks.

## Requirements
- Menus
- assessment.html
  - 5 questions (objects)

### Coding Style Guidelines
- separate scripting from the content 
- use camelCase notation when naming your methods, variables and classes
- use indentation when writing your JavaScript code
- use meaningful comments
- terminate JavaScript statements with a ";"



## To-Do:
- Loop back/forward buttons (on assessment.html)
- i-icon (on assessment.html) is now event handler -> event listener
- Show questions on assessment.html (including image and explanation)
- Cleaning and checking everything
- Implement at least 1 case of event propagation (W3C model).