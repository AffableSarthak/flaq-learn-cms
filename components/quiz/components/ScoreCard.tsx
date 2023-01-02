import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useQuizStore from "../store";
import { IQuestion } from "../data";
import ClaimCard from "./ClaimCard";

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

  return data.score;
};
const ScoreCard = ({
  questionList,
  retakeQuiz,
}: {
  questionList: Array<IQuestion>;
  retakeQuiz: (questions: Array<IQuestion>) => void;
}) => {
  const [showNFT, setShowNFT] = useState(0);
  const { allQuiz, markCompleted, addQuiz, isClaimed, setScore, getCurrentScore } = useQuizStore();
  const currentScore = getCurrentScore(questionList[0].category, allQuiz)

  useEffect(() => {
    addQuiz({
      category: questionList[0].category,
      completed: false,
      claimed: false,
      score: currentScore,
    });
    if (currentScore === 0) {
      checkScore(questionList).then((score) => setScore(questionList[0].category, score));
    }
  }, []);

  if (showNFT) {
    return <ClaimCard questionList={questionList} />;
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
        <Text fontWeight={'700'} fontFamily={'Druk Wide Bold'} fontSize={['xl', '3xl']} mb={4}>You Scored</Text>
        <CircularProgress
          value={currentScore}
          size="200px"
          color="#28CDB4"
          thickness="2px"
        >
          <CircularProgressLabel bg='white' color='black' p={10} w={'fit-content'} fontSize='2xl' rounded={'full'} boxShadow={'2px 3px 14px rgba(112, 255, 233, 0.5)'} fontWeight='600'>{currentScore.toFixed(0)}%</CircularProgressLabel>
        </CircularProgress>
        <Flex direction={"column"} my="2">
          {isClaimed(questionList[0].category, allQuiz) && (
            <Text my="8" textAlign={"center"}>
              NFT is Already Claimed
            </Text>
          )}
          {currentScore > 75 && !isClaimed(questionList[0].category, allQuiz) && (
            <Button
              my="2"
              onClick={(e) => {
                setShowNFT(1);
              }}
            >
              Claim NFT
            </Button>
          )}{" "}
          {currentScore <= 75 && (
            <Text textAlign={"center"} mb={10}>
              You need to score above 75% to claim your NFT. You can retake the
              quiz
            </Text>
          )}
          <Button
            onClick={(e) => {
              e.stopPropagation();
              retakeQuiz(questionList);
            }}
            my="2"
            colorScheme={'white'}
            bg='white'
            color={'black'}
            border={'1px'}
            borderColor={'#70FFE9'}
          >
            Retake Quiz
          </Button>
          {/* <Button onClick={() => markCompleted(questionList[0].category)}>
            Test
          </Button> */}
        </Flex>
      </Box>
    );
  }
};

export default ScoreCard;
