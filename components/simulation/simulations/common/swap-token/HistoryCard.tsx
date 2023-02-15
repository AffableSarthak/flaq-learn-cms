import {
  Avatar,
  AvatarGroup,
  Box,
  Flex,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import {
  SwapHistory,
  useSwapTokenStore,
} from "../../../store/solana/swapTokenStore";

export default function HistoryCard({
  swapHistory,
}: {
  swapHistory: SwapHistory;
}) {
  const { networkType, networkMetadata } = useSwapTokenStore();
  const { swapFromToken, tokenList } = networkMetadata;

  const tokenDeets = () => {
    const tokenDeets = tokenList.filter(
      (item) => item.name === swapHistory.tokName
    );
    return tokenDeets[0];
  };

  return (
    <HStack
      p={4}
      rounded="xl"
      border={"1px"}
      borderColor="#151515"
      bg="#101010"
      mb={2}
      justifyContent={"space-between"}
    >
      <HStack alignItems={"center"}>
        <AvatarGroup>
          <Avatar
            src={swapFromToken?.icon}
            name={swapFromToken?.name}
            size="sm"
            mb={3}
          />
          <Avatar
            src={tokenDeets().icon}
            name={tokenDeets().name}
            size="sm"
            mt={3}
          />
        </AvatarGroup>
        <Box>
          <Flex alignItems={"center"}>
            <Text fontWeight={"medium"} fontFamily="Poppins">
              {swapFromToken?.symbol}
            </Text>
            <Box mx={2}>
              <BsArrowRight />
            </Box>
            <Text fontWeight={"medium"} fontFamily="Poppins">
              {tokenDeets().symbol}
            </Text>
          </Flex>
          <Text color="#8A8A8A" fontFamily="Poppins" fontSize={"sm"}>
            Swap
          </Text>
        </Box>
      </HStack>
      <Stack alignItems={"end"}>
        {/* <Text fontFamily="Poppins">$34.03</Text>
        <Text fontSize={"xs"} color="#70DC94" fontFamily="Poppins">
          +4.02%
        </Text> */}
        <Text color="#9999A5" fontFamily="Poppins">
          {swapHistory.swapValue.toFixed(4)} {tokenDeets().symbol}
        </Text>
      </Stack>
    </HStack>
  );
}
