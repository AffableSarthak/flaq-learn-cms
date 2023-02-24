import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Highlight,
  Img,
  Input,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";

const ClaimNft = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    name: "",
    wallet_address: "",
    token_uri: "-",
    mint_secret: "9699be11fc8c",
  });

  const isAddressValid = () => {
    const pattern = new RegExp("^(0x)[a-zA-Z0-9]{40}");
    if (formData.wallet_address.length === 0) {
      return false;
    }
    return !pattern.test(formData.wallet_address);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const body = {
      ...formData,
    };

    console.log({ body });

    const claimNftRes = await fetch("https://apix.flaq.club/nft/poap/mint", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log({ err });
        toast({
          title: "Error",
          description: "Try again later",
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
      });

    console.log({ claimNftRes });

    if (claimNftRes.status_code === 500) {
      toast({
        title: `${claimNftRes.message}`,
        description: `NFT already claimed with ${formData.email}`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setFormData({
        email: "",
        name: "",
        wallet_address: "",
        token_uri: "-",
        mint_secret: "9699be11fc8c",
      });
      setIsLoading(false);
      return;
    } else if (claimNftRes.status_code === 200) {
      toast({
        title: `NFT claimed`,
        description: `Please check your email for the link`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setFormData({
        email: "",
        name: "",
        wallet_address: "",
        token_uri: "-",
        mint_secret: "9699be11fc8c",
      });
      setIsLoading(false);
    }

    setFormData({
      email: "",
      name: "",
      wallet_address: "",
      token_uri: "-",
      mint_secret: "9699be11fc8c",
    });
    setIsLoading(false);
  };

  return (
    <>
      <Box
        backgroundImage={"/img/claimNft/bg.png"}
        backgroundSize="cover"
        backgroundRepeat={"no-repeat"}
        backgroundPosition="top"
      >
        <Flex justifyContent={"center"} position="relative">
          <Box
            w={"540px"}
            h={["unset", "350px", "400px", "600px"]}
            backdropBlur="2xl"
            mb={[2, 72]}
            pt={["250px", "105px"]}
            textAlign="center"
            position="relative"
          >
            <Heading fontFamily={"Poppins"} fontSize={["32px", "30px", "60px"]}>
              Gorkha please!
            </Heading>
            <Heading fontFamily={"Poppins"} fontSize={["32px", "30px", "60px"]}>
              <Highlight query="NFT" styles={{ color: "#7BF8EC" }}>
                Claim your NFT
              </Highlight>
            </Heading>

            {/* <>
              <Heading
                fontFamily={"Poppins"}
                fontSize={["32px", "30px", "60px"]}
              >
                <Highlight query="NFT" styles={{ color: "#7BF8EC" }}>
                  NFT Minted!
                </Highlight>
              </Heading>
              <Box>
                <Link
                  as={NextLink}
                  colorScheme="blue"
                  href={`https://rarible.com/user/owned`}
                  isExternal
                  target={"_blank"}
                >
                  {`Link to your NFT `}
                </Link>
                <ExternalLinkIcon mx="2px" />
              </Box>
            </> */}

            <Box mt="8">
              <form onSubmit={(e) => handleSubmit(e)}>
                <Flex direction={"column"} p="4">
                  <Flex
                    direction={"column"}
                    justifyContent={"center"}
                    alignContent="center"
                    alignItems={"center"}
                  >
                    <FormControl isRequired my="3">
                      <FormLabel>Email address</FormLabel>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((data) => {
                            return {
                              ...data,
                              email: e.target.value,
                            };
                          })
                        }
                        placeholder="email"
                        required
                      />
                      <FormHelperText>{`We'll never share your email.`}</FormHelperText>
                    </FormControl>
                    <FormControl isRequired my="3">
                      <FormLabel>Name</FormLabel>
                      <Input
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((data) => {
                            return {
                              ...data,
                              name: e.target.value,
                            };
                          })
                        }
                        placeholder="name"
                        required
                        type="text"
                      />
                    </FormControl>
                    <FormControl isRequired my="3">
                      <FormLabel>public address</FormLabel>
                      <Input
                        type="text"
                        value={formData.wallet_address}
                        focusBorderColor={
                          isAddressValid() ? "crimson" : undefined
                        }
                        pattern="^(0x)[a-zA-Z0-9]{40}"
                        isInvalid={isAddressValid()}
                        errorBorderColor="crimson"
                        onChange={(e) =>
                          setFormData((data) => {
                            return {
                              ...data,
                              wallet_address: e.target.value,
                            };
                          })
                        }
                        placeholder="public key"
                        required
                      />
                      {isAddressValid() ? (
                        <FormHelperText textColor={"crimson"}>
                          Enter a valid eth address
                        </FormHelperText>
                      ) : (
                        <></>
                      )}
                    </FormControl>

                    <Button
                      px={["30px", "80px"]}
                      bg="white"
                      fontWeight={600}
                      fontSize="sm"
                      color="black"
                      type="submit"
                      _hover={{
                        bg: "white",
                      }}
                      mb="54px"
                      mt="4"
                      isLoading={isLoading}
                      loadingText="Minting NFT to your address..."
                      isDisabled={
                        formData.wallet_address.length === 0 ||
                        isAddressValid() ||
                        formData.email.length === 0 ||
                        formData.name.length === 0
                      }
                    >
                      Mint NFT
                    </Button>
                  </Flex>
                </Flex>
              </form>
            </Box>
          </Box>

          <Img
            src="/img/claimNft/NFT1.svg"
            position={"absolute"}
            top={"100px"}
            right={0}
            w="290px"
            display={["none", "none", "none", "block"]}
          />
          <Img
            src="/img/claimNft/NFT2.svg"
            position={"absolute"}
            top={["80px", "50px"]}
            left={0}
            w={["71px", "8.2em", "9.2em", "271px"]}
            h={["100px", "8.2em", "9.2em", "200px"]}
          />
          <Img
            src="/img/claimNft/NFT3.svg"
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
        </Flex>
      </Box>
    </>
  );
};

export default ClaimNft;
