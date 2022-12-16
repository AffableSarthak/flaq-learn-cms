import { NextApiRequest, NextApiResponse } from "next";

import questionsData, { IQuestion } from "../../components/quiz/data";
import getQuizData from "../../src/utils/quizUtils";
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).send({ error: "method not allowed" });
  }

  const { questionList } = req.body;
  let score = 0;
  const questionsData = await getQuizData();

  questionList.forEach((question: IQuestion, key: number) => {
    const currentQuestion = questionsData.find(
      (item) => item.id === question.id
    );

    if (currentQuestion !== undefined) {
      if (
        currentQuestion.answerText === question.options[question.selectedOption]
      ) {
        score++;
      }
    }
  });
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, max-age=60, stale-while-revalidate=60"
  );

  res.status(200).json({
    score: (score * 100) / questionList.length,
  });
};
