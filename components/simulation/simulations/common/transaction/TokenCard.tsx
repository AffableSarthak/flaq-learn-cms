import { Avatar, Box, HStack, Stack, Text } from '@chakra-ui/react'
import React from 'react'

export default function TokenCard() {
    return (
        <HStack p={4} rounded='xl' border={'1px'} borderColor='#151515' bg='#101010' justifyContent={'space-between'}>
            <HStack alignItems={'center'}>
                <Avatar src='https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png' name='Solana' />
                <Box>
                    <Text fontWeight={'medium'} fontFamily='Poppins'>Solana</Text>
                    <Text color='#9999A5' fontFamily='Poppins'>56.67 SOL</Text>
                </Box>
            </HStack>
            <Stack alignItems={'end'}>
                <Text fontFamily='Poppins'>$34.03</Text>
                <Text fontSize={'xs'} color='#70DC94' fontFamily='Poppins'>+4.02%</Text>
            </Stack>
        </HStack>
    )
}
