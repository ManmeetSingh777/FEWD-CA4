import { Link } from 'react-router-dom';




export default function Result({ score, questions }) {
    const percentage = ((score / questions.length) * 100).toFixed(2);
  
    return (
      <div>
        <h1>Quiz Completed!</h1>
        <p>Your score: {score} / {questions.length}</p>
        <p>Percentage: {percentage}%</p>
        
        <Link to = "/"><button className='play-button' >Play Again</button></Link>
        
      </div>
    );
  }