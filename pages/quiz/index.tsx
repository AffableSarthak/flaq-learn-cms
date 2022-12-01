import React from "react";
import Quiz, { Props } from "../../components/quiz";

const QuizPage = (props: Props) => {
  return <Quiz questions={props.questions} />;
};

export default QuizPage;

export async function getServerSideProps() {
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
    },
  };
}
