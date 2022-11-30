import { Box, Button, Container, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";

type Props = {};

const Quiz = (props: Props) => {
  return (
    <Container
      maxW="1200px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        mx="auto"
        w="425px"
        borderRadius={"0.375rem"}
        border="1px solid rgb(49 51 66/1 )"
        p="8"
        bg="#0F111B"
      >
        <Flex direction={"column"}>
          <Box></Box>
          {/* question */}
          <Box>
            <Text
              fontWeight={700}
              fontSize={"1.5rem"}
              fontFamily={"Space Mono,sans-serif"}
              textTransform={"uppercase"}
              color="#ffffff"
            >
              On which blockchain Swapped Finance is built upon
            </Text>
          </Box>
          {/* Options */}
          <VStack my="8" gap="3">
            {[1, 2, 3, 4].map((val, key) => {
              return (
                <Button
                  _hover={{ backgroundColor: "rgb(26 28 45/1)" }}
                  bg="rgb(20 22 36/1)"
                  py="6"
                  w="full"
                  key={key}
                >
                  Ethe {val}
                </Button>
              );
            })}
          </VStack>
        </Flex>
      </Box>
    </Container>
  );
};

export default Quiz;
