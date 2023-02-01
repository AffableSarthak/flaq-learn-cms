import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  useToast,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl,
  FormHelperText,
  HStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useQuizStore from "../store";
import { IQuestion } from "../data";
import { useRouter } from "next/router";

type Props = {
  questionList: Array<IQuestion>;
};

const ClaimCard = ({ questionList }: Props) => {
  const [formData, setFormData] = React.useState({
    email: "",
    name: "",
    should_send_email: "false",
    quiz_id: `${questionList[0].groupId}`,
  });
  const toast = useToast();
  const [quiz_claim_id, setQuizClaimId] = useState("");
  const [is_nft_claim_mail_sent, setIssNftClaimMailSent] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { allQuiz, markCompleted, addQuiz, isClaimed, markClaimed } =
    useQuizStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const body = {
      ...formData,
      should_send_email: formData.should_send_email === "true" ? true : false,
    };

    const quizSubmitRes = await fetch("https://apix.flaq.club/quiz/submit", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        markCompleted(questionList[0].category);
        markClaimed(questionList[0].category);
        return response.json();
      })
      .catch((err) => {
        console.log({ err });
        toast({
          title: "Error",
          description: "Try again later",
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
      });

    console.log({ quizSubmitRes });

    if (quizSubmitRes.status_code === 500) {
      toast({
        title: `${quizSubmitRes.message}`,
        description: `NFT already claimed with ${formData.email}`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setFormData({
        email: "",
        name: "",
        should_send_email: "false",
        quiz_id: `${questionList[0].groupId}`,
      });
      setIsLoading(false);
      return;
    } else if (quizSubmitRes.status_code === 200) {
      if (
        quizSubmitRes.data.is_nft_claim_mail_sent === false ||
        quizSubmitRes.data.is_nft_claim_mail_sent === undefined
      ) {
        router.push(`/claim-nft/${quizSubmitRes.data.claim_id}`);
      }

      setQuizClaimId(quizSubmitRes.data.claim_id);
      setIssNftClaimMailSent(quizSubmitRes.data.is_nft_claim_mail_sent);
    }

    setFormData({
      email: "",
      name: "",
      should_send_email: "false",
      quiz_id: `${questionList[0].groupId}`,
    });
    setIsLoading(false);
  };

  const renderClaimLater = () => {
    if (quiz_claim_id.length === 0) {
      return <></>;
    }

    if (
      is_nft_claim_mail_sent === false ||
      is_nft_claim_mail_sent === undefined
    ) {
      return <></>;
    }

    return (
      <Box
        h="100%"
        display={"flex"}
        flexDirection={"column"}
        justifyContent="center"
        alignItems={"center"}
        p="2"
      >
        <Text fontSize={["lg", "xl"]} mb={4}>
          We have sent a link you can use to redeem your Flaq insignia when
          you’re ready.
        </Text>

        <Text textAlign={"center"} mb={10}>
          <a href="https://learn.flaq.club/" target="_blank" rel="noreferrer">
            <Text as="samp" color={"#6fffe9"} className="notion-link">
              {`Let's learn the next level now!`}
            </Text>
          </a>
        </Text>
      </Box>
    );
  };

  return (
    <Box>
      {quiz_claim_id.length === 0 ? (
        <form onSubmit={(e) => handleSubmit(e)}>
          <Flex direction={"column"}>
            <Text
              fontSize={{ base: "1rem", md: "1.4rem", lg: "1.6rem" }}
              textAlign={"center"}
              color={"#B5E8CC"}
              fontWeight="semibold"
              mb="8 "
            >
              CLAIM YOUR FLAQ INSIGNIA
            </Text>
            <Flex
              direction={"column"}
              justifyContent={"center"}
              alignContent="center"
              alignItems={"center"}
            >
              <FormControl isRequired my="3">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
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
                />
                <FormHelperText>{`We'll never share your email.`}</FormHelperText>
              </FormControl>
              <FormControl isRequired my="3">
                <FormLabel>Name</FormLabel>
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
                  type="text"
                />
              </FormControl>
              <FormControl as="fieldset" isRequired my="3">
                <FormLabel as="legend">Claim NFT</FormLabel>
                <RadioGroup
                  defaultValue="false"
                  onChange={(value) =>
                    setFormData((data) => {
                      return {
                        ...data,
                        should_send_email: value,
                      };
                    })
                  }
                  value={formData.should_send_email}
                >
                  <HStack spacing="24px">
                    <Radio value="false">Now</Radio>
                    <Radio value="true">Later</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
              <Button
                mt="6"
                type="submit"
                w="full"
                isLoading={isLoading}
                loadingText="Generating NFT! 🤖"
              >
                Claim
              </Button>
            </Flex>
          </Flex>
        </form>
      ) : (
        <></>
      )}

      {renderClaimLater()}
    </Box>
  );
};

export default ClaimCard;
