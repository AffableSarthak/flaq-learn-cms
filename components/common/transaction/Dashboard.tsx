import React from 'react'
import { Box, HStack, Stack, Text } from '@chakra-ui/react'
import { IoCloseOutline } from 'react-icons/io5';
import { HiUpload } from 'react-icons/hi';
import TokenCard from './TokenCard';

export default function Dashboard() {
    return (
        <>
            <Stack alignItems={'center'} w='full' background='linear-gradient(229.14deg, #94F533 -2.89%, #2AD0CA 84.74%)' boxShadow='0px 4px 24px rgba(172, 234, 254, 0.4)' pb={5} roundedBottom='2xl'>
                <HStack w='full' py={5} px={4} alignItems='center' justifyContent={'space-between'} borderBottom={'1px'} borderColor='#A4D067'>
                    <HStack alignItems={'center'}>
                        <Text fontWeight='semibold' fontFamily={'Poppins'} color='black'>My Wallet</Text>
                        <Box w={1} h={1} bg='#858585' mx={2}></Box>
                        <Text fontWeight='semibold' fontFamily={'Poppins'} color='black'>A1ToX...38ksAz</Text>
                    </HStack>
                    <Box>
                        <IoCloseOutline fontSize={'24px'} color='black' />
                    </Box>
                </HStack>
                <Stack px={24} py={9}>
                    <Stack alignItems={'center'} color='black'>
                        <Text fontWeight={'medium'}>BALANCE IN SOL</Text>
                        <Text fontWeight={'medium'} mt={2} fontSize={'36px'} lineHeight={'42px'}>0.004 SOL</Text>
                        <Box mt={2} px={2} py={1} bg='white' rounded={'lg'}>
                            ☝️<Text fontWeight={'medium'} color='black' as='span' ml={0.5}>$242.54</Text>
                            <Text fontWeight={'medium'} color='black' as='span' ml={1}>(2.93%)</Text>
                        </Box>
                    </Stack>
                </Stack>
                <Stack alignItems={'center'} py={5} px={10} bg='gray.800' border={'2px'} borderColor='black' rounded={'lg'}>
                    <HiUpload fontSize={'24px'} />
                    <Text fontWeight={'medium'} fontSize='xs' mt={2}>SEND</Text>
                </Stack>
            </Stack >
            <Box px={4} py={6}>
                <Text fontWeight={'semibold'} mb={3}>Tokens</Text>
                <TokenCard />
            </Box>
        </>
    )
}
