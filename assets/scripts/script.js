var launchContainer = $('#launch-container');
var startQuizButton = $('#start-quiz-button');
var currentQuestion = $('#question-0');

startQuizButton.click(function(){
    launchContainer.attr("style", "display: none;");
    currentQuestion.attr("style", "display: flex;")
})