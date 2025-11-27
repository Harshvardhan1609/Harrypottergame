// Hogwarts AI Quiz - JavaScript Logic

const WIN_THRESHOLD = 4; // must score > 3 to win

// Quiz Questions (10 basic AI questions)
const questions = [
  {
    question: "What does AI stand for?",
    options: [
      "Advanced Internet",
      "Artificial Intelligence",
      "Automatic Interface",
      "Applied Informatics"
    ],
    correctIndex: 1
  },
  {
    question: "Which of the following is a common use of AI?",
    options: [
      "Washing clothes by hand",
      "Sending letters by pigeon",
      "Voice assistants like Siri or Alexa",
      "Lighting a candle"
    ],
    correctIndex: 2
  },
  {
    question: "Which of these is an AI technique?",
    options: [
      "Machine Learning",
      "Handwriting",
      "Broom Flying",
      "Book Binding"
    ],
    correctIndex: 0
  },
  {
    question: "Which device often uses AI features?",
    options: [
      "Smartphone",
      "Wooden Chair",
      "Chalkboard",
      "Candle Stand"
    ],
    correctIndex: 0
  },
  {
    question: "Which of these is a famous AI chess-playing program?",
    options: [
      "Deep Blue",
      "Deep Lake",
      "Dark Forest",
      "Magic Knight"
    ],
    correctIndex: 0
  },
  {
    question: "AI can help in which of these tasks?",
    options: [
      "Predicting weather",
      "Making tea without electricity",
      "Growing plants instantly",
      "Stopping time"
    ],
    correctIndex: 0
  },
  {
    question: "Which of these terms is related to AI?",
    options: [
      "Neural Network",
      "Magic Wand",
      "Quidditch Broom",
      "Sorting Hat"
    ],
    correctIndex: 0
  },
  {
    question: "What is a chatbot?",
    options: [
      "A robot that washes dishes",
      "A program that talks to users using text or voice",
      "A machine that flies",
      "A spell book"
    ],
    correctIndex: 1
  },
  {
    question: "Which of these is an example of AI in everyday life?",
    options: [
      "Automatic photo tagging on social media",
      "Manual lock on a door",
      "Ordinary candle light",
      "Writing with a quill"
    ],
    correctIndex: 0
  },
  {
    question: "AI systems learn from:",
    options: [
      "Magic spells",
      "Random guesses only",
      "Data and examples",
      "Only human emotions"
    ],
    correctIndex: 2
  }
];

// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionNumberSpan = document.getElementById("question-number");
const scoreSpan = document.getElementById("score");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");

const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");
const finalScoreValue = document.getElementById("final-score-value");

// Music elements
const musicBtn = document.getElementById("music-btn");
const bgMusic = document.getElementById("bg-music");

let currentQuestionIndex = 0;
let score = 0;
let optionsLocked = false;
let isMusicPlaying = false;

// Optional music config
if (bgMusic) {
  bgMusic.loop = true;
  bgMusic.volume = 0.4; // adjust as needed
}

// Start the quiz
startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = score.toString();
  loadQuestion();
});

// Load a question
function loadQuestion() {
  optionsLocked = false;
  nextBtn.classList.add("hidden");

  const currentQuestion = questions[currentQuestionIndex];
  questionNumberSpan.textContent = (currentQuestionIndex + 1).toString();
  questionText.textContent = currentQuestion.question;

  // Clear previous options
  optionsContainer.innerHTML = "";

  // Create buttons for options
  currentQuestion.options.forEach((optionText, index) => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.textContent = optionText;

    btn.addEventListener("click", () => handleOptionClick(btn, index));
    optionsContainer.appendChild(btn);
  });
}

// Handle option click
function handleOptionClick(button, selectedIndex) {
  if (optionsLocked) return;
  optionsLocked = true;

  const currentQuestion = questions[currentQuestionIndex];
  const correctIndex = currentQuestion.correctIndex;

  // Mark all options as disabled
  const optionButtons = document.querySelectorAll(".option-btn");
  optionButtons.forEach((btn, idx) => {
    btn.classList.add("disabled");
    if (idx === correctIndex) {
      btn.classList.add("correct");
    }
  });

  // Mark wrong if incorrect
  if (selectedIndex !== correctIndex) {
    button.classList.add("wrong");
  } else {
    score++;
    scoreSpan.textContent = score.toString();
  }

  // Show next button
  nextBtn.classList.remove("hidden");
}

// Next question / show result
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

// Show result screen
function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  finalScoreValue.textContent = score.toString();

  if (score >= WIN_THRESHOLD) {
    resultTitle.textContent = "🎉 You’re an AI Wizard!";
    resultMessage.textContent =
      "The Sorting Hat approves! You’ve scored enough to join the AI House at Hogwarts.";
  } else {
    resultTitle.textContent = "⚡ Try Again, Young Wizard!";
    resultMessage.textContent =
      "Your magic is growing. Study a bit more AI and attempt the quiz again.";
  }
}

// Restart button
restartBtn.addEventListener("click", () => {
  score = 0;
  currentQuestionIndex = 0;
  scoreSpan.textContent = score.toString();
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  loadQuestion();
});

// === Music Toggle Logic ===
if (musicBtn && bgMusic) {
  musicBtn.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic
        .play()
        .then(() => {
          isMusicPlaying = true;
          musicBtn.textContent = "Music: ON ♫";
        })
        .catch((err) => {
          console.error("Audio play was blocked by the browser:", err);
        });
    } else {
      bgMusic.pause();
      isMusicPlaying = false;
      musicBtn.textContent = "Music: OFF ♫";
    }
  });
}
