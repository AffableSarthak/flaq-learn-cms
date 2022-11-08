import React, { useEffect } from "react";
import * as solanaWeb3 from "@solana/web3.js";
import * as bip39 from "bip39";
import { Box, Button, Text } from "@chakra-ui/react";
import { useCreateWalletStore } from "../../../store/create-wallet";

function GenKeyPair() {
  const { Keypair } = solanaWeb3;
  const setUserWalletDetails = useCreateWalletStore(
    (state: { setUserWalletDetails: any }) => state.setUserWalletDetails
  );

  const userWalletDetails = useCreateWalletStore(
    (state: { userWalletDetails: any }) => state.userWalletDetails
  );

  const generateKey = async () => {
    const mnemonic = bip39.generateMnemonic();
    console.log(mnemonic);

    const seed = bip39.mnemonicToSeedSync(mnemonic, ""); // (mnemonic, password)
    const keypair = Keypair.fromSeed(seed.slice(0, 32));

    console.log(`${keypair.publicKey.toBase58()}`); // 5ZWj7a1f8tWkjBESHKgrLmXshuXxqeY9SYcfbshpAqPG
    console.log("Updating sim state", mnemonic);
    setUserWalletDetails({
      publicKey: keypair.publicKey.toString(),
      seedPhrase: mnemonic,
    });
  };

  return (
    <Box textAlign={"center"} fontFamily="Nunito Sans">
      <Box>
        <Button variant={"primarybtn"} onClick={generateKey}>
          Create New Wallet
        </Button>
      </Box>

      <Box
        my="12"
        display={"flex"}
        justifyContent="center"
        alignContent={"center"}
      >
        {userWalletDetails.seedPhrase && (
          <Box>
            <Box mb="12">
              <Text fontSize="2xl" fontWeight="bold">
                Secret Recovery Phrase
              </Text>
            </Box>
            <Box
              my="4"
              style={{
                borderImage: "linear-gradient(60deg, #a6ebc9, #005704)",
                borderImageSlice: 1,
              }}
              borderRadius={"8px"}
              border="1px solid transparent"
              maxW={"350px"}
              textAlign="center"
              fontSize="xl"
              px="8"
              py="4"
            >
              {userWalletDetails.seedPhrase}
            </Box>
            <Text>Can be used in future to recover account</Text>
          </Box>
        )}
      </Box>
      {userWalletDetails.publicKey && (
        <Box>
          <Text>
            <Text as="span" fontWeight="bold">
              Public Key
            </Text>
          </Text>
          <Text as="samp" fontSize="2xl">
            {userWalletDetails.publicKey}
          </Text>
        </Box>
      )}
    </Box>
  );
}

export default GenKeyPair;
