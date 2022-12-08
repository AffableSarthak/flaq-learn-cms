import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Flex,
  Icon,
  IconButton,
  Progress,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Navbar from "../common/Navbar";
import useQuizStore from "./store";
import { VscArrowLeft, VscArrowRight } from "react-icons/vsc";

export interface IQuestion {
  question: string;
  options: Array<string>;
  answer: number;
  isAnswered?: boolean;
  selectedOption: number;
}
export interface Props {
  questions: Array<IQuestion>;
  categoryLink: string;
}

// Utility function to check if clicked in first half of the screen or second half
function isFirstHalf(
  event: React.MouseEvent<HTMLButtonElement>,
  referenceElement: any
) {
  const position = {
    x: event.pageX,
    y: event.pageY,
  };

  const offset = {
    left: referenceElement.offsetLeft,
    top: referenceElement.offsetTop,
  };

  let reference = referenceElement.offsetParent;

  while (reference) {
    offset.left += reference.offsetLeft;
    offset.top += reference.offsetTop;
    reference = reference.offsetParent;
  }
  const isFirstHalf =
    Math.round(
      ((position.x - offset.left) * 100) / referenceElement.offsetWidth
    ) >= 50
      ? false
      : true;

  return isFirstHalf;
}
const checkScore = async () => {
  fetch("/api/check-quiz-scrore", {
    method: "POST",
    body: JSON.stringify({
      score: 10,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
    .catch((error) => console.error("Error:", error));
};
const Quiz = ({ questions, categoryLink }: Props) => {
  const {
    questionList,
    setQuestionList,
    currentQuestion,
    setCurrentQuestion,
    retakeQuiz,
    progress,
  } = useQuizStore();

  useEffect(() => {
    questionList.length === 0 && setQuestionList(questions, currentQuestion);
  }, []);
  const calculateScore = () => {
    let score = 0;
    questionList.forEach((question) => {
      if (question.answer === question.selectedOption) {
        score++;
      }
    });
    return score;
  };
  const ref = useRef(null);

  const toast = useToast();
  const [selected, setSelected] = useState(-1);
  const handleAnswerOptionClick = (key: number) => {
    const prevQuestionList = questionList;
    prevQuestionList[currentQuestion] = {
      ...prevQuestionList[currentQuestion],
      selectedOption: key,
    };
    setQuestionList(prevQuestionList, currentQuestion);
    setTimeout(() => {
      setCurrentQuestion(currentQuestion + 1);
      setSelected(-1);
    }, 500);
  };

  // handle on click events on card and decide move to next or previous
  const handleNavigationClick = (e: any) => {
    if (isFirstHalf(e, ref.current)) {
      // if current question is not first question then move to previous question
      currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1);
    } else {
      // if current question is not last question and Answered Already then move to next question
      !(currentQuestion >= questionList.length) &&
        toast({
          title: "Click the right answer to continue",
          status: "info",
          duration: 1000,
          isClosable: true,
        });
      currentQuestion != questionList.length &&
        questionList[currentQuestion].isAnswered &&
        setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <Container
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection={"column"}
      maxWidth={"90vw"}
    >
      <Box w="100%">
        <Header
          showSearch={false}
          showNavlinks={false}
          showMenu={false}
          homeLink={"/simulation"}
          secondaryLink={{
            name: "Learn",
            link: "/",
          }}
        />
      </Box>

      <Box my="4" w="425px">
        <Link passHref href={`/${categoryLink}`}>
          <Flex
            color={"#fffc"}
            _hover={{ color: "#ffffff" }}
            w="100%"
            alignContent={"flex-start"}
            alignItems="left"
            cursor={"pointer"}
            textAlign="center"
          >
            <Icon fontSize={25} as={ArrowBackIcon} />
            <Text mx="2" fontSize="14px" fontWeight="md">
              Deep Dive into Web3
            </Text>
          </Flex>
        </Link>
      </Box>
      <Box
        mx="auto"
        w="425px"
        h="100%"
        borderRadius={"0.375rem"}
        border="1px solid rgb(49 51 66/1 )"
        p="8"
        color="#f2f2f2"
        bg="#005704"
        backgroundImage="url('data:image/png;base64,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')"
        onClick={handleNavigationClick}
        ref={ref}
      >
        {questionList.length === currentQuestion ? (
          <Box
            h="100%"
            display={"flex"}
            flexDirection={"column"}
            justifyContent="center"
            alignItems={"center"}
            p="2"
          >
            <Button onClick={() => checkScore()}>Check Score</Button>
            <Text>You Scored</Text>
            <CircularProgress
              value={(calculateScore() * 100) / questionList.length}
              size="100px"
              color="green.400"
              thickness="4px"
            >
              <CircularProgressLabel>
                {(calculateScore() * 100) / questionList.length}%
              </CircularProgressLabel>
            </CircularProgress>
            <Box my="5">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  retakeQuiz(questions);
                }}
              >
                Retake Quiz
              </Button>
            </Box>
          </Box>
        ) : (
          <Flex direction={"column"}>
            <Box py="6" my="3">
              <Progress
                value={(currentQuestion * 100) / questionList.length}
                size="xs"
                sx={{
                  "& > div": {
                    background:
                      "linear-gradient(90deg, #1A202C 10%, #010801 90%)",
                  },
                }}
              />
            </Box>

            <Box>
              <Text
                fontWeight={700}
                fontSize={"1.5rem"}
                fontFamily={"Nunito Sans,sans-serif"}
                textTransform={"uppercase"}
                color="#ffffff"
              >
                {currentQuestion + 1}.{questionList[currentQuestion].question}
              </Text>
            </Box>
            <Box pos={"relative"} zIndex={0}>
              <VStack my="8" gap="3">
                {questionList[currentQuestion].options.map((val, key) => {
                  return (
                    <Button
                      zIndex={500}
                      _hover={{ opacity: 0.8 }}
                      w="100%"
                      bg={`${
                        questionList[currentQuestion].selectedOption === key + 1
                          ? "#F4F5F7"
                          : "#040F03"
                      }`}
                      color={`${
                        questionList[currentQuestion].selectedOption ===
                          key + 1 && key != -1
                          ? "#12200a"
                          : "#ffffff"
                      }`}
                      // color={`${
                      //   questionList[currentQuestion].isAnswered &&
                      //   questionList[currentQuestion].answer === key + 1
                      //     ? "#12200a"
                      //     : key + 1 === selected
                      //     ? `${
                      //         questionList[currentQuestion].answer === key + 1
                      //           ? "#12200a"
                      //           : "#ffffff"
                      //       }`
                      //     : "#a3a4aa"
                      // }`}
                      py="6"
                      key={key}
                      textAlign="left"
                      fontWeight={400}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAnswerOptionClick(key + 1);
                      }}
                    >
                      {val}
                    </Button>
                  );
                })}
              </VStack>
              <Flex w="100%" justifyContent={"space-between"}>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    currentQuestion > 0 &&
                      setCurrentQuestion(currentQuestion - 1);
                  }}
                  icon={<VscArrowLeft />}
                  aria-label={""}
                />
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("next");
                    currentQuestion != questionList.length &&
                      setCurrentQuestion(currentQuestion + 1);
                  }}
                  icon={<VscArrowRight />}
                  aria-label={""}
                />
              </Flex>
            </Box>
          </Flex>
        )}
      </Box>
      <Box w="100%">
        <Footer />
      </Box>
    </Container>
  );
};

export default Quiz;
