import {
  Box,
  HStack,
  Stack,
  Text,
  Input,
  FormControl,
  FormLabel,
  Button,
  Flex,
  FormHelperText,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { useTransactionStore } from "../../../store/solana/transactionStore";

export default function TransactionForm() {
  const {
    handleScreen,
    handleUserAddress,
    handleAmount,
    userAddress,
    amount,
    balance,
  } = useTransactionStore();

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
        // borderRadius={"2xl"}
      >
        <Box mr={2} cursor="pointer" onClick={() => handleScreen(0)}>
          <MdKeyboardBackspace fontSize={"24px"} />
        </Box>
        <HStack alignItems={"center"}>
          <Text fontWeight="semibold" fontFamily={"Poppins"}>
            Send SOL
          </Text>
        </HStack>
      </HStack>
      <Stack py={6} px={7}>
        <FormControl>
          <Box>
            <FormLabel
              fontWeight={"semibold"}
              color="#B5E8CC"
              fontFamily={"Poppins"}
            >
              Recipient address
            </FormLabel>
            <Input
              type="text"
              mt={4}
              value={userAddress}
              onChange={(e) => {
                handleUserAddress(e.target.value.trim());
              }}
            />
          </Box>
          {!validateAddress && userAddress.length > 0 ? (
            <Text fontSize={"xs"} mt={2} color="red.300">
              Please enter valid address
            </Text>
          ) : (
            <></>
          )}
          <Box mt={6}>
            <FormLabel
              fontWeight={"semibold"}
              color="#B5E8CC"
              fontFamily={"Poppins"}
            >
              Enter Amount
            </FormLabel>
            <Flex
              alignItems={"center"}
              border="1px"
              borderColor={"gray.800"}
              rounded={"lg"}
              p={1}
            >
              <Input
                type="number"
                min={0}
                max={20}
                border={0}
                outline="none"
                focusBorderColor={"#0C0C0C"}
                value={amount}
                onChange={(e) => {
                  handleAmount(parseFloat(e.target.value));
                }}
              />
              <HStack alignItems={"center"} mr={4}>
                <Text>SOL</Text>
                <Button size="xs" onClick={() => handleAmount(balance)}>
                  Max
                </Button>
              </HStack>
            </Flex>
          </Box>
          {!validateAmount && amount > 0 ? (
            <Text fontSize={"xs"} mt={2} color="red.300">
              Insufficient balance
            </Text>
          ) : (
            <></>
          )}
          {/* <Text
            fontWeight={"medium"}
            color="gray.600"
            fontFamily={"Poppins"}
            mt={4}
          >
            ~$232.90
          </Text> */}

          <Box mt="6">
            <Box mt={4}>
              <FormLabel
                fontWeight={"semibold"}
                color="#B5E8CC"
                fontFamily={"Poppins"}
              >
                Gas Fee
              </FormLabel>
              <Input type="text" mt={2} disabled value={gasFee} />
            </Box>

            <Box mt={4}>
              <FormLabel
                fontWeight={"semibold"}
                color="#B5E8CC"
                fontFamily={"Poppins"}
              >
                Total amount after Gas Fee
              </FormLabel>
              <Input
                type="text"
                mt={2}
                disabled
                value={totalAmount}
                // isInvalid={totalAmount > balance}
              />
              {totalAmount > balance ? (
                <FormHelperText>
                  <Text fontSize={"xs"} mt={2} color="red.300">
                    Insufficient balance
                  </Text>
                </FormHelperText>
              ) : (
                <></>
              )}
            </Box>
          </Box>
        </FormControl>
      </Stack>
      <Stack px={4} pb={14} h="full" justifyContent="flex-end">
        <Button
          w="full"
          py={4}
          bg="#97FCE9"
          color="black"
          _hover={{ bg: "#97FCE9" }}
          disabled={
            validateAddress === false ||
            validateAmount === false ||
            totalAmount > balance
          }
          onClick={() => {
            handleScreen(2);
          }}
        >
          Preview
        </Button>
      </Stack>
    </>
  );
}
