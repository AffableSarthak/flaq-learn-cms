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

export default function Transaction() {
    const { isOpen, onOpen, onClose } = useDisclosure()

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
                            <Dashboard onClose={onClose} />
                            {/* <TransactionForm /> */}
                            {/* <Preview /> */}
                        </Stack >
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Center>
    )
}
