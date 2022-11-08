import React from 'react'
import * as solanaWeb3 from '@solana/web3.js'
import * as bip39 from 'bip39'
import { Box, Button, Center, Flex, Text, Textarea } from '@chakra-ui/react'
import { AiOutlineLock } from 'react-icons/ai'
import { CreateWalletState, UpdateCreateWalletState } from '../../../types'
import { useCreateWalletStore } from '../../../store/create-wallet'

function GenKeyPair() {
  const { Keypair } = solanaWeb3
  const setUserWalletDetails = useCreateWalletStore(
    (state: { setUserWalletDetails: any }) => state.setUserWalletDetails,
  )
  // const { seedPhrase, publickey } = userWalletDetails
  const [mnemonicValue, setMnemonicValue] = React.useState('')
  const [publicKey, setPublicKey] = React.useState('')
  const [hideKey, setHideKey] = React.useState(true)
  const generateKey = async () => {
    setHideKey(true)
    const mnemonic = bip39.generateMnemonic()
    console.log(mnemonic)
    setMnemonicValue(mnemonic)

    const seed = bip39.mnemonicToSeedSync(mnemonic, '') // (mnemonic, password)
    const keypair = Keypair.fromSeed(seed.slice(0, 32))
    setPublicKey(keypair.publicKey.toString())
    console.log(`${keypair.publicKey.toBase58()}`) // 5ZWj7a1f8tWkjBESHKgrLmXshuXxqeY9SYcfbshpAqPG
    console.log('Updating sim state', mnemonic)
    setUserWalletDetails({
      publicKey: keypair.publicKey.toString(),
      seedPhrase: mnemonic,
    })
  }

  return (
    <Box>
      <Box>
        <Button colorScheme="blue" onClick={generateKey}>
          Generate Key
        </Button>
      </Box>
      <Box my="12">
        {mnemonicValue && (
          <Box>
            <Box
              my="4"
              borderRadius={'8px'}
              border="1px solid #bbc0c5"
              maxW={'350px'}
              textAlign="center"
              fontSize="xl"
              px="8"
              py="4"
            >
              {mnemonicValue}
            </Box>
            
          </Box>
        )}
      </Box>
      <Text as="samp" fontSize="2xl">
        {publicKey}
      </Text>
    </Box>
  )
}

export default GenKeyPair
