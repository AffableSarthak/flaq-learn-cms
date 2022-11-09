import React from 'react'
import * as bip39 from 'bip39'
import shallow from 'zustand/shallow'
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Hide,
  Text,
} from '@chakra-ui/react'
import {
  getUserPublicKey,
  useCreateWalletStore,
} from '../../../store/create-wallet'

function GenKeyPair() {
  const { seedPhrase, setSeedPhrase } = useCreateWalletStore(
    (state) => ({
      seedPhrase: state.seedPhrase,
      setSeedPhrase: state.setSeedPhrase,
    }),
    shallow,
  )

  const generateKey = async () => {
    const mnemonic = bip39.generateMnemonic()
    setSeedPhrase(mnemonic)
  }

  const isUserDataAvailable = () => {
    return seedPhrase.length !== 0
  }

  return (
    <Box>
      <Center my="8">
        <Button variant={'primarybtn'} onClick={generateKey}>
          Create New Wallet
        </Button>
      </Center>

      {isUserDataAvailable() && (
        <Flex
          borderWidth={'0.5px'}
          borderColor="whiteAlpha.200"
          borderRadius="2xl"
          p={2}
          mt={4}
          flexDirection={{ base: 'column', md: 'column', lg: 'row' }}
          gap={{ md: 4 }}
        >
          <Flex
            flexDirection={'column'}
            justifyContent="center"
            alignItems={{ lg: 'center', base: 'flex-start' }}
            gap={{ base: 2, md: 4 }}
          >
            <Box>
              <Text fontFamily={'Dela Gothic One'}>Secret Recovery Phrase</Text>
            </Box>
            <Box
              style={{
                borderImage: 'linear-gradient(60deg, #a6ebc9, #005704)',
                borderImageSlice: 1,
              }}
              borderRadius={'8px'}
              border="1px solid transparent"
              textAlign="center"
              as="samp"
              px="2"
              py="4"
            >
              {seedPhrase}
            </Box>
          </Flex>

          <Hide below="lg">
            <Divider orientation="vertical" height="23ex" m="4" />
          </Hide>
          <Hide above="md">
            <Divider orientation="horizontal" width={'90%'} m="4" />
          </Hide>
          <Flex
            flexDirection={'column'}
            justifyContent="center"
            alignItems={{ lg: 'center', base: 'flex-start' }}
            gap={{ base: 2, md: 4 }}
          >
            <Box>
              <Text fontFamily={'Dela Gothic One'}>Your Public Key</Text>
            </Box>
            <Box maxW={{ base: '70vw' }}>
              <Text as="samp" px="2">
                {getUserPublicKey(seedPhrase).toString()}
              </Text>
            </Box>
          </Flex>
        </Flex>
      )}
    </Box>
  )
}

export default GenKeyPair
