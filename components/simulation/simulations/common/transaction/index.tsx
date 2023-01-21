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
import React, { useState, useEffect } from "react";
import TransactionForm from "./TransactionForm";
import Preview from "./Preview";
import { useTransactionStore } from "../../../store/solana/transactionStore";

export default function Transaction() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentScreen } = useTransactionStore();

  return (
    <Center>
      <Button variant={"primarybtn"} onClick={onOpen}>
        Send SOL
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          p={0}
          w="fit-content"
          m={0}
          position={["fixed", "unset"]}
          bottom="0px"
        >
          <ModalBody p={0}>
            <Stack
              w={["100vw", "375px"]}
              h={"640px"}
              bg={["#1A1A1A", "#0C0C0C"]}
              roundedTop={["2xl", 0]}
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
