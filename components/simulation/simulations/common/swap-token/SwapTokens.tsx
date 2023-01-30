import {
  Box,
  HStack,
  Stack,
  Text,
  Button,
  Flex,
  Avatar,
  Divider,
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  MdKeyboardBackspace,
  MdOutlineKeyboardArrowRight,
  MdOutlineSwapVert,
} from "react-icons/md";
import { GrCircleInformation } from "react-icons/gr";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useSwapStore } from "../../../store/solana/swapTokenStore";

export default function TransactionForm() {
  const {
    handleScreen,
    handleUserAddress,
    handleAmount,
    userAddress,
    amount,
    balance,
    logo,
    networkType,
  } = useSwapStore();

  const slippages: number[] = [0.1, 0.5, 1.5];

  const [validateAddress, setValidateAddress] = useState<boolean>(false);
  const [validateAmount, setValidateAmount] = useState<boolean>(false);

  const gasFee = (amount * 0.009) / 100;
  const totalAmount = amount + gasFee;

  const validateWalletAddress = () => {
    // Do nothing if there's no public key.
    if (userAddress.length === 0) {
      return;
    }

    const Regxp = /\b[a-zA-Z0-9]{44}\b/;
    if (Regxp.test(userAddress) === true) {
      setValidateAddress(true);
    } else {
      setValidateAddress(false);
    }
  };

  const validateEnteredAmount = () => {
    if (amount <= balance && amount > 0) {
      setValidateAmount(true);
    } else {
      setValidateAmount(false);
    }
  };

  useEffect(() => {
    validateWalletAddress();
  }, [userAddress]);

  useEffect(() => {
    validateEnteredAmount();
  }, [amount]);

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
        <Box mr={2} cursor="pointer" onClick={() => handleScreen(0)}>
          <MdKeyboardBackspace fontSize={"24px"} />
        </Box>
        <HStack alignItems={"center"}>
          <Text fontWeight="semibold" fontFamily={"Poppins"}>
            Swap Tokens
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
              <Box ml={6}>
                <MdOutlineKeyboardArrowRight />
              </Box>
            </HStack>
            <Text fontFamily="Poppins">20.5</Text>
          </HStack>
          <Flex alignItems={"center"}>
            <Divider />
            <Box
              bg="#232323"
              rounded={"full"}
              border="1px"
              borderColor={"black"}
              w="fit-content"
              p={2}
            >
              <MdOutlineSwapVert fontSize={"24px"} color="#97FCE9" />
            </Box>
            <Divider />
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
              <Box ml={6}>
                <MdOutlineKeyboardArrowRight />
              </Box>
            </HStack>
            <Text fontFamily="Poppins">11393.31</Text>
          </HStack>
        </Box>
        <Box>
          <HStack gap={2}>
            <Text color="#9999A5" fontFamily={"Poppins"} fontWeight={500}>
              slippage tolerance
            </Text>
            <IoIosInformationCircleOutline color="#9999A5" />
          </HStack>
          <HStack mt={4}>
            <Tabs variant="soft-rounded">
              <TabList gap={2}>
                {slippages.map((slippage, index) => (
                  <Tab
                    key={index}
                    bg="#1A1A1A"
                    color={"white"}
                    _focus={{ bg: "white", color: "black" }}
                    py={2}
                    px={4}
                    fontWeight={400}
                  >
                    {slippage}%
                  </Tab>
                ))}
              </TabList>
            </Tabs>
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
          // disabled={
          //   validateAddress === false ||
          //   validateAmount === false ||
          //   totalAmount > balance
          // }
          onClick={() => {
            handleScreen(2);
          }}
        >
          Preview Swap
        </Button>
      </Stack>
    </>
  );
}
