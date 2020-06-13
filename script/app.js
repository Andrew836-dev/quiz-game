// html element declarations
var questionList = document.getElementById('question-list');
var questionBox = document.getElementById('question-box');
var titleEl = document.getElementById('title');
var infoTextEl = document.getElementById('info-text');
var scoreEl = document.getElementById('score-text');
var timeEl = document.getElementById('time-text');
var startButtonEl = document.createElement('button');
// these variables are initialised in init()
var state, highList;
// these variables are initialised in start()
var score, currentQuestion, totalSeconds, timer, questions;
// these variables are initialised in addHighScore
var newHigh;

// function to save high scores to local storage
function setHighScores(scoreArray) {
    localStorage.setItem("highScores", JSON.stringify(scoreArray));
}

// function to retrieve high scores from local storage.
function retrievHighScores() {
    return JSON.parse(localStorage.getItem("highScores"));
}

// menu to begin the game
function init() {
    highList = retrievHighScores();
    // sets state for delegation
    state = "start-menu";
    // sets appearance of start menu
    titleEl.textContent = "Javascript Quizzer";
    questionBox.textContent = "Answer the questions as quickly as you can, you earn 1 point for each correct answer and lose 5 seconds for each incorrect answer."
    questionList.innerHTML = "";
    startButtonEl.textContent = "Click to Begin!";
    questionList.append(startButtonEl);
    // if highscores were retrieved, show the view high score button
    if (highList) {
        var highScoreButton = document.createElement('button');
        highScoreButton.setAttribute("id", "high-score")
        highScoreButton.textContent = "View High Scores";
        questionList.append(highScoreButton);
    }
}

// function to end the game
function endScreen() {
    var finalCorrectDisplay = document.createElement('li');
    var finalScoreDisplay = document.createElement('li');
    var nameField = document.createElement('input');
    var informativeText = document.createElement('p');
    // this makes sure that clicking the li objects does nothing
    state = "end-screen";
    clearInterval(timer);
    // clears the question area
    questionList.innerHTML = "";
    // makes content more vertical
    questionList.classList.remove('row');
    finalCorrectDisplay.style.listStyle = "none";
    finalScoreDisplay.style.listStyle = "none";
    questionBox.textContent = "Thanks for playing";
    finalCorrectDisplay.textContent = `Your final correct answer score was ${score} out of ${questions.length}`;
    finalScoreDisplay.textContent = `Plus ${totalSeconds} for your remaining time. ${totalSeconds + score} points!`;
    informativeText.textContent = "Enter your initials to view high scores.";
    nameField.setAttribute("type", "text")
    questionList.appendChild(finalCorrectDisplay);
    questionList.appendChild(finalScoreDisplay);
    questionList.appendChild(nameField);
    questionList.appendChild(informativeText);
}

function renderQuestion(index) {
    questionList.innerHTML = "";
    questionBox.textContent = questions[index].q;
    for (var i = 0; i < questions[index].a.length; i++) {
        var li = document.createElement('li');
        li.textContent = questions[index].a[i];
        li.setAttribute('data-index', i);
        li.classList.add('col-sm-5');
        questionList.appendChild(li);
    }
}

// updates time text and ends the game if time is 0
function updateTime() {
    if (totalSeconds > 0) {
        totalSeconds--;
        timeEl.textContent = totalSeconds;
    }
    else {
        endScreen();
    }
}

function start() {
    // boolean used between each answer to prevent repeated clicking while answers are being displayed.
    // this prevents free points or excess timeloss from each question.
    state = "playing";
    // sets the question list from setQuestions.js
    questions = setQuestions();
    totalSeconds = 100;
    timer = setInterval(updateTime, 1000);
    score = 0;
    currentQuestion = 0;
    // adds row class to questionList object, making it follow the grid for larger screens
    questionList.classList.add('row');
    // displays question 0, could replace the 0 with currentQuestion
    renderQuestion(0);
}

// bubble sort to put lowest score at the end of array, also splices the array to a maximum of 10 entries.
function sortScores(scoreArray) {
    var swapped;
    do {
        // if this stays false, the while loop ends.
        swapped = false;
        // check through the array
        for (var i = 0; i < scoreArray.length; i++) {
            // if the current value exists, AND the value after it exists, AND the current value is lower than the next value
            if (scoreArray[i] && scoreArray[i + 1] && scoreArray[i][1] < scoreArray[i + 1][1]) {
                // swapped to true so the while loop starts over again
                swapped = true;
                // temp variable to hold one number while we swap
                var temp = scoreArray[i];
                scoreArray[i] = scoreArray[i + 1];
                scoreArray[i + 1] = temp;
            }
        }
        // If a number was moved, run through the loop again
    } while (swapped)
    // cuts the score list down to the 10 highest scores
    if (scoreArray.length > 10) {
        scoreArray.splice(10);
    }
}

// function for adding a name to the high score list
function addHighScore(string) {
    // save the most recent score to a variable
    newHigh = [string, (score + totalSeconds)];
    // check to see if a high score list is defined
    if (highList) {
        highList.push(newHigh);
        // bubble sort to put the lowest score at the end
        sortScores(highList);
    }
    else {
        highList = [newHigh];
    }
    // saves high scores to local storage.
    setHighScores(highList);
}

function displayHighScore() {
    // sets state for event delegation
    state = "high-scores";
    // clears display
    questionList.innerHTML = "";
    // adds each score of the high score list to the display
    highList.forEach(element => {
        var li = document.createElement('li');
        li.textContent = `${element[0]}, ${element[1]} points.`;
        // checks if there is a recent high score, then compares the name to the current name
        if (newHigh && element[0] == newHigh[0]) {
            // makes the background green
            li.classList.add('correct');
            // checks if the most recent score is the same as the current score
            if (element[1] == newHigh[1]) {
                li.textContent = "---> " + li.textContent + " <---";
            }
        }
        else {
            // makes the background red
            li.classList.add('wrong');
        }
        questionList.append(li);
    });
    // reusing startButton element
    startButtonEl.textContent = "Back to start";
    questionList.append(startButtonEl);
    // Button for clearing high scores.
    var clearButtonEl = document.createElement('button');
    clearButtonEl.textContent = "Clear Highscores";
    clearButtonEl.setAttribute("id", "clear-scores");
    questionList.append(clearButtonEl);
}

// displays next question if there is one
function chooseNextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        renderQuestion(currentQuestion);
    }
    else {
        endScreen();
    }
    state = "playing";
}

function handleKey(event) {
    if (state == "end-screen" && event.target.matches('input')) {
        // keyCode 13 is the enter key
        if (event.keyCode == 13) {
            addHighScore(event.target.value.trim());
            displayHighScore();
        }
    }
}

function handleClick(event) {
    if (event.target.matches('button')) {
        if (state == 'start-menu') {
            if (event.target.id == 'high-score') {
                displayHighScore();
            }
            else {
                // to start playing the game
                start();
            }
        }
        else if (state == 'high-scores') {
            if (event.target.id == 'clear-scores') {
                localStorage.removeItem('highScores');
            }
            // to go to the home menu
            init();
        }
    }
    // This bit is for answering quiz questions
    else if (event.target.matches('li') && state === "playing") {
        chosenAnswer = event.target.getAttribute('data-index');
        if (chosenAnswer == questions[currentQuestion].correctIndex) {
            event.target.classList.add('correct');
            score++;
            scoreEl.textContent = score;
        }
        else {
            // this line turns the correct answer green
            questionList.children[questions[currentQuestion].correctIndex].classList.add('correct');
            // changes the clicked answer to red
            event.target.classList.add('wrong');
            // decrement time without going below zero
            if (totalSeconds > 4) {
                totalSeconds -= 4;
            }
            else {
                totalSeconds = 0;
            }
        }
        // this state prevents getting bonus points while the game should be paused
        state = "paused";
        setTimeout(chooseNextQuestion, 1000);
    }
}

// Event listeners
document.addEventListener('click', handleClick);
document.addEventListener('keydown', handleKey);

// sets up the start menu
init();