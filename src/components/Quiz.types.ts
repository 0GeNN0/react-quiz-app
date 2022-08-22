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

export type CreateContextValueType = {
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

export type QuizContextProviderProps = {
  children: React.ReactNode;
};