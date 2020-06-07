var questionList = document.getElementById('question-list');
var questionBox = document.getElementById('question-box');
var headEl = document.getElementById('title');
var pEl = document.getElementById('info-text');
var scoreEl = document.getElementById('score-text');
var timeEl = document.getElementById('time-text');
var score, currentQuestion, totalSeconds, timer, timeOut, questions, pause;

init();

document.addEventListener('click', handleClick);

function init() {
    pause = false;
    setQuestions();
    totalSeconds = 100;
    timer = setInterval(updateTime, 1000);
    score = 0;
    currentQuestion = 0;
    headEl.textContent = "Questionaire for homework";
    renderQuestion(0);
}

function setQuestions() {
    questions = [
        {
            q: "how much wood would a wood chuck chuck?",
            a: ["if a wood chuck could chuck wood",
                "a wood chuck would chuck",
                "as much as a wood chuck could chuck",
                "if a wood chuck could chuck wood"],
            correctIndex: 0
        },
        {
            q: "how much wood would a wood chuck chuck?",
            a: ["if a wood chuck could chuck wood",
                "a wood chuck would chuck",
                "as much as a wood chuck could chuck",
                "if a wood chuck could chuck wood"],
            correctIndex: 0
        },
        {
            q: "how much wood would a wood chuck chuck?",
            a: ["if a wood chuck could chuck wood",
                "a wood chuck would chuck",
                "as much as a wood chuck could chuck",
                "if a wood chuck could chuck wood"],
            correctIndex: 0
        },
        {
            q: "how much wood would a wood chuck chuck?",
            a: ["if a wood chuck could chuck wood",
                "a wood chuck would chuck",
                "as much as a wood chuck could chuck",
                "if a wood chuck could chuck wood"],
            correctIndex: 0
        },
        {
            q: "how much wood would a wood chuck chuck?",
            a: ["if a wood chuck could chuck wood",
                "a wood chuck would chuck",
                "as much as a wood chuck could chuck",
                "if a wood chuck could chuck wood"],
            correctIndex: 0
        },
        {
            q: "how much wood would a wood chuck chuck?",
            a: ["if a wood chuck could chuck wood",
                "a wood chuck would chuck",
                "as much as a wood chuck could chuck",
                "if a wood chuck could chuck wood"],
            correctIndex: 0
        },
        {
            q: "how much wood would a wood chuck chuck?",
            a: ["if a wood chuck could chuck wood",
                "a wood chuck would chuck",
                "as much as a wood chuck could chuck",
                "if a wood chuck could chuck wood"],
            correctIndex: 0
        },
        {
            q: "In Javascript, anything between quotation marks \"\" is a ______",
            a: ["Operation",
                "String",
                "Sentence",
                "Thread"],
            correctIndex: 1
        }];
}

function handleClick(event) {
    if (event.target.matches('li') && !pause) {
        chosenAnswer = event.target.getAttribute('data-index');
        if (chosenAnswer == questions[currentQuestion].correctIndex) {
            correct(event.target);
        }
        else {

            questionList.children[questions[currentQuestion].correctIndex].classList.add('correct');
            wrong(event.target);
        }
        console.log("pausing");
        pause = true;
        timeOut = setTimeout(chooseNextQuestion, 1000);
    }
}

function correct(element) {
    // if (!pause) {
    element.classList.add('correct');
    console.log('Hooray!');
    score++;
    // }
    renderScore();
}

function wrong(element) {
    // if (!pause) {
    element.classList.add('wrong');
    console.log('Doh!');
    if (totalSeconds > 5) {
        totalSeconds -= 5;
    }
    else {
        totalSeconds = 0;
    }
    // }
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
    console.log("unpausing");
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
        questionList.appendChild(li);
    }
}

function endScreen() {
    pause = true;
    clearInterval(timer);
    questionList.innerHTML = "";
    questionBox.textContent = "Thanks for playing";
    var li = document.createElement('li');
    li.style.listStyle = "none";
    li.textContent = `Your final Score was ${score} out of ${questions.length}`;
    questionList.append(li);
    var button = document.createElement('button');
    button.textContent = "Play again?";
    questionList.append(button);
}
