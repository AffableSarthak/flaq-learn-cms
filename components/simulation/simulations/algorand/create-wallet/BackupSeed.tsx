import React from 'react'
import { Box, Button, Center, Flex, Text, useToast } from '@chakra-ui/react'
import { useCreateWalletStore } from '../../../store/algorand/createWalletStore'
import shallow from 'zustand/shallow'

function BackupSeed() {
  const toast = useToast()
  const { seedPhrase } = useCreateWalletStore(
    (state) => ({
      seedPhrase: state.seedPhrase,
    }),
    shallow,
  )

  return (
    <Box>
      {seedPhrase.length !== 0 ? (
        <Flex
          flexDirection={'column'}
          justifyContent="center"
          alignItems={'center'}
          gap={{ base: 2, md: 4 }}
          margin={'auto'}
        >
          <Box
            my="4"
            style={{
              borderImage: 'linear-gradient(60deg, #a6ebc9, #005704)',
              borderImageSlice: 1,
            }}
            border="1px solid transparent"
            maxW={'350px'}
            textAlign="center"
            fontSize="xl"
            px="8"
            py="4"
          >
            {seedPhrase}
          </Box>
          <Box>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(seedPhrase)
                toast({
                  title: `Copied to clipboard`,
                  status: 'success',
                  isClosable: true,
                  description:
                    'You can now paste it in a secure location or write it down because you’ll need to back it up to verify it and create your wallet!',
                  duration: 10000,
                  position: 'top-right',
                })
              }}
              variant={'primarybtn'}
            >
              Back Up Seed Phrase
            </Button>
          </Box>
        </Flex>
      ) : (
        <Center my="8">
          <Text color="#a6ebc9">
            Create a wallet to get your secret recovery phrase in previous step
          </Text>
        </Center>
      )}
    </Box>
  )
}

export default BackupSeed
