import React, { useState } from 'react';
import './Quiz.css';
import logo from './assets/download.png';
import Quiz from './Components/Quiz';
import Result from './Components/Result';
import Home from './Components/Home';

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
        {currentPath === '/quiz' && <Quiz questions={questions} onComplete={handleQuizComplete} />}
        {currentPath === '/result' && score !== null && <Result score={score} questions={questions} />}
      </div>
    </div>
  );
}

export default App;
