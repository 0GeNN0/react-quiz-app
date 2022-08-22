import React from "react";

import { AnswerType } from "./Quiz.types";
import Answer from "./Answer";

type QuestionSectionProps = {
  questionId: string;
  question: string;
  allAnswers: AnswerType[];
};

function QuestionSection({
  question,
  questionId,
  allAnswers,
}: QuestionSectionProps) {
  const parser = new DOMParser();

  return (
    <section className="question">
      <h2 className="question-text">
        {
          // This Line Convert The HTML Symbol To Its Meaning Like ==>> &gt;
          parser.parseFromString(
            "<!doctype html><body>" + question,
            "text/html"
          ).body.textContent
        }
      </h2>
      <div className="answers-container">
        {allAnswers.map((answerObj: AnswerType) => (
          <Answer
            key={answerObj.id}
            questionId={questionId}
            answerId={answerObj.id}
            answer={answerObj.answer}
            isChecked={answerObj.isChecked}
            isCorrect={answerObj.isCorrect}
          />
        ))}
      </div>
    </section>
  );
}

export default QuestionSection;
