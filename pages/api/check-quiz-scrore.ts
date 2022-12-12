import { NextApiRequest, NextApiResponse } from "next";
import { IQuestion } from "../../components/quiz";
import questionsData from "../../components/quiz/data";
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).send({ error: "method not allowed" });
  }

  const { questionList } = req.body;
  let score = 0;
  questionList.forEach((question: IQuestion, key: number) => {
    if (questionsData.questions[key].answer === question.selectedOption) {
      score++;
    }
  });
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, max-age=60, stale-while-revalidate=60"
  );

  res.status(200).json({
    score: (score * 100) / questionsData.questions.length,
  });
};
