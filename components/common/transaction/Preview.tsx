import { Box, HStack, Stack, Text, Input, FormControl, FormLabel, Button, InputGroup, InputRightElement, Avatar } from '@chakra-ui/react'
import React from 'react'
import { MdKeyboardBackspace } from 'react-icons/md'

export default function Preview() {
    return (
        <>
            <HStack w='full' px={6} pb={6} pt={14} alignItems='center' borderBottom={'1px'} borderColor='gray.800'>
                <Box mr={2} cursor='pointer'>
                    <MdKeyboardBackspace fontSize={'24px'} />
                </Box>
                <HStack alignItems={'center'}>
                    <Text fontWeight='semibold' fontFamily={'Poppins'}>Preview</Text>
                </HStack>
            </HStack>
            <Stack py={6} px={7}>
                <HStack alignItems={'center'}>
                    <Avatar size={'lg'} src='https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png' name='Solana' />
                    <Box ml={4}>
                        <Text fontWeight={'medium'} fontFamily='Poppins' fontSize={'14px'} color='#B5E8CC'>value</Text>
                        <Text fontWeight={'semibold'} fontFamily='Poppins'>Sending 16.3 SOL</Text>
                    </Box>
                </HStack>
                <FormControl>
                    <Box mt={6}>
                        <FormLabel fontWeight={'semibold'} color='#B5E8CC' fontFamily={'Poppins'}>From</FormLabel>
                        <Input type='text' mt={4} placeholder='Enter your address' />
                    </Box>
                    <Box mt={4}>
                        <FormLabel fontWeight={'semibold'} color='#B5E8CC' fontFamily={'Poppins'}>To</FormLabel>
                        <Input type='text' mt={4} placeholder='Enter an amount' />
                    </Box>
                    <Box mt={4}>
                        <FormLabel fontWeight={'semibold'} color='#B5E8CC' fontFamily={'Poppins'}>Gas Fee</FormLabel>
                        <Input type='text' mt={4} placeholder='Enter an amount' />
                    </Box>
                </FormControl>
            </Stack>
            <Stack px={4} pb={14} h='full' justifyContent='flex-end'>
                <Button w='full' py={4} bg='#97FCE9' color='black' _hover={{ bg: '#97FCE9' }}>
                    Send
                </Button>
            </Stack>
        </>
    )
}
