import {
  Box,
  Button,
  Flex,
  Heading,
  Highlight,
  Img,
  Link,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Faq from "../../components/claimNFT/Faqs";
import Header from "../../components/claimNFT/Header";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "../../components/claimNFT/providerOptions";
import { stall } from "../../lib/utils";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

export default function claimNft({
  isClaimed,
  claimId,
}: {
  isClaimed: boolean;
  claimId: string;
}) {
  const [provider, setProvider] = useState();
  const [account, setAccount] = useState<string>("");
  const [error, setError] = useState("");
  const [web3Mo, setWeb3Mo] = useState<Web3Modal | undefined>(undefined);
  const toast = useToast;
  const [isLoading, setIsLoading] = useState(false);
  const [nftMinted, setNftMinted] = useState(isClaimed);

  useEffect(() => {
    if (typeof window !== "undefined") {
      //here `window` is available
      const web3Modal = new Web3Modal({
        cacheProvider: true, // optional
        providerOptions, // required
      });
      setWeb3Mo(web3Modal);
    }
  }, []);

  const mintNft = async () => {
    setIsLoading(true);
    const body = {
      wallet_address: account,
      quiz_claim_id: claimId,
    };

    try {
      await stall();
      await fetch("https://apix.flaq.club/quiz/mint", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => {
        return response.json();
      });
    } catch (e) {
      console.log(e);
    } finally {
      let claimIdData;
      try {
        claimIdData = await (
          await fetch(
            `https://apix.flaq.club/quiz/claim-info?quizClaimId=${claimId}`
          )
        ).json();
        setNftMinted(claimIdData.data.is_nft_claimed);
      } catch (e) {
        setNftMinted(false);
      }
      setIsLoading(false);
    }
  };

  const connectWallet = async () => {
    try {
      const provider = await web3Mo?.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      setProvider(provider);
      if (accounts) setAccount(accounts[0]);
    } catch (error) {
      setError(error as string);
    }
  };

  const refreshState = () => {
    setAccount("");
  };

  const disconnect = async () => {
    await web3Mo?.clearCachedProvider();
    refreshState();
  };

  useEffect(() => {
    if (web3Mo?.cachedProvider) {
      connectWallet();
    }
  }, [web3Mo]);

  const truncateAddress = (address: string) => {
    if (!address) return "";
    const match = address.match(
      /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
    );
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
  };

  const renderMintNftBtn = () => {
    if (nftMinted === true || account.length === 0) {
      return <></>;
    }

    return (
      <Button
        px={["30px", "80px"]}
        py="14px"
        bg="white"
        fontWeight={600}
        fontSize="sm"
        color="black"
        _hover={{
          bg: "white",
        }}
        mt="54px"
        isLoading={isLoading}
        loadingText="Please wait while we mint the NFT to your account..."
        onClick={mintNft}
      >
        Mint NFT
      </Button>
    );
  };

  return (
    <>
      <Box
        backgroundImage={"/img/claimNft/bg.png"}
        backgroundSize="cover"
        backgroundRepeat={"no-repeat"}
        backgroundPosition="top"
      >
        <Header />

        <Flex justifyContent={"center"} position="relative">
          <Box
            w={"540px"}
            h={["unset", "350px", "400px", "600px"]}
            backdropBlur="2xl"
            mb={[2, 72]}
            pt={["250px", "105px"]}
            textAlign="center"
            backgroundImage={["none", "/img/claimNft/flaq.svg"]}
            backgroundPosition="center"
            backgroundSize={"contain"}
            backgroundRepeat={"no-repeat"}
            position="relative"
          >
            {nftMinted === false ? (
              <Heading
                fontFamily={"Poppins"}
                fontSize={["32px", "30px", "60px"]}
              >
                <Highlight query="NFT" styles={{ color: "#7BF8EC" }}>
                  Congratulations! Claim you NFT
                </Highlight>
              </Heading>
            ) : (
              <>
                <Heading
                  fontFamily={"Poppins"}
                  fontSize={["32px", "30px", "60px"]}
                >
                  <Highlight query="NFT" styles={{ color: "#7BF8EC" }}>
                    NFT Minted!
                  </Highlight>
                </Heading>
                {account.length !== 0 ? (
                  <Box>
                    <Link
                      as={NextLink}
                      colorScheme="blue"
                      href={`https://rarible.com/user/${account}/owned`}
                      isExternal
                      target={"_blank"}
                    >
                      {`Link to your NFT `}
                    </Link>
                    <ExternalLinkIcon mx="2px" />
                  </Box>
                ) : (
                  <Text>
                    Please connect your wallet to generate the link to your NFT
                  </Text>
                )}
              </>
            )}

            <Box>
              {account.length === 0 ? (
                <Button
                  px={["30px", "80px"]}
                  py="14px"
                  bg="white"
                  fontWeight={600}
                  fontSize="sm"
                  color="black"
                  _hover={{
                    bg: "white",
                  }}
                  mt="54px"
                  onClick={connectWallet}
                >
                  Connect your wallet
                </Button>
              ) : (
                <></>
              )}

              {renderMintNftBtn()}

              <Box my="4">
                <VStack>
                  <Text
                    fontFamily={"Poppins"}
                    fontWeight="bold"
                    as="samp"
                    fontSize={["1em", "1.4em", "1.8em"]}
                  >
                    {truncateAddress(account)}
                  </Text>
                  {account.length !== 0 ? (
                    <Button
                      colorScheme="teal"
                      variant="link"
                      onClick={disconnect}
                    >
                      Disconnect
                    </Button>
                  ) : (
                    <></>
                  )}
                </VStack>
              </Box>
            </Box>

            <></>
          </Box>

          <Img
            src="/img/claimNft/NFt1.svg"
            position={"absolute"}
            top={"100px"}
            right={0}
            w="290px"
            display={["none", "none", "none", "block"]}
          />
          <Img
            src="/img/claimNft/NFt2.svg"
            position={"absolute"}
            top={["80px", "50px"]}
            left={0}
            w={["71px", "8.2em", "9.2em", "271px"]}
            h={["100px", "8.2em", "9.2em", "200px"]}
            // display={["block", "none", "block"]}
          />
          <Img
            src="/img/claimNft/NFt3.svg"
            position={"absolute"}
            top={"400px"}
            left={0}
            w="271px"
            h="300px"
            display={["none", "none", "none", "block"]}
          />
          <Img
            src="/img/claimNft/NFT4.svg"
            position={"absolute"}
            top={0}
            right={0}
            w="121px"
            h="180px"
            display={["block", "block", "block", "none"]}
          />
          <Img
            src="/img/claimNft/Blob1.png"
            position={"absolute"}
            top={"400px"}
            right={[0, "10px", 0, 0]}
            w="290px"
            display={["none", "none", "block"]}
          />
        </Flex>
        <Faq />
      </Box>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const quizClaimId = id;
  let claimIdData;

  try {
    claimIdData = await (
      await fetch(
        `https://apix.flaq.club/quiz/claim-info?quizClaimId=${quizClaimId}`
      )
    ).json();
  } catch (e) {
    return {
      notFound: true,
    };
  }

  if (!claimIdData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      isClaimed: claimIdData.data.is_nft_claimed ? true : false,
      claimId: claimIdData.data.claim_id,
    },
  };
}
