var questionList = document.getElementById('question-list');
var questionBox = document.getElementById('question-box');
var headEl = document.getElementById('title');
var pEl = document.getElementById('info-text');
var scoreEl = document.getElementById('score-text');
var timeEl = document.getElementById('time-text');
var startButton = document.createElement('button');
var score, currentQuestion, totalSeconds, timer, timeOut, questions, pause, newHigh, highList, state;

init();

document.addEventListener('click', handleClick);
document.addEventListener('keydown', handleKey);

function init() {
    state = "start-menu";
    headEl.textContent = "Javascript Quizzer";
    questionList.innerHTML = "";
    startButton.textContent = "Click to Begin!";
    questionList.append(startButton);
}

function start() {
    state = "quiz";
    pause = false;
    setQuestions();
    totalSeconds = 100;
    timer = setInterval(updateTime, 1000);
    score = 0;
    currentQuestion = 0;
    questionList.classList.add('row');
    renderQuestion(0);
}

function handleClick(event) {
    if (event.target.matches('button')) {
        if (state == 'start-menu') {
            start();
        }
        else if (state == 'high-scores') {
            init();
        }
    }
    else if (event.target.matches('li') && !pause) {
        chosenAnswer = event.target.getAttribute('data-index');
        if (chosenAnswer == questions[currentQuestion].correctIndex) {
            correct(event.target);
        }
        else {

            questionList.children[questions[currentQuestion].correctIndex].classList.add('correct');
            wrong(event.target);
        }
        // console.log("pausing");
        pause = true;
        timeOut = setTimeout(chooseNextQuestion, 1000);
    }
}

function handleKey(event) {
    if (event.target.matches('input')) {
        if (event.keyCode == 13) {
            addHighScore(event.target.value.trim());
            displayHighScore();
        }
    }
}

function addHighScore(string) {
    newHigh = [string, (score + totalSeconds)];
    highList = retrievHighScores();
    if (highList) {
        highList.push(newHigh);
        sortScores(highList);
    }
    else {
        highList = [newHigh];
    }
    setHighScores(highList);
}

function displayHighScore() {
    highList = retrievHighScores();
    var button = document.createElement('button');
    state = "high-scores";
    questionList.innerHTML = "";
    highList.forEach(element => {
        var li = document.createElement('li');
        li.textContent = element[0] + ", " + element[1];
        if (element[0] == newHigh[0]) {
            li.classList.add('correct');
            if (element[1] == newHigh[1]) {
                li.textContent = "---> " + li.textContent + " <---";
            }
        }
        else {
            li.classList.add('wrong');
        }
        questionList.append(li);
    });
    button.textContent = "Back to start";
    questionList.append(button);
}

function setHighScores(scoreArray) {
    localStorage.setItem("highScores", JSON.stringify(scoreArray));
}

function retrievHighScores() {
    return JSON.parse(localStorage.getItem("highScores"));
}

function sortScores(scoreArray) {
    var swapped;
    do {
        swapped = false;
        for (var i = 0; i < scoreArray.length; i++) {
            if (scoreArray[i] && scoreArray[i + 1] && scoreArray[i][1] < scoreArray[i + 1][1]) {
                swapped = true;
                console.log('swapping');
                var temp = scoreArray[i];
                scoreArray[i] = scoreArray[i + 1];
                scoreArray[i + 1] = temp;
            }
        }
    } while (swapped)
    if (scoreArray.length > 10) {
        scoreArray.splice(10);
    }
}

function correct(element) {
    element.classList.add('correct');
    console.log('Hooray!');
    score++;
    renderScore();
}

function wrong(element) {
    element.classList.add('wrong');
    console.log('Doh!');
    if (totalSeconds > 4) {
        totalSeconds -= 4;
    }
    else {
        totalSeconds = 0;
    }
}

function renderScore() {
    scoreEl.textContent = score;
}

function chooseNextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        renderQuestion(currentQuestion);
    }
    else {
        endScreen();
    }
    // console.log("unpausing");
    pause = false;
}

function updateTime() {
    if (totalSeconds > 0) {
        totalSeconds--;
        timeEl.textContent = totalSeconds;
    }
    else {
        endScreen();
    }
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

function endScreen() {
    var li = document.createElement('li');
    var li2 = document.createElement('li');
    var textField = document.createElement('input');
    var pEl2 = document.createElement('p');
    pause = true;
    clearInterval(timer);
    questionList.innerHTML = "";
    questionList.classList.remove('row');
    questionBox.textContent = "Thanks for playing";
    li.style.listStyle = "none";
    li.textContent = `Your final correct answer score was ${score} out of ${questions.length}`;
    questionList.append(li);
    li2.style.listStyle = "none";
    li2.textContent = `Plus ${totalSeconds} for your remaining time. ${totalSeconds + score} points!`
    textField.setAttribute("type", "text")
    questionList.appendChild(textField);
    pEl2.textContent = "Enter your initials to view high scores.";
    questionList.appendChild(pEl2);
}
