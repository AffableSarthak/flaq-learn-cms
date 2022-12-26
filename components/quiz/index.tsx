import {
  Box,
  Button,
  Container,
  Flex,
  Highlight,
  IconButton,
  Progress,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect } from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
import useQuizStore from "./store";
import { introData, IQuestionsData } from "./data";
import { useRouter } from "next/router";
import ScoreCard from "./components/ScoreCard";
import IntroductionCard from "./components/IntroductionCard";
import { category_utils } from "../blog/utils/blogUtils";
import categoryInfo from "../blog/data/categoryInfo";
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/hi'
import ToolTip from "../common/ToolTip";

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

  const categoryTitle = category_utils(questionList[0].category).split(" ");

  const desc = categoryInfo.find(
    (a) => a.name.toLowerCase() === categoryTitle.join(" ").toLowerCase()
  );

  return (
    <Container
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection={"column"}
      maxWidth={"100vw"}
      p="0"
      bg='black'
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
      <Box mt={16} textAlign='center' px={4}>
        <Text
          my="3"
          fontFamily={"Druk Wide Bold"}
          fontWeight={"700"}
          fontSize={{ base: "3xl", md: "5xl" }}
          as="h1"
        >
          <Highlight
            query={categoryTitle[categoryTitle.length - 1]}
            styles={{
              color: "#70FFE9",
              my: "3",
              fontFamily: "Druk Wide Bold",
              fontWeight: "700",
            }}
          >
            {categoryTitle.join(" ")}
          </Highlight>
        </Text>
        <Text color='gray' fontFamily={'Poppins'}>
          {desc?.desc}
        </Text>
      </Box>
      <Box
        w={["full", "625px"]}
        px={4}
      >
        {/* <Box my="4">
          <Link passHref href={`/${categoryLink}`}>
            <Flex
              color={"#fffc"}
              _hover={{ color: "#ffffff" }}
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
        </Box> */}
        <Box
          mx={'auto'}
          h="100%"
          borderRadius={"0.375rem"}
          boxShadow={'2px 2px 0px #70FFE9'}
          py={8}
          px={[12, 24]}
          color="#f2f2f2"
          bg="#1A1A1A"
          rounded={'xl'}
          mt={6}
          minH='80vh'
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
                {/* Navigation for questions */}
                <Flex justifyContent={"space-between"}>
                  <IconButton
                    onClick={(e) => {
                      handlePrevQuestion();
                    }}
                    icon={<HiOutlineArrowNarrowLeft />}
                    aria-label={""}
                    size='sm'
                  />
                  <IconButton
                    onClick={(e) => {
                      handleNextQuestion();
                    }}
                    icon={<HiOutlineArrowNarrowRight />}
                    aria-label={""}
                    size='sm'
                  />
                </Flex>
                <Box py="6" my="3">
                  <Progress
                    value={(countAnweredQuestions() * 100) / questionList.length}
                    size="xs"
                    bg={'#1B202A'}
                    sx={{
                      "& > div": {
                        backgroundColor: '#70FFE9'
                      },
                    }}
                  />
                </Box>
                {currentQuestion === -1 ? (
                  <IntroductionCard
                    content={`${questionsData.introContent === undefined
                      ? introData.find((item) => item.id === category)?.content
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
                        {questionList[currentQuestion].options.map((val, key) => {
                          return (
                            <Button
                              zIndex={500}
                              _hover={{ opacity: 0.8 }}
                              w="100%"
                              bg={`${questionList[currentQuestion].selectedOption ===
                                key + 1
                                ? "#F4F5F7"
                                : "#1A1A1A"
                                }`}
                              color={`${questionList[currentQuestion].selectedOption ===
                                key + 1 && key != -1
                                ? "#12200a"
                                : "#ffffff"
                                }`}
                              border='1px'
                              borderColor={'white'}
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
                    <Link passHref href={(questionsData as any)[currentQuestion].needHelp}>
                      <ToolTip text='Read the Blog to find a solution to your question' isDark={true}>
                        <Text color={'gray.500'} textDecoration={'underline'} cursor={'pointer'} w='fit-content'>
                          Need help?
                        </Text>
                      </ToolTip>
                    </Link>
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
    </Container >
  );
};

export default Quiz;
