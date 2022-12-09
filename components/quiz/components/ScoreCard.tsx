import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ClaimCard from "./ClaimCard";

interface IQuestion {
  question: string;
  options: Array<string>;
  answer?: number;
  isAnswered?: boolean;
  selectedOption: number;
}
const checkScore = async (questionList: Array<IQuestion>) => {
  const data = await fetch("/api/check-quiz-scrore", {
    method: "POST",
    body: JSON.stringify({
      questionList,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => response.json());
  console.log(data);
  return data.score;
};
const ScoreCard = ({
  questionList,
  categoryLink,
  retakeQuiz,
}: {
  questionList: Array<IQuestion>;
  categoryLink: string;
  retakeQuiz: (questions: Array<IQuestion>) => void;
}) => {
  const [score, setScore] = useState(0);
  const [showNFT, setShowNFT] = useState(0);
  useEffect(() => {
    if (score === 0) {
      checkScore(questionList).then((score) => setScore(score));
    }
  }, []);

  if (showNFT) {
    return <ClaimCard />;
  } else {
    return (
      <Box
        h="100%"
        display={"flex"}
        flexDirection={"column"}
        justifyContent="center"
        alignItems={"center"}
        p="2"
      >
        <Text>You Scored</Text>
        <CircularProgress
          value={score}
          size="100px"
          color="green.400"
          thickness="4px"
        >
          <CircularProgressLabel>{score}%</CircularProgressLabel>
        </CircularProgress>
        <Box my="5">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              retakeQuiz(questionList);
            }}
          >
            Retake Quiz
          </Button>
        </Box>
      </Box>
    );
  }
};

export default ScoreCard;
