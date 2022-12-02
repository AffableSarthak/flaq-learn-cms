import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  Icon,
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

export interface IQuestion {
  question: string;
  options: Array<string>;
  answer: number;
  isAnswered?: boolean;
}
export interface Props {
  questions: Array<IQuestion>;
  categoryLink: string
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

const Quiz = ({ questions, categoryLink }: Props) => {
  const {
    questionList,
    setQuestionList,
    currentQuestion,
    setCurrentQuestion,
    retakeQuiz,
  } = useQuizStore();

  useEffect(() => {
    questionList.length === 0 && setQuestionList(questions);
  }, []);

  const ref = useRef(null);

  const toast = useToast();
  const [selected, setSelected] = useState(-1);
  const handleAnswerOptionClick = (key: number) => {
    setSelected(key);

    // check if the answer is correct
    if (questionList[currentQuestion].answer === key) {
      toast.closeAll();

      // updating if the question is answered or not
      const prevQuestionList = questionList;
      prevQuestionList[currentQuestion] = {
        ...prevQuestionList[currentQuestion],
        isAnswered: true,
      };
      setQuestionList(prevQuestionList);

      // show toast of correct answer
      toast({
        title: "Correct",
        status: "success",
        duration: 1000,
      });

      // wait for a seconds move to next question
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelected(-1);
      }, 1000);
    } else {
      toast.closeAll();

      const prevQuestionList = questionList;
      prevQuestionList[currentQuestion] = {
        ...prevQuestionList[currentQuestion],
        isAnswered: false,
      };
      setQuestionList(prevQuestionList);

      // show toast of wrong answer
      toast({
        title: "Incorrect try again...",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  // handle on click events on card and decide move to next or previous
  const handleNavigationClick = (e: any) => {
    if (isFirstHalf(e, ref.current)) {
      // if current question is not first question then move to previous question
      currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1);
    } else {
      // if current question is not last question and Answered Already then move to next question
      !(currentQuestion >= questionList.length) &&
        !questionList[currentQuestion].isAnswered &&
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
        bg="#0F111B"
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
            <Text>
              You have completed the quiz. You can now go back to the article.
            </Text>
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
                      "linear-gradient(90deg, #f19ec3 10%, #ea336f 90%)",
                  },
                }}
              />
            </Box>

            <Box>
              <Text
                fontWeight={700}
                fontSize={"1.5rem"}
                fontFamily={"Space Mono,sans-serif"}
                textTransform={"uppercase"}
                color="#ffffff"
              >
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
                      bg={`${
                        questionList[currentQuestion].isAnswered &&
                        questionList[currentQuestion].answer === key + 1
                          ? "rgb(95 158 59/1)"
                          : key + 1 === selected
                          ? `${
                              questionList[currentQuestion].answer === key + 1
                                ? "rgb(95 158 59/1)"
                                : "rgb(149 39 39/1)"
                            }`
                          : "rgb(20 22 36/1)"
                      }
                      
                        `}
                      color={`${
                        questionList[currentQuestion].isAnswered &&
                        questionList[currentQuestion].answer === key + 1
                          ? "#12200a"
                          : key + 1 === selected
                          ? `${
                              questionList[currentQuestion].answer === key + 1
                                ? "#12200a"
                                : "#ffffff"
                            }`
                          : "#a3a4aa"
                      }`}
                      py="6"
                      w="full"
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
