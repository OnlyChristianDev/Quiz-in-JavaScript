const startGameButton = document.querySelector(".start-quiz");
const questionsContainer = document.querySelector('.questions-container');
const answersContainer = document.querySelector('.answer-container');
const questionText = document.querySelector('.question');
const nextQuestionButton = document.querySelector(".next-question");
const phrasejoin = document.querySelector (".phrase") 
const theme = document.querySelector (".theme")


let currentQuestionIndex = 0;
let totalCorrect = 0;

theme.addEventListener ("change", changeTheme)
startGameButton.addEventListener("click", startGame);
nextQuestionButton.addEventListener("click", displayNextQuestion);


function changeTheme() {
    document.body.classList.toggle("white")
}
function startGame() {
    startGameButton.classList.add("hide")
    questionsContainer.classList.remove("hide")
    phrasejoin.classList.add ("hide") 
    displayNextQuestion();
}

function displayNextQuestion() {
    resetState();
    if (questions.length === currentQuestionIndex) {
        return finishGame();
    }

    questionText.textContent = questions[currentQuestionIndex].question;
    questions[currentQuestionIndex].answers.forEach(function (answer) {
        const newAnswer = document.createElement("button");
        newAnswer.classList.add("button", 'answer');
        newAnswer.textContent = answer.text;
        if (answer.correct) {
            newAnswer.dataset.correct = answer.correct;
        }
        answersContainer.appendChild(newAnswer);

        newAnswer.addEventListener("click", selectAnswer);
    });
    currentQuestionIndex++;
}

function selectAnswer(event) {
    const answerClicked = event.target;

    if (answerClicked.dataset.correct) {
        document.body.classList.add('correct');
        totalCorrect++;
    } else {
        document.body.classList.add("wrong");
    }
    document.querySelectorAll(".answer").forEach(function (button) {
        if (button.dataset.correct) {
            button.classList.add("correct");
        } else {
            button.classList.add("wrong");
        }
        button.disabled = true;
    });

    nextQuestionButton.classList.remove("hide");
}

function resetState() {
    while (answersContainer.firstChild) {
        answersContainer.removeChild(answersContainer.firstChild);
    }

    const isWhiteMode = document.body.classList.contains('white');
    document.body.className = isWhiteMode ? 'white' : '';
    nextQuestionButton.classList.add("hide");
}

function finishGame() {
    const totalQuestions = questions.length;
    const performance = Math.floor(totalCorrect * 100 / totalQuestions);

    let message = '';
    switch (true) {
        case (performance >= 90):
            message = 'Excelente. Mandou muito bem!';
            break;
        case (performance >= 70):
            message = 'Muito bom. Parabéns!';
            break;
        case (performance >= 50):
            message = 'Foi bem, mas dá pra melhorar!';
            break;
        default:
            message = 'Você pode melhorar. Acredito em você!';
            break;
    }
    questionsContainer.innerHTML =
        `
  <p class = "phrase"> Acertos: ${totalCorrect} de ${totalQuestions} questoes! <br> </p>
  <span> ${message} </span>
  <button class= "reload"onclick="location.reload()"> Refazer o teste! </button>
`;

}


const questions = [
    {
        question: "Dentro de qual elemento HTML colocamos o JavaScript?",
        answers: [
            { text: "<javascript>", correct: false },
            { text: "<js>", correct: false },
            { text: "<script>", correct: true },
            { text: "<scripting>", correct: false }
        ]
    },
    {
        question: "Onde é o lugar correto para inserir JavaScript?",
        answers: [
            { text: "no <head> e no <body>", correct: true },
            { text: "No <body>", correct: false },
            { text: "No <head>", correct: false },
            { text: "Em outro lugar", correct: false }
        ]
    },
    {
        question: 'Qual é a sintaxe correta para se referir a um script externo chamado "xxx.js"',
        answers: [
            { text: '<script src="xxx.js">', correct: true },
            { text: '<script href="xxx.js">', correct: false },
            { text: '<script name="xxx.js">', correct: false },
            { text: "Nenhuma das alternativas", correct: false }
        ]
    },
    {
        question: 'O arquivo JavaScript externo deve conter a tag <script>',
        answers: [
            { text: "Verdadeiro", correct: false },
            { text: "Falso", correct: true }
        ]
    },
    {
        question: 'Como escrever "Hello World" numa caixa de alerta?',
        answers: [
            { text: 'msg("Hello World");', correct: false },
            { text: 'alert("Hello World");', correct: true },
            { text: 'msgBox("Hello World");', correct: false },
            { text: 'alertBox("Hello World");', correct: false }
        ]
    },
    {
        question: 'Como podemos criar uma função no JavaScript?',
        answers: [
            { text: 'function: {myFunction()}', correct: false },
            { text: 'function myFunction()', correct: true },
            { text: 'function = myFunction()', correct: false },
            { text: 'Nenhum desses códigos', correct: false }
        ]
    },
    {
        question: 'Como podemos chamar uma função chamada "minhaFuncao"?',
        answers: [
            { text: 'call minhaFuncao()', correct: false },
            { text: 'call function minhaFuncao()', correct: false },
            { text: 'Nenhum desses códigos', correct: false },
            { text: 'minhaFuncao()', correct: true },
        ]
    },
];
