import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useAllQuizStore from "../completionStore";
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
  categoryLink,
  retakeQuiz,
}: {
  questionList: Array<IQuestion>;
  categoryLink: string;
  retakeQuiz: (questions: Array<IQuestion>) => void;
}) => {
  const [score, setScore] = useState(0);
  const [showNFT, setShowNFT] = useState(0);
  const { allQuiz, markCompleted, addQuiz, isClaimed } = useAllQuizStore();

  useEffect(() => {
    addQuiz({
      questionArray: questionList,
      name: questionList[0].category,
      completed: false,
      claimed: false,
    });

    if (score === 0) {
      checkScore(questionList).then((score) => setScore(score));
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
        <Text fontWeight={'700'} fontFamily={'Druk Wide Bold'} fontSize={'3xl'}>You Scored</Text>
        <CircularProgress
          value={score}
          size="150px"
          color="#28CDB4"
          thickness="2px"
        >
          <CircularProgressLabel bg='white' color='black' p={7} w={'fit-content'} fontSize='xl' rounded={'full'} boxShadow={'2px 3px 14px rgba(112, 255, 233, 0.5)'} fontWeight='600'>{score.toFixed(0)}%</CircularProgressLabel>
        </CircularProgress>
        <Flex direction={"column"} my="2">
          {isClaimed(questionList[0].category, allQuiz) && (
            <Text my="8" textAlign={"center"}>
              NFT is Already Claimed
            </Text>
          )}
          {score > 75 && !isClaimed(questionList[0].category, allQuiz) && (
            <Button
              my="2"
              onClick={(e) => {
                setShowNFT(1);
              }}
            >
              Claim NFT
            </Button>
          )}{" "}
          {score <= 75 && isClaimed(questionList[0].category, allQuiz) && (
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
