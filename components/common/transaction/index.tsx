import { Stack } from '@chakra-ui/react'
import Dashboard from './Dashboard'

export default function Transaction() {
    return (
        <Stack w='375px' h='640px' bg='#0C0C0C'>
            <Dashboard />
            {/* <TransactionForm /> */}
            {/* <Preview /> */}
        </Stack >
    )
}
