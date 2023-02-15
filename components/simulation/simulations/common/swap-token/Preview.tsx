import {
  Box,
  HStack,
  Stack,
  Text,
  Button,
  Avatar,
  useToast,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { FaLongArrowAltDown } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdKeyboardBackspace } from "react-icons/md";
import { useSwapTokenStore } from "../../../store/solana/swapTokenStore";

export default function Preview() {
  const {
    handleScreen,
    handleBalance,
    selectedSwapTo,
    networkMetadata,
    slippage,
    balance,
    setSwapFromVal,
    swapFromVal,
    isLoading,
    setSwapHistory,
    setFinalSwapVal,
    setIsLoading,
  } = useSwapTokenStore();

  const { swapFromToken } = networkMetadata;
  const networkFee = 0.2459;

  const toast = useToast();

  async function stall(stallTime = 3000) {
    await new Promise((resolve) => setTimeout(resolve, stallTime));
  }

  return (
    <>
      <HStack
        w="full"
        px={6}
        pb={6}
        pt={14}
        alignItems="center"
        borderBottom={"1px"}
        borderColor="gray.800"
      >
        <Box mr={2} cursor="pointer" onClick={() => handleScreen(1)}>
          <MdKeyboardBackspace fontSize={"24px"} />
        </Box>
        <HStack alignItems={"center"}>
          <Text fontWeight="semibold" fontFamily={"Poppins"}>
            Preview
          </Text>
        </HStack>
      </HStack>
      <Stack py={6} px={7}>
        <Box px={4} py={6} mb={6} rounded="xl" bg="#1A1A1A">
          <Text color={"#9999A5"} fontSize="sm" fontFamily={"Poppins"}>
            you pay
          </Text>
          <HStack alignItems={"center"} justifyContent="space-between" mt={2}>
            <HStack alignItems={"center"}>
              <Avatar
                src={swapFromToken?.icon}
                name={swapFromToken?.name}
                size="sm"
              />
              <Text fontWeight={"medium"} fontFamily="Poppins">
                {swapFromToken?.name}
              </Text>
            </HStack>
            <Text fontFamily="Poppins">{swapFromVal}</Text>
          </HStack>
          <Flex alignItems={"center"}>
            <Divider color={"black"} />
            <Box>
              <FaLongArrowAltDown fontSize={"24px"} color="#9999A5" />
            </Box>
            <Divider color={"black"} />
          </Flex>
          <Text color={"#9999A5"} fontSize="sm" fontFamily={"Poppins"}>
            you receieve
          </Text>
          <HStack alignItems={"center"} justifyContent="space-between" mt={2}>
            <HStack alignItems={"center"}>
              <Avatar
                src={selectedSwapTo.icon}
                name={selectedSwapTo.name}
                size="sm"
              />
              <Text fontWeight={"medium"} fontFamily="Poppins">
                {selectedSwapTo.symbol}
              </Text>
            </HStack>
            <Text fontFamily="Poppins">
              {isNaN(swapFromVal * selectedSwapTo.multiplier)
                ? 0
                : (swapFromVal * selectedSwapTo.multiplier).toFixed(2)}
            </Text>
          </HStack>
        </Box>
        <Box rounded="xl" bg="#1A1A1A">
          <HStack
            justifyContent={"space-between"}
            alignItems={"center"}
            px={4}
            py={6}
          >
            <HStack alignItems={"center"}>
              <Text fontWeight={500} color={"#9999A5"} fontFamily={"Poppins"}>
                network fee
              </Text>
              <IoIosInformationCircleOutline color="#9999A5" />
            </HStack>
            <Text fontWeight={600} color="#83E0B8" fontFamily={"Poppins"}>
              {networkFee}
            </Text>
          </HStack>
          <Divider />
          <HStack
            justifyContent={"space-between"}
            alignItems={"center"}
            px={4}
            py={6}
          >
            <HStack alignItems={"center"}>
              <Text fontWeight={500} color={"#9999A5"} fontFamily={"Poppins"}>
                slippage
              </Text>
              <IoIosInformationCircleOutline color="#9999A5" />
            </HStack>
            <Text fontWeight={600} color="#9999A5" fontFamily={"Poppins"}>
              {slippage}
            </Text>
          </HStack>
        </Box>
      </Stack>
      <Stack px={4} pb={14} h="full" justifyContent="flex-end">
        <Button
          w="full"
          py={4}
          bg="#97FCE9"
          color="black"
          _hover={{ bg: "#97FCE9" }}
          isLoading={isLoading}
          loadingText="Confirming your transaction..."
          onClick={async () => {
            setIsLoading();
            await stall(5000);
            setIsLoading();
            handleBalance(balance - (swapFromVal + networkFee));
            const swapValTo = swapFromVal * selectedSwapTo.multiplier;
            const final = swapValTo - 0.01 * swapValTo;
            setFinalSwapVal(final);
            setSwapHistory({
              tokName: selectedSwapTo.name,
              swapValue: final,
            });
            setSwapFromVal(0);
            handleScreen(0);
            toast({
              title: "swap successful",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          }}
        >
          Confirm swap
        </Button>
      </Stack>
    </>
  );
}
