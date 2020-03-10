var launchScreenCard = $('#launch-screen-card');
var startQuizButton = $('#start-quiz-button');
var currentQuestionCard = $('#question-0');
var currentQuestionTitle = $('#current-question-title');
var allAnswers = $('.all-answers');

var answerOptionOne = $('#answer-one');
var answerOptionTwo = $('#answer-two');
var answerOptionThree = $('#answer-three');
var answerOptionFour = $('#answer-four');

// Questions and answers bank
var allQuestions = [['Question 1', 'this 1', 'that 1', 'the other', 'thing 1'],
['Question 2', 'this 2', 'that 2', 'the other', 'thing 2'],
['Question 3', 'this 3', 'that 3', 'the other', 'thing 3'],
['Question 4', 'this 4', 'that 4', 'the other', 'thing 4']]

var correctAnswers = ['answer-one', 'answer-two', 'answer-three', 'answer-four']

var userAnswers = []

// Start quiz
startQuizButton.click(function(){
    launchScreenCard.attr("style", "display: none;");
    currentQuestionCard.attr("style", "display: flex;");
    runQuiz();
})

// Quiz session function
function runQuiz() {
    var i = 0;
    generateQuestionCard(i);
    allAnswers.click(function(event){
        
        if (event.target.classList.contains('btn')){
            var answerIndex = event.target.getAttribute('id');
            userAnswers.push(answerIndex);
            if (answerIndex === correctAnswers[i]){
                console.log('correct');
            }
            else {
                console.log('incorrect');
            }
            i += 1;
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