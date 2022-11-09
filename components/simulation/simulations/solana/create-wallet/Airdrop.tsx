import React from 'react'
import {
  getUserPublicKey,
  useCreateWalletStore,
} from '../../../store/create-wallet'

import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Hide,
  Link,
  Text,
} from '@chakra-ui/react'
import shallow from 'zustand/shallow'
import { ExternalLinkIcon } from '@chakra-ui/icons'

function Airdrop() {
  const { seedPhrase, airdropTokenIntoWallet, balance } = useCreateWalletStore(
    (state) => ({
      seedPhrase: state.seedPhrase,
      airdropTokenIntoWallet: state.airdropTokenIntoWallet,
      balance: state.balance,
    }),
    shallow,
  )

  const isUserDataAvailable = () => {
    return seedPhrase.length !== 0
  }

  return (
    <Box>
      {isUserDataAvailable() ? (
        <>
          <Center my="8">
            <Button variant={'primarybtn'} onClick={airdropTokenIntoWallet}>
              Airdrop some 🪙 into your wallet
            </Button>
          </Center>
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
              alignItems={'center'}
              gap={{ base: 2, md: 4 }}
              margin={'auto'}
            >
              <Box>
                <Text fontFamily={'Dela Gothic One'}>Your Public key</Text>
              </Box>

              <Box maxW={{ base: '30ex', md: 'none' }}>
                <Text as="samp" px="2" textAlign={'center'} color="#a6ebc9">
                  {getUserPublicKey(seedPhrase).toString()}
                </Text>
              </Box>
              <Box>
                <Link
                  href="https://explorer.solana.com/?cluster=testnet"
                  isExternal
                >
                  Explore on SolScan <ExternalLinkIcon mx="2px" />
                </Link>
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
              alignItems={'center'}
              gap={{ base: 2, md: 4 }}
              margin={'auto'}
            >
              <Box>
                <Text fontFamily={'Dela Gothic One'}>Your Balance</Text>
              </Box>
              <Box maxW={{ base: '70vw' }}>
                <Text as="samp" px="2">
                  {balance}
                </Text>
              </Box>
            </Flex>
          </Flex>
        </>
      ) : (
        <Box>
          <Text color="#a6ebc9">
            Create a wallet to get your secret recovery phrase in previous step
          </Text>
        </Box>
      )}
    </Box>
  )
}

export default Airdrop
