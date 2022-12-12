import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
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
import { IQuestionsData } from "./data";
import { useRouter } from "next/router";
import ScoreCard from "./components/ScoreCard";
import IntroductionCard from "./components/IntroductionCard";

export interface IQuestion {
  question: string;
  options: Array<string>;
  answer?: number;
  isAnswered?: boolean;
  selectedOption: number;
}
export interface Props {
  categoryLink: string;
  questionsData: IQuestionsData;
}

const Quiz = ({ categoryLink, questionsData }: Props) => {
  const router = useRouter();
  const { category } = router.query;

  const {
    questionList,
    setQuestionList,
    currentQuestion,
    setCurrentQuestion,
    retakeQuiz,
    progress,
  } = useQuizStore();

  useEffect(() => {
    questionList.length === 0 &&
      setQuestionList(questionsData.questions, currentQuestion);
  }, []);

  const getUnAnswerdQuestions = () => {
    return questionList.findIndex((question) => question.selectedOption === -1);
  };
  // jump to unanswered question
  const jumpToUnanswered = () => {
    const unanswered = getUnAnswerdQuestions();
    console.log(unanswered);
    unanswered != -1 && setCurrentQuestion(unanswered);
    unanswered === -1 && setCurrentQuestion(questionList.length);
  };

  // handle next question and jump to unanswered question
  const handleNextQuestion = () => {
    if (getUnAnswerdQuestions() === -1) {
      setCurrentQuestion(questionList.length);
      return;
    }
    currentQuestion != questionList.length - 1 &&
      setCurrentQuestion(currentQuestion + 1);
    currentQuestion === questionList.length - 1 && jumpToUnanswered();
  };

  // handle answer option click and jump to next question
  const handleAnswerOptionClick = (key: number) => {
    const prevQuestionList = questionList;
    prevQuestionList[currentQuestion] = {
      ...prevQuestionList[currentQuestion],
      selectedOption: key,
    };
    setQuestionList(prevQuestionList, currentQuestion);
    setTimeout(() => {
      handleNextQuestion();
    }, 500);
  };

  const handlePrevQuestion = () => {
    currentQuestion > -1 && setCurrentQuestion(currentQuestion - 1);
  };

  const countAnweredQuestions = () => {
    return questionList.filter((question) => question.selectedOption !== -1)
      .length;
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
      >
        {questionList.length === currentQuestion ? (
          <ScoreCard
            questionList={questionList}
            retakeQuiz={retakeQuiz}
            categoryLink={categoryLink}
          />
        ) : (
          <>
            <Flex direction={"column"}>
              <Box py="6" my="3">
                <Progress
                  value={(countAnweredQuestions() * 100) / questionList.length}
                  size="xs"
                  sx={{
                    "& > div": {
                      background:
                        "linear-gradient(90deg, #1A202C 10%, #010801 90%)",
                    },
                  }}
                />
              </Box>
              {currentQuestion === -1 ? (
                <IntroductionCard content={questionsData.introContent} />
              ) : (
                <Box>
                  <Box>
                    <Text
                      fontWeight={700}
                      fontSize={"1.5rem"}
                      fontFamily={"Nunito Sans,sans-serif"}
                      textTransform={"uppercase"}
                      color="#ffffff"
                    >
                      {currentQuestion + 1}.
                      {questionList[currentQuestion].question}
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
                              questionList[currentQuestion].selectedOption ===
                              key + 1
                                ? "#F4F5F7"
                                : "#040F03"
                            }`}
                            color={`${
                              questionList[currentQuestion].selectedOption ===
                                key + 1 && key != -1
                                ? "#12200a"
                                : "#ffffff"
                            }`}
                            py="6"
                            key={key}
                            textAlign="left"
                            fontWeight={400}
                            onClick={(e) => {
                              handleAnswerOptionClick(key + 1);
                            }}
                          >
                            {val}
                          </Button>
                        );
                      })}
                    </VStack>
                  </Box>
                </Box>
              )}

              {/* Navigation for questions */}
              <Flex w="100%" justifyContent={"space-between"}>
                <IconButton
                  onClick={(e) => {
                    handlePrevQuestion();
                  }}
                  icon={<VscArrowLeft />}
                  aria-label={""}
                />
                <IconButton
                  onClick={(e) => {
                    handleNextQuestion();
                  }}
                  icon={<VscArrowRight />}
                  aria-label={""}
                />
              </Flex>
            </Flex>
          </>
        )}
      </Box>
      <Box w="100%">
        <Footer />
      </Box>
    </Container>
  );
};

export default Quiz;
