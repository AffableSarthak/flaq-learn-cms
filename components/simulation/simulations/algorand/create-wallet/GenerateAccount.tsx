import React from 'react'
import shallow from 'zustand/shallow'
import { Box, Button, Center, Text } from '@chakra-ui/react'
import ToolTip from '../../../../common/ToolTip'
import { useCreateWalletStore } from '../../../store/algorand/createWalletStore'
import * as algosdk from 'algosdk'

function GenerateAccount() {
  const {
    seedPhrase,
    publicKey,
    setPublicKey,
    setSeedPhrase,
  } = useCreateWalletStore(
    (state) => ({
      seedPhrase: state.seedPhrase,
      publicKey: state.publicKey,
      setSeedPhrase: state.setSeedPhrase,
      setPublicKey: state.setPublicKey,
    }),
    shallow,
  )

  const createAlgorandWallet = () => {
    try {
      const myaccount = algosdk.generateAccount()
      const publicKey = myaccount.addr
      const account_mnemonic = algosdk.secretKeyToMnemonic(myaccount.sk)
      setPublicKey(publicKey)
      setSeedPhrase(account_mnemonic)
    } catch (err) {
      console.log('err', err)
    }
  }

  const isUserDataAvailable = () => {
    return seedPhrase.length !== 0 && publicKey.length !== 0
  }

  return (
    <Box>
      <Center my="8">
        <ToolTip text="click here to start test running web3!">
          <Button variant={'primarybtn'} onClick={createAlgorandWallet}>
            Create New Wallet
          </Button>
        </ToolTip>
      </Center>

      {isUserDataAvailable() && (
        <Box
          borderWidth={'0.5px'}
          borderColor="whiteAlpha.200"
          borderRadius="2xl"
          p={10}
        >
          <Center mb={2}>
            <Box>
              <Text fontFamily={'Dela Gothic One'}>Secret Recovery Phrase</Text>
            </Box>
          </Center>

          <ToolTip text="don’t share this w anyone!">
            <Center>
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
            </Center>
          </ToolTip>
        </Box>
      )}
    </Box>
  )
}

export default GenerateAccount
