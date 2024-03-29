import {
  Box,
  Button,
  Container,
  Flex,
  Highlight,
  IconButton,
  Progress,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import { introData, IQuestion, IQuestionsData } from "./data";
import { useRouter } from "next/router";
import ScoreCard from "./components/ScoreCard";
import IntroductionCard from "./components/IntroductionCard";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import ToolTip from "../common/ToolTip";
import useQuizStore from "./store";

export interface Props {
  categoryLink: string;
  questionsData: IQuestionsData;
}

const Quiz = ({ categoryLink, questionsData }: Props) => {
  const router = useRouter();
  const { category } = router.query;

  const [currentQuestion, setCurrentQuestion] = useState<number>(-1);
  const [questionList, setQuestionList] = useState(questionsData.questions);

  const { allQuiz, setScore, getCurrentScore } = useQuizStore();
  const currentScore = getCurrentScore(questionList[0].category, allQuiz);

  const isNonHoverDevice = useMediaQuery("(hover: none)");

  const getUnAnswerdQuestions = () => {
    return questionList.findIndex((question) => question.selectedOption === -1);
  };

  const jumpToUnanswered = () => {
    const unanswered = getUnAnswerdQuestions();
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
    setTimeout(() => {
      handleNextQuestion();
    }, 500);
  };

  const countAnweredQuestions = () => {
    return questionList.filter((question) => question.selectedOption !== -1)
      .length;
  };

  const handlePrevQuestion = () => {
    currentQuestion > -1 && setCurrentQuestion(currentQuestion - 1);
  };

  function retakeQuiz(questionList: Array<IQuestion>) {
    const updatedQuestions: Array<IQuestion> = questionList.map((question) => {
      return {
        ...question,
        isAnswered: false,
        selectedOption: -1,
      };
    });
    setQuestionList(updatedQuestions);
    setCurrentQuestion(-1);
    setScore(questionList[0].category, 0);
  }

  const getQuestionHoverStyle = (key: number) => {
    const selectedStyle = {
      opacity: 0.8,
      bg: "#70ffe9",
      color: "#1A1A1A",
      borderColor: "#70ffe9",
    };

    const defaultStyle = {
      opacity: 1,
      cursor: "default",
    };

    if (isNonHoverDevice[0] === true) {
      return defaultStyle;
    }

    if (questionList[currentQuestion].selectedOption !== key + 1) {
      return selectedStyle;
    } else {
      return defaultStyle;
    }
  };

  return (
    <Container
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection={"column"}
      maxWidth={"100vw"}
      p="0"
      bg="black"
    >
      <Box w="100%">
        <Header
          showSearch={false}
          showNavlinks={false}
          showMenu={false}
          secondaryLink={{
            name: "Learn",
            link: "/",
          }}
        />
      </Box>
      <Box mt={16} textAlign="center" px={4}>
        <Text
          my="3"
          fontFamily={"Druk Wide Bold"}
          fontWeight={"700"}
          fontSize={{ base: "3xl", md: "5xl" }}
          as="h1"
        >
          <Highlight
            query={"Quiz"}
            styles={{
              color: "#70FFE9",
              my: "3",
              fontFamily: "Druk Wide Bold",
              fontWeight: "700",
            }}
          >
            {`Flaq's Level ${questionList[0].groupId} Quiz`}
          </Highlight>
        </Text>
        <Text color="gray" fontFamily={"Poppins"}>
          {`Quiz yourself on all you learnt in the level: ${questionList[0].category}`}
        </Text>
      </Box>
      <Box w={["full", "625px"]} px={4}>
        <Box
          mx={"auto"}
          h="100%"
          borderRadius={"0.375rem"}
          boxShadow={"2px 2px 0px #70FFE9"}
          py={8}
          px={[12, 24]}
          color="#f2f2f2"
          bg="#1A1A1A"
          rounded={"xl"}
          mt={6}
          minH="80vh"
        >
          {questionList.length === currentQuestion || currentScore > 0 ? (
            <ScoreCard questionList={questionList} retakeQuiz={retakeQuiz} />
          ) : (
            <>
              <Flex direction={"column"}>
                {/* Navigation for questions */}
                <Flex justifyContent={"space-between"}>
                  <IconButton
                    onClick={(e) => {
                      handlePrevQuestion();
                    }}
                    icon={<HiOutlineArrowNarrowLeft />}
                    aria-label={""}
                    size="sm"
                  />
                  {currentQuestion != -1 && (
                    <Text color="#ffffff">
                      {currentQuestion + 1} / {questionList.length}
                    </Text>
                  )}
                  <IconButton
                    onClick={(e) => {
                      handleNextQuestion();
                    }}
                    icon={<HiOutlineArrowNarrowRight />}
                    aria-label={""}
                    size="sm"
                  />
                </Flex>
                <Box py="6" my="3">
                  <Progress
                    value={
                      (countAnweredQuestions() * 100) / questionList.length
                    }
                    size="xs"
                    bg={"#1B202A"}
                    sx={{
                      "& > div": {
                        backgroundColor: "#70FFE9",
                      },
                    }}
                  />
                </Box>
                {currentQuestion === -1 ? (
                  <IntroductionCard
                    content={`${
                      questionsData.introContent === undefined
                        ? introData.find((item) => item.id === category)
                            ?.content
                        : questionsData.introContent
                    }`}
                  />
                ) : (
                  <Box>
                    <Text
                      fontWeight={700}
                      fontSize={""}
                      fontFamily={"Druk Wide Bold"}
                      color="#ffffff"
                    >
                      {questionList[currentQuestion].question}
                    </Text>
                    <Box pos={"relative"} zIndex={0}>
                      <VStack my="6" gap="3">
                        {questionList[currentQuestion].options.map(
                          (val, key) => {
                            return (
                              <Button
                                zIndex={500}
                                _hover={getQuestionHoverStyle(key)}
                                w="100%"
                                bg={`${
                                  questionList[currentQuestion]
                                    .selectedOption ===
                                  key + 1
                                    ? "#F4F5F7"
                                    : "#1A1A1A"
                                }`}
                                color={`${
                                  questionList[currentQuestion]
                                    .selectedOption ===
                                    key + 1 && key != -1
                                    ? "#12200a"
                                    : "#ffffff"
                                }`}
                                border="1px"
                                borderColor={"white"}
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
                          }
                        )}
                      </VStack>
                    </Box>

                    <ToolTip
                      text="Read the Blog to find a solution to your question"
                      isDark={true}
                    >
                      <Text
                        color={"gray.500"}
                        textDecoration={"underline"}
                        cursor={"pointer"}
                        w="fit-content"
                      >
                        <a
                          href={questionList[currentQuestion].needHelp}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Need help?
                        </a>
                      </Text>
                    </ToolTip>
                  </Box>
                )}
              </Flex>
            </>
          )}
        </Box>
      </Box>
      <Container px="0" maxW="100vw">
        <Footer />
      </Container>
    </Container>
  );
};

export default Quiz;
