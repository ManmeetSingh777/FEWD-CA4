import { Link } from "react-router-dom";

export default function Home() {
    return (
      <div>
        <h1>Welcome to the Quiz!</h1>
        <Link to={"/quiz"}><button>Play</button></Link>
      </div>
    );
  }
  