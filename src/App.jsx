import React, { useState } from 'react';
import './Quiz.css';
import logo from './assets/download.png';


const questions = [
  {
    question: "What is ReactJS?",
    options: ["Server-side framework", "User interface framework", "Both a and b", "None of the above"],
    answer: "User interface framework"
  },
  {
    question: "React.js is written in which of the following language?",
    options: ["JavaScript", "Java", "C", "C++"],
    answer: "JavaScript"
  },
  {
    question: "What is a state in React?",
    options: ["A permanent storage.", "Internal storage of the component.", "External storage of the component.", "None of the above."],
    answer: "Internal storage of the component."
  },
  {
    question: "What is the return value of the useState hook?",
    options: ["Pair of current state and function updating it", "Current State", "Function updating the current state", "UseState returns nothing"],
    answer: "Pair of current state and function updating it"
  },
  {
    question: "How many elements can a valid react component return?",
    options: ["1", "2", "3", "4"],
    answer: "1"
  },
];

function Quiz({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [highlighted, setHighlighted] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setTimeout(() => {
      setSelectedOption('');
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        onComplete(score + (option === questions[currentQuestion].answer ? 1 : 0));
      }
    }, 100);
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handleQuit = () => {
    onComplete(score);
  };

  const handleHighlight = () => {
    setHighlighted(!highlighted);
  };

  return (
    <div className="quiz-container">
      <h2>Question {currentQuestion + 1} out of {questions.length}</h2>
      <p>
        <span className={highlighted ? 'highlighted' : ''}>{questions[currentQuestion].question}</span>
      </p>
      <div className="options">
        <div className="options-column">
          {questions[currentQuestion].options.map((option, index) => (
            <li key={index}>
              <label>
                <input
                  type="radio"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionSelect(option)}
                />
                {option}
              </label>
            </li>
          ))}
        </div>
      </div>
      <div className="button-container">
        <button onClick={handleQuit}>Quit</button>
        <button onClick={handleHighlight}>Highlight</button>
      </div>
    </div>
  );
}

function Result({ score }) {
  const percentage = ((score / questions.length) * 100).toFixed(2);

  return (
    <div>
      <h1>Quiz Completed!</h1>
      <p>Your score: {score} / {questions.length}</p>
      <p>Percentage: {percentage}%</p>
      <button className='play-button' onClick={() => window.location.reload()}>Play Again</button>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>Welcome to the Quiz!</h1>
      <a href="/quiz">Play</a>
    </div>
  );
}

function App() {
  const [score, setScore] = useState(null);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [darkMode, setDarkMode] = useState(false);

  const handleQuizComplete = (finalScore) => {
    setScore(finalScore);
    setCurrentPath('/result');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <img src={logo} alt="Logo" className="logo" />
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <div className="quiz-container">
        {currentPath === '/' && <Home />}
        {currentPath === '/quiz' && <Quiz onComplete={handleQuizComplete} />}
        {currentPath === '/result' && score !== null && <Result score={score} />}
      </div>
    </div>
  );
}

export default App;

