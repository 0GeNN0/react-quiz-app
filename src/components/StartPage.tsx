import React from "react";

import { QuizContext } from "../QuizContext";
import Background from "./Background";

function StartPage() {
  const { startQuiz } = React.useContext(QuizContext);

  return (
    <div className="start-page">
      <Background />
      <h1>Quizzical</h1>
      <h3>Check Your Knowledge</h3>
      <button onClick={startQuiz}>Start Quiz</button>
    </div>
  );
}

export default StartPage;
