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
    "Group Id": number;
    Link: string;
  };
}
const formatQuizData = (data: Array<IQuizData>) => {
  try {
    const quizData = data
      .filter((item) => Object.keys(item.fields).length !== 0)
      .map((item, index) => {
        return {
          id: item.id,
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
          category: item.fields.Category,
          groupId: item.fields["Group Id"],
          createdTime: item.createdTime,
          needHelp: item.fields.Link
        };
      });
    return quizData;
  } catch (error) {
    return [];
  }
};

const getQuizData = async () => {
  const response = await fetch(
    "https://api.airtable.com/v0/appx2tBkSX4tjNtOA/Quizzes",
    requestOptions
  );
  if (!response.ok) {
    return [];
  } else {
    const data = await response.json();
    return formatQuizData(data.records);
  }
};

export default getQuizData;
