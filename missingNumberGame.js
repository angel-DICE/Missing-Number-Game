let score = 0;
let correctAnswer;
let timeLeft = 30;
let timer;

function generateQuestion() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operators = ['+', '-', '*'];
  const operator = operators[Math.floor(Math.random() * operators.length)];
  let questionText = '';
  const missingLeft = Math.random() < 0.5;

  if (operator === '+') {
    const total = num1 + num2;
    if (missingLeft) {
      correctAnswer = num1;
      questionText = `__ + ${num2} = ${total}`;
    } else {
      correctAnswer = num2;
      questionText = `${num1} + __ = ${total}`;
    }
  } else if (operator === '-') {
    const total = num1 - num2;
    if (missingLeft) {
      correctAnswer = num1;
      questionText = `__ - ${num2} = ${total}`;
    } else {
      correctAnswer = num2;
      questionText = `${num1} - __ = ${total}`;
    }
  } else if (operator === '*') {
    const total = num1 * num2;
    if (missingLeft) {
      correctAnswer = num1;
      questionText = `__ × ${num2} = ${total}`;
    } else {
      correctAnswer = num2;
      questionText = `${num1} × __ = ${total}`;
    }
  }

  document.getElementById('question').textContent = questionText;
  document.getElementById('answer').value = '';
  document.getElementById('feedback').textContent = '';
}

function startGame() {
  score = 0;
  timeLeft = 30;
  document.getElementById('score').textContent = score;
  document.getElementById('time').textContent = timeLeft;
  document.getElementById('answer').disabled = false;
  document.getElementById('submit').disabled = false;
  generateQuestion();

  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('time').textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      document.getElementById('answer').disabled = true;
      document.getElementById('submit').disabled = true;
      alert(`⏰ Time's up! You answered ${score} question(s) correctly.`);
    }
  }, 1000);
}

function checkAnswer() {
  const userAnswer = parseInt(document.getElementById('answer').value);
  const feedback = document.getElementById('feedback');

  if (isNaN(userAnswer)) {
    feedback.style.color = 'gray';
    feedback.textContent = 'Please enter a number.';
    return;
  }

  if (userAnswer === correctAnswer) {
    score++;
    feedback.style.color = 'green';
    feedback.textContent = '✅ Correct!';
  } else {
    feedback.style.color = 'red';
    feedback.textContent = `❌ Wrong! The correct answer was ${correctAnswer}.`;
  }

  document.getElementById('score').textContent = score;
  generateQuestion();
}
