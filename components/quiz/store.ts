import create from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface IQuestion {
  question: string;
  options: Array<string>;
  answer: number;
  isAnswered?: boolean;
}
export interface Props {
  questions: Array<IQuestion>;
}

interface IQuizStore {
  questionList: Array<IQuestion>;
  currentQuestion: number;
  setQuestionList: (questions: Array<IQuestion>) => void;
  setCurrentQuestion: (question: number) => void;
  retakeQuiz: (questionList: Array<IQuestion>) => void;
}

export const useQuizStore = create<IQuizStore>()(
  devtools(
    persist(
      (set) => ({
        questionList: [],
        currentQuestion: 0,
        setCurrentQuestion: (currentQuestion: number) =>
          set({ currentQuestion }),
        setQuestionList: (questionList) => set({ questionList }),
        retakeQuiz: (questionList: Array<IQuestion>) =>
          set({ currentQuestion: 0, questionList }),
      }),
      {
        name: "quiz-store",
      }
    )
  )
);

export default useQuizStore;
