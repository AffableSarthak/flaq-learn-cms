import Dashboard from "./Dashboard";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
  Stack,
  Center,
  Box,
  useToast,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import TransactionForm from "./SwapTokens";
import Preview from "./Preview";
import { useSwapTokenStore } from "../../../store/solana/swapTokenStore";
import { NetworkType } from "../../../store/solana/transactionStore";

export default function SwapTokens({ network }: { network: NetworkType }) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentScreen, resetState, handleNetworkType, networkType } =
    useSwapTokenStore();

  useEffect(() => {
    handleNetworkType(network);
  }, []);

  return (
    <>
      <Flex direction="column" gap={"4"}>
        {/* <Box>
          <Center>
            <Text
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              fontWeight={"400"}
              color="#F2FFEA"
              mb="2"
            >
              {`Sample receiver public address`}
            </Text>
          </Center>
          <Center>
            <Code
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              fontWeight={"400"}
              maxW={{ base: "80%", lg: "100%" }}
              colorScheme="green"
              _hover={{ cursor: "pointer" }}
              onClick={() => {
                navigator.clipboard.writeText(
                  "DqnRv6uwbUEQwuzfhemqSrmLmAGg7JV83Eb5QbMLNw1J"
                );
                toast({
                  title: `Copied to clipboard`,
                  status: "success",
                  isClosable: true,
                  position: "top-right",
                });
              }}
            >
              DqnRv6uwbUEQwuzfhemqSrmLmAGg7JV83Eb5QbMLNw1J <CopyIcon />
            </Code>
          </Center>
        </Box> */}
        <Center>
          <Box>
            <Button variant={"primarybtn"} onClick={onOpen}>
              {`Let's swap your first token! 🪙`}
            </Button>
          </Box>
        </Center>
      </Flex>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          resetState();
          onClose();
        }}
        isCentered
      >
        <ModalOverlay backdropBlur={"2xl"} />
        <ModalContent
          p={0}
          w="fit-content"
          m={0}
          position={["fixed", "unset"]}
          bottom="0px"
          borderRadius={"2xl"}
        >
          <ModalBody p={0} borderWidth="1px" borderRadius="2xl">
            <Stack
              w={["100vw", "375px"]}
              h={"640px"}
              bg={["#1A1A1A", "#0C0C0C"]}
              borderRadius={"2xl"}
            >
              {currentScreen == 0 ? (
                <Dashboard onClose={onClose} />
              ) : currentScreen == 1 ? (
                <TransactionForm />
              ) : (
                <Preview />
              )}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
