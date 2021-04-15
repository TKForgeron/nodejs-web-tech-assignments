# WebTech_Assignment_3

# DEADLINE: 18 april

## Folder Structure

https://www.terlici.com/2014/08/25/best-practices-express-structure.html

## To-Do:

- MAARTEN
  - ~~navbar afmaken: (logisch) dropdown menu~~ -> Werkend maken op mobiel (misschien profile wijzigen in account)
  - ~~topic blocks in de stijl van website maken~~
    - ~~niet afgeronde hoeken~~
    - ~~evt tabel net zoals andere tabel (op versions & frameworks)~~
    - ~~std (blauwe) html links weghalen, maak bv heel de row clickable~~
  - correcte vragen in db zetten -> eerst moet de database gereset worden
- DOUWE
  - upon page refresh onthoud welke question user was
- TIM
  - sql injection checken
  - admin security issue
  - session progress
    - percentage in progress bars
    - op profile page blijkt dat profileController.js de stats uit db niet goed verwerken (i.e. doorgeven van db naar pagina)
- IEMAND met tijd (pls neem verantwoordelijkheid)
  - profile page mooi maken, alle visuals alignen met mooie en logische tekst erbij evt.
  - ~~Bij profile/login/register de header tekst ("JavaScript") laten linken naar home~~

## Assignment Description

### Introduction

In this assignment, you will need further extend your website and build an interactive client-server application that implements the functionality
of an assessment system. You can look at Quizitor or other assessment systems for inspiration.
Your web application should provide listing of available quizzes and questions.
You can remove the styling menus, but keep the theme description pages.
A student user should be able to browse quizzes and questions, answer them and receive feedback.
A set of basic functions must be provided. Extra credits will be awarded for implementing additional features.
The website should continue following the principles of responsive design and accessibility.
Do not use external libraries and frameworks.

### Functional Requirements

The assessment page of your website should become an entrance to the assessment system that you implement.
There are following entities that you need to handle: Topics, Quizzes, Questions, Users.

- Topics
  - Identify 2 to 3 topics that correspond to the theme of your website. Make sure that these topics are described somewhere on your website. Make sure, you can provide a link to this description (use # if necessary). Each topic should have:
    - Title
    - Link to the description
    - Array of quizzes
- Quizzes
  - For every topic, create 2 quizzes, which are collections of questions that a user can answer in a sequence. Each quiz should have:
    1.  Title,
    2.  Array of questions.
- Questions
  - For every quiz, create 3 to 5 questions (altogether you will have 12 to 30 questions). Questions should follow the same rules as described in HW2. Every question should have:
    1. Title,
    2. Type (you need to implement at least MCQ and Open types; it is up to you how many of each type you will have)
    3. Problem statement,
    4. Correct answer.
- Registered Users (RU)
  - Only RUs should be able to answer questions. For that, they need to be able to login. A RU should have:
    1. Name
    2. Login
    3. Password
- Until logging in an anonymous users should be able to browse through all theory pages, browse through all the topics, quizzes and questions, but should not be able to answer them. An anonymous user should be able to register.
- After logging in, a RU can select any topic and any quiz within this topic and answer questions within this quiz. After every attempt, the system should indicate if the answer was correct or not and display the correct answer in the case of an error. If the user has made an error the link to the description of the corresponding topic should be displayed as well. If a user clicks a link and browses away from the assessment page, the current question should be remembered, once the user comes back to the page, the current question should be displayed. A RU should be also able to edit her/his profile. In addition, a RU should be able to see the Report page (which is not available for anonymous users). The Report page should display the user's overall success rate (% of correct attempts) and the success rate over the current session.
- The entire interaction with the assessment functionality should happen within a single assessment page. When a user browses through (or interacts with) questions, the questions should be retrieved from the server using Ajax and displayed using DOM manipulation. When a user provides an answer, the answer should be sent to the server using Ajax, the correctness/incorrectness of an answer should be established on the server and the result should be sent back to the client and displayed using DOM manipulation.
- Topics, quizzes, questions, users and user attempts should be stored in a database. You need to create at least 5 different users with some history of attempts.

### Technical Requirements

- HTML 5.0 and CSS 3.0 – follow the requirements specified in Assignment 1 to make sure your website represents its content according to the recent standards. Make sure W3C HTML5.0 and CSS3.0 validators do not generate errors and warnings.
- Accessibility and Responsive Design - your pages must continue following the accessibility standards and be designed at least for screens of two resolutions: small - for mobile phone and large - for tablets and bigger (you are welcome to further split the design between tablets and laptops/desktops).
- JavaScript – your website must use JavaScript. Use ES6 classes to represent students and course in your code
- Node.JS (and its frameworks) – you have to implement the server side of your website with Node.JS. Usage of Express.JS is very much advised. You can use additional Node.JS packages if you like.
- Use sessions to maintained continuity of interaction with logged-in students. It should be possible for several students to be logged-in at the same time. You do not have to use persistent sessions.
- AJAX – you will need AJAX. At least two mandatory places for it are: displaying a question and processing a RU's answer to a question. It is up to you to decide if you use it in other places.
- It is up to you whether you use JSON or XML to exchange information between the client and the server (but use one of these formats).
- SQLite – Topics, quizzes, questions, users and user attempts should be stored in an SQLite database and accessed with the Node.JS using sqlite3 module. When topics, quizzes and questions are displayed, the information must come from the database. When new users are registered and when existing users authenticate or change their profile, the information should be exchange with a database. When a user answers a question, the information should be added to the database.
- Your website should work at least on the last versions of Chrome and Firefox.
- Each HTML, CSS and JS file should have a comment at the top explaining the role and the functionality of the file and its structure. All JS methods and variables should have dedicated comments explaining their purpose.
- Use a logger recording all HTTP requests to your website.
- It is up to you whether to use or not HTML templating engines such as Jade.
- Make sure that you website is protected at least against SQL injections and Cross-site scripting.

### Extra Credit Options

1. Social Web features: To get an extra credit for the Social Web features, you need to implement ratings and comments. Users should be able to comment and rate questions. A dedicated interface to provide ratings and comments should be available. For every question, an average rating should be computed and all comments together with students' logins should be displayed. Ratings and comments should be stored in the database. Add at least 50 comments and ratings to your questions (overall, not per question).
2. Semantic Web features: To get an extra credit for the Semantic Web features, you need to implement the RDF import service for adding new quizzes/questions to existing topics. The service should have a dedicated interface page (with a superuser access), where a properly formatted RDF-description of a quiz and its questions can be added. You will need to use the corresponding elements from https://schema.org/Quiz and https://schema.org/Question vocabularies for serializing RDF. Once a quiz is added it should appear in the site's list of quizzes.
3. Adaptive Web features: To get an extra credit for the Adaptive Web features, you need to implement a simple version of an Adaptive annotation interface. Display progress bars for topics, quizzes and questions. Model prerequisite-outcome relations between topics, between quizzes and between questions and indicate that a certain outcome is not recommended to work with if the progress for its prerequisite is below 50%.
