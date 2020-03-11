# Code Quiz

## Welcome to Maxwell Hankner's Code Quiz
Take this quiz to test you javascipt knowledge! 

## Features
This program allows a user to run though a javascript quiz and receive a score when completed. As they answer questions, they will see an alart message at the bottom of the quiz to see if they got the last question right or wrong. There is also a timer running in the corner of the screen that represents their score. If the user gets a question wrong, five seconds will be deducted from the clock. If the user runs out of time, the quiz will automatically end. At the end of the quiz, the user can enter a screen-name and submit it to the leaderboard. The screen-name and score of whoever took the quiz before them will be shown on the scoreboard, as well. If this is the first time running the quiz, no other scores will be shown. When the user is done, they can run it back and take the whole quiz again!

## Challenges
Where do I start? Probably the hardest part of this project was getting the program to run through all the questions and answers without showing something unwanted or just breaking altogether. Another issue I has was allowing the user to run back through the quiz after they were done. It took me a while to reset the variables and get the answer buttons working properly. They were getting linked to the click listener multiple times and that was messing things up. Unfortanetly, I wasn't able to fix everything I wanted. If the user doesn't follow the quiz as intented, things will still get messed up. I managed to fix some things, but not all.

## Not Included
If I had the time, I would get the leaderboard to function as desired. Currently, only the most recent user will show up on the leaderboard. I would turn the user and score variables (in local storage) to string arrays that can be iterated through. The local storage key value pairs only accept strings (I believe). The scoreboard also is not organized by highest score, just most the recent entry. I would also work on stress testing and getting more bugs worked out. For example, if a user answer two questions, and then clicks 'highscores', and then tries to take the quiz again, it doesn't work. And I would try to fix more things like that.

### Thanks for checking out this project!