import { Center, Stack } from '@chakra-ui/react'
import Dashboard from './Dashboard'
import Preview from './Preview'
import TransactionForm from './TransactionForm'

export default function Transaction() {
    return (
        <Center h='100vh'>
            <Stack w='375px' h='640px' bg='#0C0C0C'>
                <Dashboard />
                {/* <TransactionForm /> */}
                {/* <Preview /> */}
            </Stack >
        </Center>
    )
}
