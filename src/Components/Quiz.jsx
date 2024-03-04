import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
export default function Quiz({ onComplete,questions }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [score, setScore] = useState(0);
    const [highlighted, setHighlighted] = useState(false);
    const navigate = useNavigate();
  
    const handleOptionSelect = (option) => {
      setSelectedOption(option);
      setTimeout(() => {
        setSelectedOption('');
        if (currentQuestion + 1 < questions.length) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          onComplete(score + (option === questions[currentQuestion].answer ? 1 : 0));
          if (currentQuestion === 4) { 
            navigate('/result'); 
          }
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
        <Link to = "/result"><button onClick={handleQuit}>Quit</button></Link>
          
          <button onClick={handleHighlight}>Highlight</button>
        </div>
      </div>
    );
  }
  