import {
  Box,
  HStack,
  Stack,
  Text,
  Input,
  FormControl,
  FormLabel,
  Button,
  Avatar,
  useToast,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { FaLongArrowAltDown } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import {
  MdKeyboardBackspace,
  MdOutlineKeyboardArrowRight,
  MdOutlineSwapVert,
} from "react-icons/md";
import { useSwapStore } from "../../../store/solana/swapTokenStore";

export default function Preview() {
  const {
    handleScreen,
    handleBalance,
    handleTransaction,
    amount,
    logo,
    networkType,
    balance,
    transaction,
    handleAmount,
    isLoading,
    setIsLoading,
  } = useSwapStore();

  const toast = useToast();
  const gasFee = (amount * 0.009) / 100;
  const totalAmount = amount + gasFee;

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
              <Avatar src={logo} name={networkType} size="sm" />
              <Text fontWeight={"medium"} fontFamily="Poppins">
                {networkType}
              </Text>
            </HStack>
            <Text fontFamily="Poppins">20.5</Text>
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
              <Avatar src={logo} name={networkType} size="sm" />
              <Text fontWeight={"medium"} fontFamily="Poppins">
                USDC
              </Text>
            </HStack>
            <Text fontFamily="Poppins">11393.31</Text>
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
              $0.000173
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
              1%
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
          isDisabled={totalAmount > balance || isLoading}
          onClick={async () => {
            setIsLoading();
            await stall(5000);
            setIsLoading();
            handleBalance(parseFloat(totalAmount.toFixed(2)), balance);
            handleTransaction(totalAmount, transaction);
            handleAmount(0);
            // handleUserAddress("");
            handleScreen(0);
            toast({
              title: "Transaction successful",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          }}
        >
          Send
        </Button>
      </Stack>
    </>
  );
}
