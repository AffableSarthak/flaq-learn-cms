import { Box, Button, Flex, Input, Image, Text } from "@chakra-ui/react";
import React from "react";
import logo from "../../../public/img/logo.svg";
type Props = {};

const ClaimCard = (props: Props) => {
  const [email, setEmail] = React.useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email);
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              required
              my="6"
              type="email"
            />
            <Button type="submit" w="full">
              Claim
            </Button>
          </Flex>
        </Flex>
      </form>
    </Box>
  );
};

export default ClaimCard;
