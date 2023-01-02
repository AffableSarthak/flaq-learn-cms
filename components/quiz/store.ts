import create from "zustand";
import { devtools, persist } from "zustand/middleware";
interface IQuestionSet {
  category: string;
  completed: boolean;
  claimed: boolean;
  score: number
}
interface IQuizAllStore {
  allQuiz: Array<IQuestionSet>;
  addQuiz: (quiz: IQuestionSet) => void;
  markCompleted: (category: string) => void;
  markClaimed: (category: string) => void;
  isClaimed: (category: string, allQuiz: Array<IQuestionSet>) => boolean;
  getCurrentScore: (category: string, allQuiz: Array<IQuestionSet>) => number;
  setScore: (category: string, score: number) => void;
}

export const useQuizStore = create<IQuizAllStore>()(
  devtools(
    persist(
      (set) => ({
        allQuiz: [],
        addQuiz: (quiz: IQuestionSet) => {
          set((data) => {
            const isExist = data.allQuiz.find((q) => q.category === quiz.category);
            if (isExist) {
              return { allQuiz: [...data.allQuiz] };
            } else {
              return { allQuiz: [...data.allQuiz, quiz] };
            }
          });
        },
        isClaimed: (category: string, allQuiz: Array<IQuestionSet>) => {
          const quiz = allQuiz.find((q) => q.category === category);
          if (!quiz) return false;
          return quiz.claimed;
        },
        getCurrentScore: (category: string, allQuiz: Array<IQuestionSet>) => {
          const quiz = allQuiz.find((q) => q.category === category);
          if (!quiz) return 0;
          return quiz.score;
        },

        // find by id and mark completed
        markCompleted: (category: string) => {
          set((data) => {
            const quiz = data.allQuiz.find((q) => q.category === category);
            if (!quiz) return { allQuiz: data.allQuiz };
            data.allQuiz[data.allQuiz.indexOf(quiz)].completed = true;
            return { allQuiz: data.allQuiz };
          });
        },
        markClaimed: (category: string) => {
          set((data) => {
            const quiz = data.allQuiz.find((q) => q.category === category);
            if (!quiz) return { allQuiz: data.allQuiz };
            data.allQuiz[data.allQuiz.indexOf(quiz)].claimed = true;
            return { allQuiz: data.allQuiz };
          });
        },
        setScore: (category: string, score: number) => {
          set((data) => {
            const quiz = data.allQuiz.find((q) => q.category === category);
            if (!quiz) return { allQuiz: data.allQuiz };
            data.allQuiz[data.allQuiz.indexOf(quiz)].score = score;
            return { allQuiz: data.allQuiz };
          })
        }
      }),
      {
        name: "quiz-store",
      }
    )
  )
);

export default useQuizStore;
