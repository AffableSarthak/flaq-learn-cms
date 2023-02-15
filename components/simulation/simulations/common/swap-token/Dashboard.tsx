import React from "react";
import { Box, Center, HStack, Stack, Text } from "@chakra-ui/react";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineSwapVert } from "react-icons/md";
import HistoryCard from "./HistoryCard";
import { useSwapTokenStore } from "../../../store/solana/swapTokenStore";

export default function Dashboard({ onClose }: { onClose: () => void }) {
  const { handleScreen, balance, resetState, swapHistory, networkMetadata } =
    useSwapTokenStore();

  const { swapFromToken, sampleAddress } = networkMetadata;

  return (
    <>
      <Stack
        alignItems={"center"}
        w="full"
        background="linear-gradient(229.14deg, #3381F5 -2.89%, #2AD0B2 84.74%)"
        boxShadow="0px 4px 24px rgba(172, 234, 254, 0.4)"
        pb={5}
        borderRadius="2xl"
      >
        <HStack
          w="full"
          py={5}
          px={4}
          alignItems="center"
          justifyContent={"space-between"}
          borderBottom={"1px"}
          borderColor="#A4D067"
        >
          <HStack alignItems={"center"}>
            <Text fontWeight="semibold" fontFamily={"Poppins"} color="black">
              My Wallet
            </Text>
            <Box w={1} h={1} bg="#858585" mx={2}></Box>
            <Text fontWeight="semibold" fontFamily={"Poppins"} color="black">
              {sampleAddress.slice(0, 5)}...
              {sampleAddress.slice(
                sampleAddress.length - 5,
                sampleAddress.length
              )}
            </Text>
          </HStack>
          <Box
            cursor={"pointer"}
            onClick={() => {
              onClose();
              resetState();
            }}
          >
            <IoCloseOutline fontSize={"24px"} color="black" />
          </Box>
        </HStack>
        <Stack px={[16, 24]} py={9}>
          <Stack alignItems={"center"} color="black">
            <Text fontWeight={"medium"}>
              BALANCE IN {swapFromToken?.symbol}
            </Text>
            <Text
              fontWeight={"medium"}
              mt={2}
              fontSize={"36px"}
              lineHeight={"42px"}
            >
              {balance.toFixed(2)}
              {/* {swapFromToken?.symbol} */}
            </Text>
            {/* <Box mt={2} px={2} py={1} bg="white" rounded={"lg"}>
              ☝️
              <Text fontWeight={"medium"} color="black" as="span" ml={0.5}>
                $242.54
              </Text>
              <Text fontWeight={"medium"} color="black" as="span" ml={1}>
                (2.93%)
              </Text>
            </Box> */}
          </Stack>
        </Stack>
        <Stack
          cursor={"pointer"}
          alignItems={"center"}
          py={5}
          px={10}
          bg="gray.800"
          border={"2px"}
          borderColor="black"
          rounded={"lg"}
          onClick={() => handleScreen(1)}
        >
          <MdOutlineSwapVert fontSize={"24px"} />
          <Text fontWeight={"medium"} fontSize="xs" mt={2}>
            SWAP
          </Text>
        </Stack>
      </Stack>
      <Text px={4} pt={6} fontWeight={"semibold"} mb={3}>
        History
      </Text>
      <Box px={4} overflowY="auto">
        {swapHistory.length > 0 ? (
          swapHistory.map((item, index) => (
            <HistoryCard key={index} swapHistory={item} />
          ))
        ) : (
          <Center h="full" p="4">
            <Text color="gray.600" fontWeight={"semibold"}>
              No Swap History
            </Text>
          </Center>
        )}
      </Box>
    </>
  );
}
