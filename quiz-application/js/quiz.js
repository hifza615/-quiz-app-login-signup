const questions = [
  {
    category: "HTML",
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tool Multi Language", "Home Text Markup Language"],
    answer: 0
  },
  {
    category: "HTML",
    question: "Which HTML element is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: 1
  },
  {
    category: "HTML",
    question: "Which attribute is used to provide alternative text for an image?",
    options: ["title", "alt", "src", "text"],
    answer: 1
  },
  {
    category: "HTML",
    question: "Which element is used to create a dropdown list?",
    options: ["<dropdown>", "<input>", "<select>", "<list>"],
    answer: 2
  },
  {
    category: "HTML",
    question: "Which input type is used for selecting a date?",
    options: ["calendar", "date", "datetime", "day"],
    answer: 1
  },
  {
    category: "HTML",
    question: "Which tag represents the most important heading?",
    options: ["<heading>", "<h6>", "<h1>", "<head>"],
    answer: 2
  },
  {
    category: "HTML",
    question: "Which semantic element is commonly used for navigation links?",
    options: ["<nav>", "<navigate>", "<links>", "<menu>"],
    answer: 0
  },
  {
    category: "HTML",
    question: "Which attribute makes an input field mandatory?",
    options: ["validate", "required", "must", "important"],
    answer: 1
  },
  {
    category: "CSS",
    question: "Which CSS property changes the text color?",
    options: ["font-color", "text-color", "color", "foreground"],
    answer: 2
  },
  {
    category: "CSS",
    question: "Which selector targets an element with the id 'header'?",
    options: [".header", "#header", "header", "*header"],
    answer: 1
  },
  {
    category: "CSS",
    question: "Which property is used to create a flex container?",
    options: ["position: flex", "display: flex", "flex: display", "layout: flex"],
    answer: 1
  },
  {
    category: "CSS",
    question: "Which CSS property controls the space inside an element?",
    options: ["margin", "spacing", "padding", "border"],
    answer: 2
  },
  {
    category: "CSS",
    question: "Which value of position keeps an element attached to the viewport while scrolling?",
    options: ["absolute", "relative", "fixed", "static"],
    answer: 2
  },
  {
    category: "CSS",
    question: "Which CSS feature is used to make a website responsive?",
    options: ["Media queries", "CSS variables", "Float", "Text transform"],
    answer: 0
  },
  {
    category: "CSS",
    question: "Which property is used to make text bold?",
    options: ["font-style", "font-weight", "text-weight", "bold"],
    answer: 1
  },
  {
    category: "CSS",
    question: "What is the default position value of an HTML element?",
    options: ["relative", "absolute", "fixed", "static"],
    answer: 3
  },
  {
    category: "JavaScript",
    question: "Which keyword declares a block-scoped variable that can be reassigned?",
    options: ["var", "let", "const", "define"],
    answer: 1
  },
  {
    category: "JavaScript",
    question: "Which method adds an item to the end of an array?",
    options: ["push()", "pop()", "shift()", "add()"],
    answer: 0
  },
  {
    category: "JavaScript",
    question: "Which operator checks both value and data type?",
    options: ["==", "=", "===", "!="],
    answer: 2
  },
  {
    category: "JavaScript",
    question: "Which method selects an element by its ID?",
    options: ["document.selectById()", "document.getElementById()", "document.getId()", "document.findId()"],
    answer: 1
  },
  {
    category: "JavaScript",
    question: "Which event occurs when a user clicks an element?",
    options: ["hover", "change", "click", "press"],
    answer: 2
  },
  {
    category: "JavaScript",
    question: "Which loop is commonly used to iterate over array values?",
    options: ["for...of", "for...in only", "repeat", "loop...array"],
    answer: 0
  },
  {
    category: "JavaScript",
    question: "Which data type represents true or false?",
    options: ["String", "Boolean", "Number", "Object"],
    answer: 1
  },
  {
    category: "JavaScript",
    question: "Which Web API allows data to be stored in the browser as key-value pairs?",
    options: ["sessionAPI", "browserData", "localStorage", "webStorageOnly"],
    answer: 2
  },
  {
    category: "JavaScript",
    question: "Which syntax is used for a template literal?",
    options: ["Single quotes", "Double quotes", "Backticks", "Parentheses"],
    answer: 2
  }
];

if (!localStorage.getItem("currentUser")) {
  window.location.href = "index.html";
}

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let timer;
let timeLeft = 30;

const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const category = document.getElementById("category");
const optionsContainer = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const timerDisplay = document.getElementById("timer");
const progressBar = document.getElementById("progressBar");

function loadQuestion() {
  clearInterval(timer);
  selectedAnswer = null;
  nextBtn.disabled = true;
  timeLeft = 30;
  timerDisplay.textContent = timeLeft;

  const q = questions[currentQuestion];

  questionNumber.textContent =
    `Question ${String(currentQuestion + 1).padStart(2, "0")} / ${questions.length}`;

  category.textContent = q.category;
  questionText.textContent = q.question;
  progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;

  optionsContainer.innerHTML = "";

  q.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option";
    button.textContent = option;

    button.addEventListener("click", () => selectAnswer(index, button));

    optionsContainer.appendChild(button);
  });

  startTimer();
}

function selectAnswer(index, selectedButton) {
  selectedAnswer = index;
  nextBtn.disabled = false;

  document.querySelectorAll(".option").forEach(button => {
    button.classList.remove("selected");
  });

  selectedButton.classList.add("selected");
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      goToNextQuestion();
    }
  }, 1000);
}

function goToNextQuestion() {
  clearInterval(timer);

  if (selectedAnswer !== null && selectedAnswer === questions[currentQuestion].answer) {
    score++;
  }

  if (currentQuestion === questions.length - 1) {
    localStorage.setItem("quizScore", score);
    localStorage.setItem("quizCompleted", "true");
    window.location.href = "result.html";
    return;
  }

  currentQuestion++;
  loadQuestion();
}

nextBtn.addEventListener("click", goToNextQuestion);

loadQuestion();
