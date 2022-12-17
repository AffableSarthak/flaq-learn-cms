import { NextApiRequest, NextApiResponse } from "next";

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer keyCU5DgZpATtf8aL");

var requestOptions: RequestInit = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};
interface IQuizData {
  id: string;
  createdTime: string;
  fields: {
    "Option 4": string;
    Answer: string;
    "Option 2": string;
    Category: string;
    Question: string;
    "Option 3": string;
    "Option 1": string;
    "Group Id": 1;
  };
}
const formatQuizData = (data: Array<IQuizData>) => {
  try {
    const quizData = data
      .filter((item) => Object.keys(item.fields).length !== 0)
      .map((item) => {
        return {
          question: item.fields.Question,
          options: [
            item.fields["Option 1"],
            item.fields["Option 2"],
            item.fields["Option 3"],
            item.fields["Option 4"],
          ],
          answer: [
            item.fields["Option 1"],
            item.fields["Option 2"],
            item.fields["Option 3"],
            item.fields["Option 4"],
          ].indexOf(item.fields.Answer),
          answerText: item.fields.Answer,
          selectedOption: -1,
          isAnswered: false,
        };
      });
    return quizData;
  } catch (error) {
    return [];
  }
};

const getQuizData = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return res.status(405).send({ error: "method not allowed" });
  }
  const response = await fetch(
    "https://api.airtable.com/v0/appx2tBkSX4tjNtOA/Quizzes",
    requestOptions
  );
};
export default getQuizData;
