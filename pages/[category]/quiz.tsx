import React from "react";
import Quiz, { IQuestion, Props } from "../../components/quiz";
import dynamic from "next/dynamic";
import { queryDatabase } from "../../src/api/query-database";
import {
  getAllCategories,
  getBlogRoutes,
} from "../../src/utils/parse-properties";
import questions from "../../components/quiz/data";
const DynamicQuizWithNoSSR = dynamic(() => import("../../components/quiz"), {
  ssr: false,
});

const QuizPage = (props: Props) => {
  return (
    <DynamicQuizWithNoSSR
      questions={props.questions}
      categoryLink={props.categoryLink}
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
      questions: questions.map((question: IQuestion) => {
        delete question.answer;
        return question;
      }),
      categoryLink,
    },
  };
}
