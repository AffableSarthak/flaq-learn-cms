import { Box, Button, Flex, Heading, Img, Text } from "@chakra-ui/react";
import React from "react";
import Faq from "../components/claimNFT/Faqs";
import Header from "../components/claimNFT/Header";

export default function claimNft() {
  return (
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
          h={["unset", "600px"]}
          mb={[2, 72]}
          pt={["250px", "105px"]}
          textAlign="center"
          backgroundImage={["none", "/img/claimNft/flaq.svg"]}
          backgroundPosition="center"
          backgroundSize={"contain"}
          backgroundRepeat={"no-repeat"}
          position="relative"
          _before={{
            content: `""`,
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,0.1)",
            backdropBlur: "10px",
          }}
        >
          <Heading fontFamily={"Poppins"} fontSize={["32px", "40px", "60px"]}>
            Congratulations!
          </Heading>
          <Heading
            as="span"
            fontSize={["32px", "40px", "60px"]}
            mt={6}
            fontFamily={"Poppins"}
          >
            Claim your {""}
          </Heading>
          <Heading
            fontFamily={"Poppins"}
            as="span"
            color="#7BF8EC"
            fontSize={["32px", "40px", "60px"]}
          >
            NFT
          </Heading>
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
          >
            Connect your wallet
          </Button>
        </Box>
        <Img
          src="/img/claimNft/NFt1.svg"
          position={"absolute"}
          top={"100px"}
          right={0}
          w="290px"
          display={["none", "none", "block"]}
        />
        <Img
          src="/img/claimNft/NFt2.svg"
          position={"absolute"}
          top={["80px", "50px"]}
          left={0}
          w={["71px", "271px"]}
          h={["100px", "200px"]}
          display={["block", "none", "block"]}
        />
        <Img
          src="/img/claimNft/NFt3.svg"
          position={"absolute"}
          top={"400px"}
          left={0}
          w="271px"
          h="300px"
          display={["none", "none", "block"]}
        />
        <Img
          src="/img/claimNft/NFT4.svg"
          position={"absolute"}
          top={0}
          right={0}
          w="121px"
          h="180px"
          display={["block", "none"]}
        />
        <Img
          src="/img/claimNft/Blob1.png"
          position={"absolute"}
          top={"400px"}
          right={[0, "10px", "190px"]}
          w="290px"
          display={["none", "none", "block"]}
        />
      </Flex>
      <Faq />
    </Box>
  );
}
