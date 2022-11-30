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
import React from "react";

export interface IQuestion {
  questionText: string;
  answerOptions: Array<{
    answerText: string;
    isCorrect: boolean;
  }>;
}
export interface Props {
  questions: Array<IQuestion>;
}

const Quiz = ({ questions }: Props) => {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);

  const toast = useToast();
  const [selected, setSelected] = React.useState(-1);
  const handleAnswerOptionClick = (isCorrect: boolean, key: number) => {
    setSelected(key);
    if (isCorrect) {
      toast.closeAll();
      toast({
        title: "Correct",
        status: "success",
        duration: 1000,
      });
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelected(-1);
      }, 1000);
    } else {
      toast.closeAll();
      toast({
        title: "Incorrect try again...",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
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
      >
        {questions.length === currentQuestion ? (
          <>
            <Text>
              You have completed the quiz. You can now go back to the article.
            </Text>
          </>
        ) : (
          <Flex direction={"column"}>
            <Box py="6" my="3">
              <Progress
                value={(currentQuestion * 100) / questions.length}
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
                {questions[currentQuestion].questionText}
              </Text>
            </Box>
            <Box
              pos={"relative"}
              zIndex={0}
              onClick={() => console.log("bg clciked")}
            >
              <VStack my="8" gap="3">
                {questions[currentQuestion].answerOptions.map((val, key) => {
                  return (
                    <Button
                      zIndex={500}
                      _hover={{ opacity: 0.8 }}
                      bg={`${
                        key === selected
                          ? `${
                              val.isCorrect
                                ? "rgb(95 158 59/1)"
                                : "rgb(149 39 39/1)"
                            }`
                          : "rgb(20 22 36/1)"
                      }`}
                      color={`${
                        key === selected
                          ? `${val.isCorrect ? "#12200a" : "#ffffff"}`
                          : "#a3a4aa"
                      }`}
                      py="6"
                      w="full"
                      key={key}
                      textAlign="left"
                      fontWeight={400}
                      onClick={() =>
                        handleAnswerOptionClick(val.isCorrect, key)
                      }
                    >
                      {val.answerText}
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
