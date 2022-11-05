import React from 'react'
import * as solanaWeb3 from '@solana/web3.js'
import * as bip39 from 'bip39'
import { Box, Button, Text } from '@chakra-ui/react'

function GenKeyPair() {
  const { Keypair } = solanaWeb3
  const [mnemonicValue, setMnemonicValue] = React.useState('')
  const [publicKey, setPublicKey] = React.useState('')

  const generateKey = async () => {
    const mnemonic = bip39.generateMnemonic()
    console.log(mnemonic)
    setMnemonicValue(mnemonic)

    const seed = bip39.mnemonicToSeedSync(mnemonic, '') // (mnemonic, password)
    const keypair = Keypair.fromSeed(seed.slice(0, 32))
    setPublicKey(keypair.publicKey.toString())
    console.log(`${keypair.publicKey.toBase58()}`) // 5ZWj7a1f8tWkjBESHKgrLmXshuXxqeY9SYcfbshpAqPG
  }

  return (
    <Box>
      <Box>
        <Button colorScheme="blue" onClick={generateKey}>
          Generate Key
        </Button>
      </Box>
      <Box>
        <Text as="samp" fontSize="2xl">
          {mnemonicValue}
        </Text>
        <Text as="samp" fontSize="2xl">
          {publicKey}
        </Text>
      </Box>
    </Box>
  )
}

export default GenKeyPair
