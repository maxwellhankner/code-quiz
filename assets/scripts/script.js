// Cards
var launchScreenCard = $('#launch-screen-card');
var currentQuestionCard = $('#question-answer-card');
var quizEndedCard = $('#quiz-ended-card');
var highscoresCard = $('#highscores-card');

var startQuizButton = $('#start-quiz-button');
var currentQuestionTitle = $('#current-question-title');
var allAnswers = $('.all-answers');

var userScoreShown = $('#user-score-shown')

var viewHighscoresLink = $('#view-highscores-link')
var takeQuizLink = $('#take-quiz-link')

var answerOptionOne = $('#answer-one');
var answerOptionTwo = $('#answer-two');
var answerOptionThree = $('#answer-three');
var answerOptionFour = $('#answer-four');

// Select last answer alert
var lastAnswerAlert = $('#last-answer-alert')
// lastAnswerAlert.text('hello');
// lastAnswerAlert.css("display", "block");
// console.log(lastAnswerAlert);

// Create timer variable and select time element
var time = 75;
var shownTime = $('#shown-time');

// Quiz is ended variable
var quizEnded = false;

// Questions and answers bank
var allQuestions = [['Question 1', 'this 1', 'that 1', 'the other', 'thing 1'],
['Question 2', 'this 2', 'that 2', 'the other', 'thing 2'],
['Question 3', 'this 3', 'that 3', 'the other', 'thing 3'],
['Question 4', 'this 4', 'that 4', 'the other', 'thing 4']]

var correctAnswers = ['answer-one', 'answer-two', 'answer-three', 'answer-four']

var userAnswers = [];

// Start quiz
startQuizButton.click(function(){
    launchScreenCard.attr("style", "display: none;");
    currentQuestionCard.attr("style", "display: flex;");
    runQuiz();
    runTimer();
})

// Quiz session function
function runQuiz() {
    var i = 0;
    generateQuestionCard(i);
    allAnswers.click(function(event){
        console.log(i);
        if (event.target.classList.contains('btn')){
            var answerIndex = event.target.getAttribute('id');
            userAnswers.push(answerIndex);
            // If the users answer is correct or incorrect
            if (answerIndex === correctAnswers[i]){
                lastAnswerAlert.text('CORRECT');
                lastAnswerAlert.removeClass("alert-danger");
                lastAnswerAlert.addClass("alert-primary");
            }
            else {
                lastAnswerAlert.text('INCORRECT');
                lastAnswerAlert.removeClass("alert-primary");
                lastAnswerAlert.addClass("alert-danger");
                time -= 5;
            }
            i += 1;
            if (i > 0){
                lastAnswerAlert.css("display", "block");
            }
            // else {
            //     lastAnswerAlert.css("display", "none");
            // }
            if (i < allQuestions.length){
                console.log(i);
                generateQuestionCard(i);
            }
            else {
                quizEnded = true;
                lastAnswerAlert.css("display", "none");
                endQuiz();
            }
        }
        
    })
}

// Dynamically generate question and answers card
function generateQuestionCard(i) {
    var currentQuestion = allQuestions[i][0];
    currentQuestionTitle.text(currentQuestion);
    // Populate each answer option
    answerOptionOne.text(allQuestions[i][1]);
    answerOptionTwo.text(allQuestions[i][2]);
    answerOptionThree.text(allQuestions[i][3]);
    answerOptionFour.text(allQuestions[i][4]);
}

// Timer function
function runTimer() {
    var countDownInterval = setInterval(function() {
        if(quizEnded){
            clearInterval(countDownInterval);
        }

        time--;
        shownTime.text(time);
        
        if(time === 0) {
            clearInterval(countDownInterval);
            endQuiz();
        }
    }, 1000);
}

// User score submit listener
var submitQuizButton = $('#submit-quiz-button');
submitQuizButton.click(function(){
    quizEndedCard.attr("style", "display: none");
    highscoresCard.attr("style", "display: flex");
})

// End quiz function
var finalTime = time;
function endQuiz () {
    finalTime = time;
    userScoreShown.text(finalTime)
    currentQuestionCard.attr("style", "display: none");
    quizEndedCard.attr("style", "display: flex");
}

// Event listener for clicking highscores link
function showHighscoreCardOnly() {
    quizEndedCard.attr("style", "display: none");
    currentQuestionCard.attr("style", "display: none");
    launchScreenCard.attr("style", "display: none");
    highscoresCard.attr("style", "display: flex");

    viewHighscoresLink.attr("style", "display: none");
    takeQuizLink.attr("style", "display: block");
}
viewHighscoresLink.click(function(){
    showHighscoreCardOnly();
})

// Event listener for clicking take quiz link
function showLaunchQuizCardOnly(){
    quizEndedCard.attr("style", "display: none");
    currentQuestionCard.attr("style", "display: none");
    launchScreenCard.attr("style", "display: flex");
    highscoresCard.attr("style", "display: none");

    viewHighscoresLink.attr("style", "display: block");
    takeQuizLink.attr("style", "display: none");
}
takeQuizLink.click(function(){
    showLaunchQuizCardOnly();
    resetAllStates();
})

// Populate the highscore board
var submitQuizButton = $('#submit-quiz-button');
var userNameInput = $('#user-name-input');
var userName = '';
submitQuizButton.click(function(){
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
populateHighscoreBoard();

function renderLastRegistered() {
    var storedEmail = localStorage.getItem("user");
    var storedPassword = localStorage.getItem("score");
    if(!(storedPassword === null && storedEmail === null)) {
      userEmailSpan.textContent = storedEmail;
      userPasswordSpan.textContent = storedPassword;
    }
    // Fill in code here to retrieve the last email and password.
    // If they are null, return early from this function
    // Else set the text of the userEmailSpan and userPasswordSpan 
    // to the corresponding values form local storgage
    
  }

  // Function to reset all states
  function resetAllStates() {
    time = 75;
    quizEnded = false;
    userAnswers = [];
  }