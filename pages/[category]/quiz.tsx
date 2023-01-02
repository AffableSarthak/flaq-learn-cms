import React from "react";

import dynamic from "next/dynamic";
import { queryDatabase } from "../../src/api/query-database";
import {
  getAllCategories,
  getBlogRoutes,
} from "../../src/utils/parse-properties";
// import questions from "../../components/quiz/data";
import { IQuestionsData, IQuestion } from "../../components/quiz/data";
import getQuizData from "../../src/utils/quizUtils";

const DynamicQuizWithNoSSR = dynamic(() => import("../../components/quiz/index"), {
  ssr: false,
});
interface Props {
  categoryLink: string;
  questionsData: IQuestionsData;
}
const QuizPage = (props: Props) => {
  return (
    <DynamicQuizWithNoSSR
      categoryLink={props.categoryLink}
      questionsData={props.questionsData}
    />
  );
};

export default QuizPage;

export async function getServerSideProps(context: any) {
  const database = await queryDatabase();
  const allCategory = getAllCategories(database!);
  const categoryWithUrl = allCategory.find(
    (category) => category.slug === context.query.category
  );

  if (categoryWithUrl === undefined) {
    return {
      notFound: true,
    };
  }

  const categoryLink =
    categoryWithUrl?.slug + "?priority=" + categoryWithUrl?.priority;
  const data = await getQuizData();
  const questionsData = data.filter(
    (q) =>
      q.category.toLowerCase() ===
      context.query.category.split("-").join(" ").toLowerCase()
  );

  return {
    props: {
      questionsData: {
        ...questionsData,
        questions: questionsData.map((data: IQuestion) => {
          // delete data.answer;
          return data;
        }),
      },
      categoryLink,
    },
  };
}
