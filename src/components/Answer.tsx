import React from "react";
import { QuizContext } from "../QuizContext";

type AnswerProps = {
  answerId: string;
  answer: string;
  isChecked: boolean;
  isCorrect: boolean;
  questionId: string;
};

function Answer({
  answer,
  answerId,
  isChecked,
  isCorrect,
  questionId,
}: AnswerProps) {
  const parser = new DOMParser();
  const { handleCheckedAnswer, isQuizFinished } = React.useContext(QuizContext);

  const checkedClass = !isQuizFinished ? (isChecked ? "checked" : "") : "";
  const correctClass = isQuizFinished ? (isCorrect ? "correct" : (isChecked ? "not-correct" : "not-checked")) : "";

  return (
    <span
      style={{pointerEvents: isQuizFinished ? 'none' : 'all'}}
      className={`answer ${checkedClass} ${correctClass}`}
      onClick={() => handleCheckedAnswer(questionId, answerId)}
    >
      {
        parser.parseFromString("<!doctype html><body>" + answer, "text/html")
          .body.textContent
      }
    </span>
  );
}

export default Answer;
