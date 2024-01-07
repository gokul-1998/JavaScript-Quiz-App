const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

// function startGame() {
//   startButton.classList.add('hide')
//   shuffledQuestions = questions.sort(() => Math.random() - .5)
//   currentQuestionIndex = 0
//   questionContainerElement.classList.remove('hide')
//   setNextQuestion()
// }

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const csvLink = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSNeDJhczsZ15-g4J3WlTqeOTaGS8iwHvUjsD_c90uUtwSrE7vVY5msruJnGQ447jTKYWvsAlAOVxUV/pub?gid=0&single=true&output=csv";

let questions; // Declare questions variable outside of functions to make it accessible

async function fetchData() {
  try {
    const response = await fetch(csvLink);
    const data = await response.text();

    const results = Papa.parse(data, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transform: (value, header) => {
        if (header === 'answers') {
          try {
            value = value.replace(/'/g, '"');
            value = value.replace(/(\w+:)|(\w+ :)/g, function(matchedStr) {
              return '"' + matchedStr.substring(0, matchedStr.length - 1) + '":';
            });
            return JSON.parse(value);
          } catch (error) {
            console.error('Invalid JSON in answers field:', value);
            return null;
          }
        } else {
          return value;
        }
      }
    }).data;

    console.log(results);

    questions = results; // Assign the fetched data to questions variable
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchData().then(() => {
  console.log('Data fetched successfully');
  startGame(); // Call startGame function after fetching data
});

function startGame() {
  // Rest of your startGame function remains unchanged
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - 0.5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

// Rest of your code remains unchanged

const questions111 = [
  {
    question: 'What is 2 + 2?',
    answers: [
      { text: '4', correct: true },
      { text: '22', correct: false }
    ]
  },
  {
    question: 'Who is the best YouTuber?',
    answers: [
      { text: 'Web Dev Simplified', correct: true },
      { text: 'Traversy Media', correct: true },
      { text: 'Dev Ed', correct: true },
      { text: 'Fun Fun Function', correct: true }
    ]
  },
  {
    question: 'Is web development fun?',
    answers: [
      { text: 'Kinda', correct: false },
      { text: 'YES!!!', correct: true },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false }
    ]
  },
  {
    question: 'What is 4 * 2?',
    answers: [
      { text: '6', correct: false },
      { text: '8', correct: true }
    ]
  }
]

console.log(questions)