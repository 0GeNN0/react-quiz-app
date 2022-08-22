export type AnswerType = {
  id: string;
  answer: string;
  isChecked: boolean;
  isCorrect: boolean;
};

export type QuizDataType = {
  id: string;
  question: string;
  allAnswers: AnswerType[];
};
