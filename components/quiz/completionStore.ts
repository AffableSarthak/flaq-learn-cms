import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { IQuestion } from "./data";

interface IQuestionSet {
  name: string;
  questionArray: Array<IQuestion>;
  completed: boolean;
  claimed: boolean;
}
interface IQuizAllStore {
  allQuiz: Array<IQuestionSet>;
  addQuiz: (quiz: IQuestionSet) => void;
  markCompleted: (name: string) => void;
  isClaimed: (name: string, allQuiz: Array<IQuestionSet>) => boolean;
}

export const useAllQuizStore = create<IQuizAllStore>()(
  devtools(
    persist(
      (set) => ({
        allQuiz: [],
        addQuiz: (quiz: IQuestionSet) => {
          set((data) => {
            const isExist = data.allQuiz.find((q) => q.name === quiz.name);
            if (isExist) {
              return { allQuiz: [...data.allQuiz] };
            } else {
              return { allQuiz: [...data.allQuiz, quiz] };
            }
          });
        },
        isClaimed: (name: string, allQuiz: Array<IQuestionSet>) => {
          const quiz = allQuiz.find((q) => q.name === name);
          if (!quiz) return false;
          return quiz.claimed;
        },

        // find by id and mark completed
        markCompleted: (name: string) => {
          set((data) => {
            const quiz = data.allQuiz.find((q) => q.name === name);
            if (!quiz) return { allQuiz: data.allQuiz };
            data.allQuiz[data.allQuiz.indexOf(quiz)].completed = true;
            return { allQuiz: data.allQuiz };
          });
        },
      }),
      {
        name: "quiz-store-all",
      }
    )
  )
);

export default useAllQuizStore;
