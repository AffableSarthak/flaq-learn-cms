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
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import TransactionForm from "./TransactionForm";
import Preview from "./Preview";
import { useTransactionStore } from "../../../store/solana/transactionStore";

export default function Transaction({ network }: { network: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentScreen, resetTransaction, handleNetworkType, networkType } =
    useTransactionStore();

  useEffect(() => {
    handleNetworkType(network);
  }, []);

  return (
    <Center>
      <Button variant={"primarybtn"} onClick={onOpen}>
        {`Let's transfer your first ${networkType}! 🪙`}
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          resetTransaction();
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
          <ModalBody p={0} borderRadius="2xl">
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
    </Center>
  );
}
