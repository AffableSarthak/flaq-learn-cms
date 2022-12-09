import { Box, Button, Flex, Input, Image, Text } from "@chakra-ui/react";
import React from "react";
import logo from "../../../public/img/logo.svg";
type Props = {};

const ClaimCard = (props: Props) => {
  return (
    <Box>
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
          <Image w="250px" h="250px" my="6" src={logo.src} alt="claim-nft" />
          <Input placeholder="email" my="6" type="email" />
          <Button w="full">Claim</Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ClaimCard;
