import { Box, Button, Center, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { useCreateWalletStore } from '../../../store/create-wallet'

function BackupSeedPhrase() {
  const userWalletDetails = useCreateWalletStore(
    (state: { userWalletDetails: any }) => state.userWalletDetails,
  )
  const toast = useToast()
  return (
    <Box>
      {userWalletDetails.seedPhrase ? (
        <Box>
          <Box
            my="4"
            style={{
              borderImage: 'linear-gradient(60deg, #a6ebc9, #005704)',
              borderImageSlice: 1,
            }}
            borderRadius={'8px'}
            border="1px solid transparent"
            maxW={'350px'}
            textAlign="center"
            fontSize="xl"
            px="8"
            py="4"
          >
            {userWalletDetails.seedPhrase}
          </Box>
          <Box>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(userWalletDetails.seedPhrase)
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
        </Box>
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
