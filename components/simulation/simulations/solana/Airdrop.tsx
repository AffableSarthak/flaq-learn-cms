import React from "react";

import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Hide,
  Text,
  useToast,
} from "@chakra-ui/react";
import shallow from "zustand/shallow";
import { useCreateSolWalletStore } from "../../store/solana/createSolWalletStore";

function Airdrop() {
  const {
    seedPhrase,
    airdropTokenIntoWallet,
    balance,
    error,
    isLoading,
    fakeAirdrop,
    fakeBalance,
    publicKey,
  } = useCreateSolWalletStore(
    (state) => ({
      seedPhrase: state.seedPhrase,
      airdropTokenIntoWallet: state.airdropTokenIntoWallet,
      balance: state.balance,
      error: state.error,
      isLoading: state.isLoading,
      fakeAirdrop: state.setFakeBalance,
      fakeBalance: state.fakeBalance,
      publicKey: state.publickey,
    }),
    shallow
  );

  const toast = useToast();

  const isUserDataAvailable = () => {
    return seedPhrase.length !== 0;
  };

  return (
    <Box>
      {isUserDataAvailable() ? (
        <>
          <Center my="8">
            <Button
              variant={"primarybtn"}
              onClick={async () => {
                await airdropTokenIntoWallet();
                toast({
                  title: "Success",
                  description: "Airdrop successful",
                  status: "success",
                  duration: 4000,
                  isClosable: true,
                  position: "top-right",
                });
              }}
              isLoading={isLoading}
              loadingText="Bling Bling on your way!"
            >
              Airdrop some 🪙 into your wallet
            </Button>
          </Center>

          <Center>
            <Box>
              <Text color="#a6ebc9">
                your balance in this wallet identified by your public key 🔑
              </Text>
            </Box>
          </Center>

          <Flex
            borderWidth={"0.5px"}
            borderColor="whiteAlpha.200"
            borderRadius="2xl"
            p={2}
            mt={4}
            flexDirection={{ base: "column", md: "column", lg: "row" }}
            gap={{ md: 4 }}
          >
            <Flex
              flexDirection={"column"}
              justifyContent="center"
              alignItems={"center"}
              gap={{ base: 2, md: 4 }}
              margin={"auto"}
            >
              <Box>
                <Text fontFamily={"Druk Wide Bold "}>Your Public key</Text>
              </Box>

              <Box maxW={{ base: "30ex", md: "none" }}>
                <Text as="samp" px="2" textAlign={"center"} color="#a6ebc9">
                  {publicKey}
                </Text>
              </Box>
              {/* <Box>
                <Link
                  href={`https://explorer.solana.com/address/${getUserPublicKey(
                    seedPhrase,
                  ).toString()}?cluster=testnet`}
                  isExternal
                >
                  Explore on SolScan <ExternalLinkIcon mx="2px" />
                </Link>
              </Box> */}
            </Flex>

            <Hide below="lg">
              <Divider orientation="vertical" height="23ex" m="4" />
            </Hide>
            <Hide above="md">
              <Divider orientation="horizontal" width={"90%"} m="4" />
            </Hide>
            <Flex
              flexDirection={"column"}
              justifyContent="center"
              alignItems={"center"}
              gap={{ base: 2, md: 4 }}
              margin={"auto"}
            >
              <Box>
                <Text fontFamily={"Druk Wide Bold "}>Your Balance</Text>
              </Box>
              <Box maxW={{ base: "70vw" }}>
                <Text as="samp" px="2">
                  {fakeBalance} SOL
                </Text>
              </Box>
            </Flex>
          </Flex>
        </>
      ) : (
        <Box>
          <Text color="#a6ebc9" textAlign={"center"}>
            Create a wallet to get your secret recovery phrase in previous step
          </Text>
        </Box>
      )}
    </Box>
  );
}

export default Airdrop;
