import React from "react";
import { UUID } from "uuid-generator-ts";

import { AnswerType, QuizDataType } from "./components/Quiz.types";

type CreateContextValueType = {
  isQuizStarted: boolean;
  startQuiz(): void;
  quizData: QuizDataType[];
  handleCheckedAnswer(questionId: string, answerId: string): void;
  isQuizFinished: boolean;
  setIsQuizFinished: React.Dispatch<React.SetStateAction<boolean>>;
  getScore(): number;
  getQuiz(): void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
};

type ContextProps = {
  children: React.ReactNode;
};

export const QuizContext = React.createContext({} as CreateContextValueType);

function QuizContextProvider(props: ContextProps) {
  const [isQuizStarted, setIsQuizStarted] = React.useState(false);
  const [quizData, setQuizData] = React.useState({} as QuizDataType[]);
  const [isQuizFinished, setIsQuizFinished] = React.useState(false);
  const [loading, setLoading] = React.useState(true)

  const getQuiz = async () => {
    let URL =
      "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple";
    const res = await fetch(URL);
    const fetchedData = await res.json();

    const customizeFetched = fetchedData.results.map((item: any) => {
      // Put the correct answer with the incorrect answers
      const mergeAnswers: string[] = [
        ...item.incorrect_answers,
        item.correct_answer,
      ].sort() // Sorting To Change The Placement Of The Correct Answer Not To Be At Last Always

      // create a new array with needed value to handle the quiz 
      const allAnswers: AnswerType[] = mergeAnswers.map((answer: string) => {
        const answerId = new UUID();
        return {
          id: answerId.getDashFreeUUID(),
          answer,
          isChecked: false,
          isCorrect: answer === item.correct_answer,
        };
      });

      const questionId = new UUID();
      return {
        id: questionId.getDashFreeUUID(),
        question: item.question,
        allAnswers,
      };
    });

    setQuizData(customizeFetched);
    setLoading(false);
  };

  React.useEffect(() => {
    getQuiz();
  }, []);

  function startQuiz() {
    setIsQuizStarted(true);
  }

  function getScore(): number {
    let score = 0;
    quizData.forEach((item: QuizDataType) => {
      item.allAnswers.forEach((answer: AnswerType) => {
        if (answer.isChecked && answer.isCorrect) score++;
      });
    });

    return score;
  }

  function handleCheckedAnswer(questionId: string, answerId: string) {
    setQuizData((prev: QuizDataType[]): QuizDataType[] => {
      return prev.map((item: QuizDataType) => {
        return item.id === questionId
          ? {
              ...item,
              allAnswers: item.allAnswers.map(
                (answerObj: AnswerType): AnswerType => {
                  return answerObj.id === answerId
                    ? {
                        ...answerObj,
                        isChecked: !answerObj.isChecked,
                      }
                    : {
                        ...answerObj,
                        isChecked: false,
                      };
                }
              ),
            }
          : item;
      });
    });
  }

  return (
    <QuizContext.Provider
      value={{
        isQuizStarted,
        startQuiz,
        quizData,
        handleCheckedAnswer,
        isQuizFinished,
        setIsQuizFinished,
        getScore,
        getQuiz,
        loading,
        setLoading
      }}
    >
      {props.children}
    </QuizContext.Provider>
  );
}

export default QuizContextProvider;
