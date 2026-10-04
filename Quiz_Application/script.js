document.addEventListener("DOMContentLoaded", () => {

    const startBtn = document.getElementById("start-btn");
    const quizContainer = document.getElementById("quiz-container");
    const startScreen = document.getElementById("start-screen");
    const questionText = document.getElementById("question");
    const choicesContainer = document.getElementById("choices");
    const nextBtn = document.getElementById("next-btn");
    const scoreDisplay = document.getElementById("score");
    const resultScreen = document.getElementById("result-screen");
    const finalScore = document.getElementById("final-score");
    const restartBtn = document.getElementById("restart-btn");

    const questions = [
        {
            question: "What is the capital of France?",
            choices: ["Paris", "London", "Berlin", "Madrid"],
            answer: "Paris"
        },
        {
            question: "Which planet is known as the Red Planet?",
            choices: ["Mars", "Venus", "Jupiter", "Saturn"],
            answer: "Mars"
        },
        {
            question: "Who wrote 'Hamlet'?",
            choices: [
                "Charles Dickens",
                "Jane Austen",
                "William Shakespeare",
                "Mark Twain"
            ],
            answer: "William Shakespeare"
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    startBtn.addEventListener("click", startQuiz);
    nextBtn.addEventListener("click", nextQuestion);
    restartBtn.addEventListener("click", startQuiz);

    function startQuiz() {
        currentQuestion = 0;
        score = 0;
        startScreen.classList.add("hidden");
        resultScreen.classList.add("hidden");
        quizContainer.classList.remove("hidden");
        showQuestion();
    }

    function showQuestion() {
        const current = questions[currentQuestion];
        questionText.textContent = current.question;
        choicesContainer.innerHTML = "";
        current.choices.forEach(choice => {
            const button = document.createElement("button");
            button.textContent = choice;
            button.className =
                "w-full border border-indigo-200 p-3 rounded-lg text-left hover:bg-indigo-50";
                button.addEventListener("click", () => {
                checkAnswer(choice);
            });

            choicesContainer.appendChild(button);
        });

        scoreDisplay.textContent = `Score: ${score}`;

        nextBtn.classList.add("hidden");
    }

    function checkAnswer(selectedAnswer) {
        const correctAnswer = questions[currentQuestion].answer;
        if (selectedAnswer === correctAnswer) {
            score++;
        }
        scoreDisplay.textContent = `Score: ${score}`;
        nextBtn.classList.remove("hidden");
    }

    function nextQuestion() {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }

    function showResult() {
        quizContainer.classList.add("hidden");
        resultScreen.classList.remove("hidden");
        finalScore.textContent =
            `You scored ${score} out of ${questions.length}`;
    }

});