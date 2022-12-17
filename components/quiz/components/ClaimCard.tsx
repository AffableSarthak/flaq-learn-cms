import { Box, Button, Flex, Input, Image, Text } from "@chakra-ui/react";
import React from "react";
import logo from "../../../public/img/logo.svg";
import useAllQuizStore from "../completionStore";
import { IQuestion } from "../data";
type Props = {
  questionList: Array<IQuestion>;
};

const ClaimCard = ({ questionList }: Props) => {
  const [formData, setFormData] = React.useState({
    email: "",
    name: "",
    groupId: questionList[0].groupId,
  });
  const { allQuiz, markCompleted, addQuiz, isClaimed } = useAllQuizStore();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
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
        return response.json();
      })
      .catch((err) => console.log(err));
    console.log(data);
  };

  return (
    <Box>
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
    </Box>
  );
};

export default ClaimCard;
