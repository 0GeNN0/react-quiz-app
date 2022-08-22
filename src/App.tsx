import React from "react";
import QuizPage from "./components/QuizPage";

import StartPage from "./components/StartPage";
import { QuizContext } from "./QuizContext";

function App() {
  const { isQuizStarted } = React.useContext(QuizContext);
  return <main>{isQuizStarted ? <QuizPage /> : <StartPage />}</main>;
}

export default App;
