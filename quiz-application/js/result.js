if (!localStorage.getItem("currentUser")) {
  window.location.href = "index.html";
}

const completed = localStorage.getItem("quizCompleted");
const score = Number(localStorage.getItem("quizScore")) || 0;
const total = 25;
const percentage = Math.round((score / total) * 100);

if (completed !== "true") {
  window.location.href = "home.html";
}

document.getElementById("score").textContent = `${score} / ${total}`;
document.getElementById("percentage").textContent = `${percentage}%`;

let message;

if (percentage >= 80) {
  message = "Excellent work! ";
} else if (percentage >= 60) {
  message = "Great effort! Keep practicing and you'll get even better! ";
  //prh krr aaoo..
} else {
  message = "Better luck next time! learn and come again ";
}

document.getElementById("resultMessage").textContent = message;

document.getElementById("retryBtn").addEventListener("click", () => {
  localStorage.removeItem("quizScore");
  localStorage.removeItem("quizCompleted");
  window.location.href = "quiz.html";
});

document.getElementById("homeBtn").addEventListener("click", () => {
  window.location.href = "home.html";
});

// thee endddddd //