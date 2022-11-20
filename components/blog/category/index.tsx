import { Box, Container, Grid, GridItem, Show, Text } from "@chakra-ui/react";
import React from "react";
import Navbar from "../../common/Navbar";
import Image from "next/image";
import web3icon from "../../../public/img/blog/web3Icon.svg";
import blogcover from "../../../public/img/blog/blogcover.svg";
import LooperGroup from "../../../public/img/blog/LooperGroup.svg";

type Props = {};

const CategoryPage = (props: Props) => {
  return (
    <Box position={"relative"} bg="#040F03" maxWidth={"100%"}>
      <Container pb="16" mb="16" maxW="1200px">
        <Navbar />
        <Box mt="12">
          <Box position={"relative"} w="fit-content">
            <Text
              my="3"
              lineHeight={"5.7rem"}
              fontFamily={"Druk Wide Bold"}
              fontWeight={"700"}
              fontSize={{ base: "3xl", md: "7xl" }}
              as="h1"
            >
              dive into web3
            </Text>
            <Text
              color="#9999A5"
              fontSize={{ md: "md", base: "sm" }}
              fontFamily={"Poppins"}
              fontWeight={500}
            >
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly
              <br /> used to demonstrate the visual form of a document or a
              typeface.
            </Text>
            <Box
              right={{ md: "-90px", base: "5px" }}
              top={{ md: "-18px", base: "5px" }}
              position={"absolute"}
            >
              <Image src={web3icon} width="90" height="90" />
            </Box>
          </Box>
        </Box>
        <Box my="8">
          <Grid
            templateColumns={{
              xl: "repeat(3, 1fr)",
              base: "repeat(1, 1fr)",
            }}
            justifyItems="center"
            gap={6}
          >
            {[0, 1, 2, 3].map((val, key) => {
              return (
                <GridItem
                  borderRadius={"2xl"}
                  bg="#393953"
                  w={{ md: "392px", base: "350px" }}
                  h={{ md: "440px", base: "392px" }}
                  key={key}
                  position="relative"
                >
                  <Box>
                    <Image src={blogcover} width="392" height="220" />
                  </Box>
                  <Box py="4" px="6">
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent={"space-between"}
                    >
                      <Box>
                        <Text
                          fontSize={"md"}
                          fontWeight={400}
                          fontFamily={"Space Mono"}
                        >
                          Article
                        </Text>
                        <Text
                          fontSize={"24px"}
                          fontWeight={700}
                          fontFamily={"Poppins"}
                        >
                          The Technology Behind Web3: Blockchain
                        </Text>
                      </Box>
                      <Box alignSelf={"auto"} mt={{ md: "12", base: "8" }}>
                        <Text
                          fontSize={"md"}
                          fontWeight={400}
                          fontFamily={"Space Mono"}
                        >
                          January 1, 2023
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                </GridItem>
              );
            })}
          </Grid>
        </Box>
      </Container>
      <Box position={"absolute"} bottom={-1} right={0}>
        <Show above="md">
          <Image src={LooperGroup} width="171" height="221" />
        </Show>
        <Show below="md">
          <Image src={LooperGroup} width="100" height="130" />
        </Show>
      </Box>
    </Box>
  );
};

export default CategoryPage;
