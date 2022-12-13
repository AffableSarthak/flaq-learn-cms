import { Box, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  content: string;
};

const IntroductionCard = ({ content }: Props) => {
  return (
    <Box py="6">
      <Text>{content}</Text>
    </Box>
  );
};

export default IntroductionCard;
