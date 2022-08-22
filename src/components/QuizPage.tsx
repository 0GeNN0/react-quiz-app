import React from "react";

import { QuizContext } from "../QuizContext";
import Background from "./Background";
import QuestionSection from "./QuestionSection";
import { QuizDataType } from "./Quiz.types";

function QuizPage() {
  const { quizData, isQuizFinished, setIsQuizFinished, getScore, getQuiz, loading, setLoading } =
    React.useContext(QuizContext);

  return (
    <main className="quiz">
      <Background />
      {
        loading ?
        <h1 className="loading">Loading</h1>
        :
        quizData.map((item: QuizDataType) => (
          <QuestionSection
            key={item.id}
            questionId={item.id}
            question={item.question}
            allAnswers={item.allAnswers}
          />
        ))
      }
      <div className="action-btn">
        {isQuizFinished && (
          <p className="score">Your Scored {getScore()}/5 Correct Answer</p>
        )}
        <button
          onClick={() => {
            if (isQuizFinished) {
              setLoading(true)
              setIsQuizFinished(false);
              getQuiz()
            } else {
              setIsQuizFinished(true);
            }
          }}
        >
          {isQuizFinished ? "Play Again" : "Check Answer"}
        </button>
      </div>
    </main>
  );
}

export default QuizPage;
