import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { IQuestion } from "./data";

export interface Props {
  questions: Array<IQuestion>;
}

interface IQuizStore {
  questionList: Array<IQuestion>;
  currentQuestion: number;
  progress: number;
  setQuestionList: (
    questions: Array<IQuestion>,
    currentQuestion: number
  ) => void;
  setCurrentQuestion: (question: number) => void;
  retakeQuiz: (questionList: Array<IQuestion>) => void;
}

export const useQuizStore = create<IQuizStore>()(
  devtools(
    persist(
      (set) => ({
        questionList: [],
        currentQuestion: -1,
        progress: 0,
        setCurrentQuestion: (currentQuestion: number) =>
          set({ currentQuestion }),
        setQuestionList: (questionList, currentQuestion) =>
          set({
            questionList,
            progress: (currentQuestion * 100) / questionList.length,
          }),
        retakeQuiz: (questionList: Array<IQuestion>) => {
          const updatedQuestions: Array<IQuestion> = questionList.map(
            (question) => {
              return {
                ...question,
                isAnswered: false,
                selectedOption: -1,
              };
            }
          );
          set({ currentQuestion: -1, questionList: updatedQuestions });
        },
      }),
      {
        name: "quiz-store",
      }
    )
  )
);

export default useQuizStore;
