import React from 'react'
import Transaction from '../components/simulation/simulations/common/transaction'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
} from '@chakra-ui/react'

export default function TransactionPage() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button onClick={onOpen}>Open Modal</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent p={0} w='fit-content' m={0}
                    position={["fixed", "unset"]}
                    bottom="0px"
                    mb="0">
                    <ModalBody p={0} maxH='640px'>
                        <Transaction />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}