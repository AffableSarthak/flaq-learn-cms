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
import React, { useEffect, useRef, useState } from "react";

export interface IQuestion {
  question: string;
  options: Array<string>;
  answer: number;
  isAnswered?: boolean;
}
export interface Props {
  questions: Array<IQuestion>;
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

const Quiz = ({ questions }: Props) => {
  const [questionList, setQuestionList] = useState<Array<IQuestion>>(questions);

  const ref = useRef(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);

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
      currentQuestion != questionList.length &&
        questionList[currentQuestion].isAnswered &&
        setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <Container
      maxW="1200px"
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection={"column"}
    >
      <Box my="4" w="425px">
        <Flex
          color={"#fffc"}
          _hover={{ color: "#ffffff" }}
          w="100%"
          alignContent={"flex-start"}
          alignItems="left"
          cursor={"pointer"}
        >
          <Icon fontSize={25} as={ArrowBackIcon} />
          <Text mx="2" fontSize="14px" fontWeight="md">
            Deep Dive into Web3
          </Text>
        </Flex>
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
            justifyContent="center"
            alignItems={"center"}
          >
            <Text>
              You have completed the quiz. You can now go back to the article.
            </Text>
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
    </Container>
  );
};

export default Quiz;
