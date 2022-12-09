const questions = [
  {
    question: "What is the capital of France?",
    options: ["New York", "London", "Paris", "Dublin"],
    answer: 3,
    selectedOption: -1,
    isAnswered: false,
  },
  {
    question: "Who is CEO of Tesla?",
    options: ["Jeff Bezos", "Elon Musk", "Bill Gates", "Tony Stark"],
    answer: 2,
    selectedOption: -1,
    isAnswered: false,
  },
  {
    question: "The iPhone was created by which company?",
    options: ["Apple", "Intel", "Amazon", "Microsoft"],
    answer: 1,
    selectedOption: -1,
    isAnswered: false,
  },
  {
    question: "How many Harry Potter books are there?",
    options: ["1", "4", "6", "7"],
    answer: 4,
    selectedOption: -1,
    isAnswered: false,
  },
];

export interface IQuestionsData {
  id: string;
  questions: Array<{
    question: string;
    options: Array<string>;
    answer: number;
    selectedOption: number;
    isAnswered: boolean;
  }>;
  thresholdPercent: number;
}
export const questionsData = {
  id: "Dive-Into-Web3",
  questions: [
    {
      question: "What is the capital of France?",
      options: ["New York", "London", "Paris", "Dublin"],
      answer: 3,
      selectedOption: -1,
      isAnswered: false,
    },
    {
      question: "Who is CEO of Tesla?",
      options: ["Jeff Bezos", "Elon Musk", "Bill Gates", "Tony Stark"],
      answer: 2,
      selectedOption: -1,
      isAnswered: false,
    },
    {
      question: "The iPhone was created by which company?",
      options: ["Apple", "Intel", "Amazon", "Microsoft"],
      answer: 1,
      selectedOption: -1,
      isAnswered: false,
    },
    {
      question: "How many Harry Potter books are there?",
      options: ["1", "4", "6", "7"],
      answer: 4,
      selectedOption: -1,
      isAnswered: false,
    },
  ],
  thresholdPercent: 75,
};

export default questionsData;
