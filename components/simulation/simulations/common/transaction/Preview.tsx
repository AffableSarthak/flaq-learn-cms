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
} from "@chakra-ui/react";
import { MdKeyboardBackspace } from "react-icons/md";
import { useTransactionStore } from "../../../store/solana/transactionStore";

export default function Preview() {
  const {
    userAddress,
    handleScreen,
    handleBalance,
    handleTransaction,
    amount,
    logo,
    networkType,
    balance,
    transaction,
  } = useTransactionStore();
  const toast = useToast();
  const totalAmount = amount + (amount * 2) / 100;

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
        <HStack alignItems={"center"}>
          <Avatar size={"lg"} src={logo} name={networkType} />
          <Box ml={4}>
            <Text
              fontWeight={"medium"}
              fontFamily="Poppins"
              fontSize={"14px"}
              color="#B5E8CC"
            >
              value
            </Text>
            <Text fontWeight={"semibold"} fontFamily="Poppins">
              Sending {totalAmount} {networkType}
            </Text>
          </Box>
        </HStack>
        <FormControl>
          <Box mt={6}>
            <FormLabel
              fontWeight={"semibold"}
              color="#B5E8CC"
              fontFamily={"Poppins"}
            >
              From
            </FormLabel>
            <Input type="text" mt={4} disabled />
          </Box>
          <Box mt={4}>
            <FormLabel
              fontWeight={"semibold"}
              color="#B5E8CC"
              fontFamily={"Poppins"}
            >
              To
            </FormLabel>
            <Input type="text" mt={4} disabled value={userAddress} />
          </Box>
          <Box mt={4}>
            <FormLabel
              fontWeight={"semibold"}
              color="#B5E8CC"
              fontFamily={"Poppins"}
            >
              Gas Fee
            </FormLabel>
            <Input type="text" mt={4} disabled value={(amount * 2) / 100} />
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
          onClick={() => {
            handleBalance(parseFloat(totalAmount.toFixed(2)), balance);
            handleTransaction(totalAmount, transaction);
            handleScreen(0);
            toast({
              title: "Transaction successfull",
              status: "success",
              duration: 9000,
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
