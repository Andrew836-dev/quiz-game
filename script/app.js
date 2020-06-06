var questionList = document.getElementById('question-list');
var headEl = document.getElementById('title');
var pEl = document.getElementById('info-text');
var scoreEl = document.getElementById('score-text');
var questionBox = document.getElementById('question-box');
var score, currentQuestion;
var questions = [
    {
        q: "how much wood would a wood chuck chuck?",
        a: ["if a wood chuck could chuck wood",
            "a wood chuck would chuck",
            "as much as a wood chuck could chuck",
            "if a wood chuck could chuck wood"],
        correctIndex: 0
    },
    {
        q: "",
        a: ["",
        "",
        "",
        ""],
        correctIndex: 1
    }];


init();

document.addEventListener('click', handleClick);

function init() {
    score = 0;
    currentQuestion = 0;
    headEl.textContent = "Questionaire for homework";
    renderQuestion(0);
    console.log(questionList.children);
}

function handleClick(event) {
    if (event.target.matches("button")) {
        chosenAnswer = event.target.getAttribute("data-index");
        if (chosenAnswer == questions[currentQuestion].correctIndex) {
            event.target.parentElement.classList.add("correct");
            correct();
        }
        else {
            event.target.parentElement.classList.add("wrong");
            questionList.children[questions[currentQuestion].correctIndex].classList.add("correct");
            wrong();
        }
    }
}

function correct() {
    console.log("Hooray!");
    score++;
    renderScore();
    chooseNextQuestion();
}

function wrong() {
    console.log("Doh!");
}

function renderScore() {
    scoreEl.textContent = score;
}

function chooseNextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion(currentQuestion);
    }
    else {
        endScreen();
    }
}

function renderQuestion(index) {
    questionList.innerHTML = "";
    questionList.textContent = questions[index].q;
    for (var i = 0; i < questions[index].a.length; i++) {
        var li = document.createElement('li');
        var button = document.createElement('button');
        li.textContent = questions[index].a[i];
        button.textContent = "Choose";
        button.setAttribute("data-index", i);
        questionList.append(li);
        li.append(button);
    }
}

function endScreen() {
    questionList.innerHTML = "";
    questionList.textContent = "Thanks for playing";
    var li = document.createElement('li');
    li.style.listStyle = "none";
    li.textContent = "Your final Score was " + score;
    questionList.append(li);
    var button = document.createElement('button');
    button.textContent = "Play again?";
    li.append(button);
}
