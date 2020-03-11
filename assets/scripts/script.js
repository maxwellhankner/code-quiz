// Select cards
var launchScreenCard = $('#launch-screen-card');
var currentQuestionCard = $('#question-answer-card');
var quizEndedCard = $('#quiz-ended-card');
var highscoresCard = $('#highscores-card');

// Select the start quiz button
var startQuizButton = $('#start-quiz-button');

// Select question title
var currentQuestionTitle = $('#current-question-title');

// Select all answer buttons
var allAnswers = $('.all-answers');

// Select the users shown score
var userScoreShown = $('#user-score-shown');

// Select the routing links
var viewHighscoresLink = $('#view-highscores-link');
var takeQuizLink = $('#take-quiz-link');

// Select each answer button
var answerOptionOne = $('#answer-one');
var answerOptionTwo = $('#answer-two');
var answerOptionThree = $('#answer-three');
var answerOptionFour = $('#answer-four');

// Select last answer alert
var lastAnswerAlert = $('#last-answer-alert');

// Create timer variable and select time element
var time = 75;
var shownTime = $('#shown-time');

// Quiz is ended variable
var quizEnded = false;

// Questions and answers bank
var allQuestions = [['Question 1: Which HTML tag can be used to write javascript code?', '<javascript>', '<js>', '<script>', '<source>'],
["Question 2: Which of the following syntax is the correct way to display 'Hello World' using an alert box?", "alertbox('Hello Horld')", "display('Hello Horld')", "popUp('Hello Horld')", "alert('Hello Horld')"],
['Question 3: Which of the following is not a javascript reserved word?', 'var', 'Math', 'function', 'saving'],
['Question 4: Which function of an Array object calls a function for each element in the array?', 'forEach()', 'every()', 'forEvery()', 'each()']]
var correctAnswers = ['answer-three', 'answer-four', 'answer-four', 'answer-one']

// Store user answers in an array
var userAnswers = [];

// Start quiz when launch button is clicked
startQuizButton.click(function(){
    // hide the launch section
    launchScreenCard.attr("style", "display: none;");
    // show the quiz section
    currentQuestionCard.attr("style", "display: flex;");
    // Run the runQuiz function
    runQuiz();
})

// Quiz session function
function runQuiz() {
    // Index variable to be referenced for each question
    var i = 0;
    // Start the timer
    runTimer();
    // Generate the questions and answers based on the index variable
    generateQuestionCard(i);
    // Listen for the user to click on any one of the buttons
    allAnswers.click(function(event){
        // If the user's click is a button, go in
        if (event.target.classList.contains('btn')){
            // Set variable to get the index of the button that was clicked
            var answerIndex = event.target.getAttribute('id');
            // Add the users answer to the userAnswers array
            userAnswers.push(answerIndex);
            // If the user's answer is correct
            if (answerIndex === correctAnswers[i]){
                // Let the user know so in the alert box
                lastAnswerAlert.text('CORRECT');
                // Make sure the alert color is correct
                lastAnswerAlert.removeClass("alert-danger");
                lastAnswerAlert.addClass("alert-primary");
            }
            else {
                // Let the user know so in the alert box
                lastAnswerAlert.text('INCORRECT');
                // Make sure the alert color is correct
                lastAnswerAlert.removeClass("alert-primary");
                lastAnswerAlert.addClass("alert-danger");
                // deduct 5 seconds if the answer is wrong
                time -= 5;
            }
            // increment the question/answer index by 1
            i += 1;
            // if the index is greater than 1
            if (i > 0){
                // Show the answer alert bar
                lastAnswerAlert.css("display", "block");
            }
            // else {
            //     lastAnswerAlert.css("display", "none");
            // }
            // if the question/answer index is less that the length of questions
            if (i < allQuestions.length){
                // Generate the question and answers based on the index
                generateQuestionCard(i);
            }
            // Otherwise, end the quiz
            else {
                // Set quizEnded variable to true
                quizEnded = true;
                // Unbind the buttons from the event listener
                allAnswers.unbind();
                // Hide the last answer alert
                lastAnswerAlert.css("display", "none");
                // Call the endQuiz function
                endQuiz();
            }
        }
    })
}

// Dynamically generate question and answers card
function generateQuestionCard(i) {
    // Select and display the current question
    var currentQuestion = allQuestions[i][0];
    currentQuestionTitle.text(currentQuestion);
    // Display each answer option
    answerOptionOne.text(allQuestions[i][1]);
    answerOptionTwo.text(allQuestions[i][2]);
    answerOptionThree.text(allQuestions[i][3]);
    answerOptionFour.text(allQuestions[i][4]);
}

// Timer function
function runTimer() {
    // Create an interval timer
    var countDownInterval = setInterval(function() {
        // If the quizEnded variable is true, cancel the timer
        if(quizEnded){
            clearInterval(countDownInterval);
        }
        // decrement the timer and update the user shown timer
        time--;
        shownTime.text(time);
        // If the time hits 0, stop the timer and call the endQuiz function
        if(time === 0) {
            clearInterval(countDownInterval);
            endQuiz();
        }
    // Run through every 1000 miliseconds (1 second)
    }, 1000);
}

// End quiz function
var finalTime = time;
function endQuiz () {
    finalTime = time;
    userScoreShown.text(finalTime)
    currentQuestionCard.attr("style", "display: none");
    quizEndedCard.attr("style", "display: flex");
}

// When the user submits their results
var submitQuizButton = $('#submit-quiz-button');
var userNameInput = $('#user-name-input');
var userName = '';
var submitQuizButton = $('#submit-quiz-button');

submitQuizButton.click(function(){
    quizEndedCard.attr("style", "display: none");
    highscoresCard.attr("style", "display: flex");
    //break
    shownTime.text('75');
    console.log(shownTime.text())
    userName = userNameInput.val();
    addUserToLocal();
    populateHighscoreBoard();
    viewHighscoresLink.attr("style", "display: none");
    takeQuizLink.attr("style", "display: block");
})

function addUserToLocal() {
    localStorage.setItem("user", userName);
    localStorage.setItem("score", finalTime);
}

// Event listener for clicking highscores link
viewHighscoresLink.click(function(){
    showHighscoreCardOnly();
    quizEnded = true;
})
// Function for hiding all sections but the highscore card
function showHighscoreCardOnly() {
    quizEndedCard.attr("style", "display: none");
    currentQuestionCard.attr("style", "display: none");
    launchScreenCard.attr("style", "display: none");
    highscoresCard.attr("style", "display: flex");

    viewHighscoresLink.attr("style", "display: none");
    takeQuizLink.attr("style", "display: block");
}


// Event listener for clicking take quiz link
takeQuizLink.click(function(){
    showLaunchQuizCardOnly();
    // When a user starts the quiz, call the function that resets the state of the quiz variables
    resetAllStates();
})
// Function for hiding all sections but the launch quiz card
function showLaunchQuizCardOnly(){
    quizEndedCard.attr("style", "display: none");
    currentQuestionCard.attr("style", "display: none");
    launchScreenCard.attr("style", "display: flex");
    highscoresCard.attr("style", "display: none");

    viewHighscoresLink.attr("style", "display: block");
    takeQuizLink.attr("style", "display: none");
}

// Function for populating the scoreboard
var highscoreBoard = $('#highscore-board')
function populateHighscoreBoard () {
    var userName = localStorage.getItem("user");
    var userScore = localStorage.getItem("score");
    if (!(userName === null && userScore === null)) {
        var userEl = $('<li>');
        userEl.addClass('list-group-item');
        userEl.text(userName + ": " + userScore);
        $('#highscore-list').append(userEl);
    }
}

// Call the populareHighscoreBoard function right away
populateHighscoreBoard();

// Function to reset all states
function resetAllStates() {
    // Set the timer back to 75
    time = 75;
    // Show the timer to the user
    shownTime.text(time);
    // Set endQuiz variable to false
    quizEnded = false;
    // Set the userAnswers array to be empty
    userAnswers = [];
    // Set the scoreboard input value to be empty
    userNameInput.val('');
}