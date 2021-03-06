// questions is a variable declared in app.js
// perhaps this would have been compartmentalized better if it returned a questions object rather than just setting it.
// to read the first question is questions[0].q
// the first offered answer to the first question is questions[0].a[0]
// the correct answer is at the questions[0].a[questions[0].correctIndex]

function setQuestions() {
    var questions = [
        {
            q: "Arrays in Javascript can be used to contain _____.",
            a: ["Numbers",
                "Strings",
                "Objects",
                "All of the above"],
            correctIndex: 3
        },
        {
            q: "What is the standard construction of a for loop?",
            a: ["for ( var i = 0; i < targetnumber; i++ )",
                "for ( i = target; i === true )",
                "for ( var i = 0; i < 5 ; i-- )",
                "for ( ; false;  )"],
            correctIndex: 0
        },
        {
            q: "What is the property to retrieve or change the text inside of a text input field?",
            a: [".textContent",
                ".value",
                ".content",
                ".text"],
            correctIndex: 1
        },
        {
            q: "Which of these variables accesses the root of the DOM?",
            a: ["body",
                "html",
                "document",
                "head"],
            correctIndex: 2
        },
        {
            q: "Console.log() is a useful tool for debugging.",
            a: ["True",
                "False"],
            correctIndex: 0
        },
        {
            q: "An Event _____ can be used to react to mouse clicks and key presses",
            a: ["Listener",
                "Senser",
                "Detecter",
                "Fastener"],
            correctIndex: 0
        },
        {
            q: "Javascript is a _____ Oriented Programming language",
            a: ["Data",
                "Function",
                "Object",
                "People"],
            correctIndex: 2
        },
        {
            q: "In Javascript, anything between quotation marks \"\" is a ______",
            a: ["Operation",
                "String",
                "Sentence",
                "Thread"],
            correctIndex: 1
        }
    ];
    return questions;
}
