import React from "react";
import Quiz, { Props } from "../../components/quiz";
import dynamic from "next/dynamic";
import { queryDatabase } from "../../src/api/query-database";
import {
  getAllCategories,
  getBlogRoutes,
} from "../../src/utils/parse-properties";
const DynamicQuizWithNoSSR = dynamic(() => import("../../components/quiz"), {
  ssr: false,
});



const QuizPage = (props: Props) => {
  return (
    <DynamicQuizWithNoSSR questions={props.questions} categoryLink={props.categoryLink} />
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
  
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["New York", "London", "Paris", "Dublin"],
      answer: 3,
      isAnswered: false,
    },
    {
      question: "Who is CEO of Tesla?",
      options: ["Jeff Bezos", "Elon Musk", "Bill Gates", "Tony Stark"],
      answer: 2,
      isAnswered: false,
    },
    {
      question: "The iPhone was created by which company?",
      options: ["Apple", "Intel", "Amazon", "Microsoft"],
      answer: 1,
      isAnswered: false,
    },
    {
      question: "How many Harry Potter books are there?",
      options: ["1", "4", "6", "7"],
      answer: 4,
      isAnswered: false,
    },
  ];

  return {
    props: {
      questions,
      categoryLink,
    },
  };
}
