import { useState } from "react";
import "./App.css";
import CardContainer from "./CardContainer";
import Header from "./Header";

function App() {
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [round, setRound] = useState(1);

  return (
    <div>
      <Header score={score} highscore={highscore} round={round} />
      <CardContainer
        setScore={setScore}
        currentScore={score}
        setRound={setRound}
        currentRound={round}
        setHighscore={setHighscore}
        currentHighscore={highscore}
      />
    </div>
  );
}

export default App;
