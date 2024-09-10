import { useState } from "react";
import "./App.css";
import CardContainer from "./components/CardContainer";
import Header from "./components/Header";

function App() {
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [level, setLevel] = useState(1);

  return (
    <div>
      <Header score={score} highscore={highscore} level={level} />
      <CardContainer
        setScore={setScore}
        currentScore={score}
        setLevel={setLevel}
        currentLevel={level}
        setHighscore={setHighscore}
        currentHighscore={highscore}
      />
    </div>
  );
}

export default App;
