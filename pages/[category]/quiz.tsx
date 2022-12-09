import React from "react";
import Quiz, { IQuestion } from "../../components/quiz";
import dynamic from "next/dynamic";
import { queryDatabase } from "../../src/api/query-database";
import {
  getAllCategories,
  getBlogRoutes,
} from "../../src/utils/parse-properties";
// import questions from "../../components/quiz/data";
import { questionsData, IQuestionsData } from "../../components/quiz/data";
const DynamicQuizWithNoSSR = dynamic(() => import("../../components/quiz"), {
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
  console.log(context.query);
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

  return {
    props: {
      questionsData: {
        ...questionsData,
        questions: questionsData.questions.map((question: IQuestion) => {
          delete question.answer;
          return question;
        }),
      },
      categoryLink,
    },
  };
}
