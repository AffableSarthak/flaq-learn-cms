import { Box, HStack, Stack, Text, Input, FormControl, FormLabel, Button, InputGroup, InputRightElement } from '@chakra-ui/react'
import React from 'react'
import { MdKeyboardBackspace } from 'react-icons/md'

export default function TransactionForm({ handleScreen }: { handleScreen: (screenNumber: number) => void }) {
    return (
        <>
            <HStack w='full' px={6} pb={6} pt={14} alignItems='center' borderBottom={'1px'} borderColor='gray.800'>
                <Box mr={2} cursor='pointer' onClick={() => handleScreen(0)}>
                    <MdKeyboardBackspace fontSize={'24px'} />
                </Box>
                <HStack alignItems={'center'}>
                    <Text fontWeight='semibold' fontFamily={'Poppins'}>Send SOL</Text>
                </HStack>
            </HStack>
            <Stack py={6} px={7}>
                <FormControl>
                    <Box>
                        <FormLabel fontWeight={'semibold'} color='#B5E8CC' fontFamily={'Poppins'}>Recipient address</FormLabel>
                        <Input type='text' mt={4} />
                    </Box>
                    <Box mt={6}>
                        <FormLabel fontWeight={'semibold'} color='#B5E8CC' fontFamily={'Poppins'}>Enter Amount</FormLabel>
                        <Input type='text' mt={4} />
                    </Box>
                    <Text fontWeight={'medium'} color='gray.600' fontFamily={'Poppins'} mt={4}>~$232.90</Text>
                </FormControl>
            </Stack>
            <Stack px={4} pb={14} h='full' justifyContent='flex-end'>
                <Button w='full' py={4} bg='#97FCE9' color='black' _hover={{ bg: '#97FCE9' }} onClick={() => handleScreen(2)}>
                    Preview
                </Button>
            </Stack>
        </>
    )
}
