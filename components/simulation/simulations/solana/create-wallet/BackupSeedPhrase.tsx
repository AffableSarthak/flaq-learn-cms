import { Box, Button, Center, Flex, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { useCreateWalletStore } from '../../../store/create-wallet'

function BackupSeedPhrase() {
  const seedPhrase = useCreateWalletStore((state) => state.seedPhrase)

  const toast = useToast()
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

export default BackupSeedPhrase
