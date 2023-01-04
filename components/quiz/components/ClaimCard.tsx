import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  useToast,
  Center,
} from "@chakra-ui/react";
import React from "react";
import useQuizStore from "../store";
import { IQuestion } from "../data";
type Props = {
  questionList: Array<IQuestion>;
};

const ClaimCard = ({ questionList }: Props) => {
  const [formData, setFormData] = React.useState({
    email: "",
    name: "",
    groupId: `${questionList[0].groupId}`,
  });
  const toast = useToast();
  const { allQuiz, markCompleted, addQuiz, isClaimed, markClaimed } =
    useQuizStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await fetch(
      "https://mailer-three.vercel.app/api/submit-quiz",
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => {
        markCompleted(questionList[0].category);
        markClaimed(questionList[0].category);
        toast({
          title: "NFT Claimed",
          description: "Check your email for the NFT",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        return response.json();
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "Try again later",
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
      });
  };

  return (
    <Box>
      {!isClaimed(questionList[0].category, allQuiz) ? (
        <form onSubmit={(e) => handleSubmit(e)}>
          <Flex direction={"column"}>
            <Text fontSize={"lg"}>Enter your email</Text>
            <Text my="5" fontSize={"sm"}>
              We’ll send you a link you can use to redeem your badge when you’re
              ready.
            </Text>
            <Flex
              direction={"column"}
              justifyContent={"center"}
              alignContent="center"
              alignItems={"center"}
            >
              <Input
                value={formData.email}
                onChange={(e) =>
                  setFormData((data) => {
                    return {
                      ...data,
                      email: e.target.value,
                    };
                  })
                }
                placeholder="email"
                required
                my="3"
                type="email"
              />
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData((data) => {
                    return {
                      ...data,
                      name: e.target.value,
                    };
                  })
                }
                placeholder="name"
                required
                my="3"
                type="text"
              />
              <Button mt="3" type="submit" w="full">
                Claim
              </Button>
            </Flex>
          </Flex>
        </form>
      ) : (
        <Center>
          <Box
            h="100%"
            display={"flex"}
            flexDirection={"column"}
            justifyContent="center"
            alignItems={"center"}
            p="2"
          >
            <Text
              fontWeight={"700"}
              fontFamily={"Druk Wide Bold"}
              fontSize={["xl", "3xl"]}
              mb={4}
            >
              NFT claimed!
            </Text>

            <Text textAlign={"center"} mb={10}>
              <a
                href="https://learn.flaq.club/"
                target="_blank"
                rel="noreferrer"
              >
                <Text as="samp" color={"#6fffe9"} className="notion-link">
                  Let's learn the next level now!
                </Text>
              </a>
            </Text>
          </Box>
        </Center>
      )}
    </Box>
  );
};

export default ClaimCard;
