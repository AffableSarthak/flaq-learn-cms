import Dashboard from './Dashboard'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Button,
    useDisclosure,
    Stack,
    Center
} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import TransactionForm from './TransactionForm'
import Preview from './Preview'

export default function Transaction() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [currentScreen, setCurrentScreen] = useState<number>(0)

    const handleScreen = (screenNumber: number) => {
        console.log(screenNumber, "screen");
        setCurrentScreen(screenNumber);
        console.log(currentScreen);
    }

    return (
        <Center>
            <Button variant={"primarybtn"} onClick={onOpen}>
                Send SOL
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent p={0} w='fit-content' m={0}
                    position={["fixed", "unset"]}
                    bottom="0px"
                    mb="0">
                    <ModalBody p={0}>
                        <Stack w='375px' h='640px' bg='#0C0C0C'>
                            {currentScreen == 0 ? <Dashboard onClose={onClose} handleScreen={handleScreen} /> : currentScreen == 1 ? <TransactionForm handleScreen={handleScreen} /> : <Preview handleScreen={handleScreen} />}
                        </Stack >
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Center>
    )
}
