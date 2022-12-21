import {
  Box,
  Container,
  Grid,
  GridItem,
  Highlight,
  Text,
} from "@chakra-ui/react";
import React from "react";
import LeftArrowIcon from "../../../public/img/blog/left arrow.svg";
import bgpattern from "../../../public/img/blog/bgpattern.svg";
import LooperGroup from "../../../public/img/blog/LooperGroup.svg";

import Image from "next/image";
import Link from "next/link";
import categoryInfo from "../data/categoryInfo";
import Footer from "../../common/Footer";
import Header from "../../common/Header";

interface IAllCategories {
  category: string;
  priority: number;
  slug: string;
}

type Props = {
  allCategories: IAllCategories[];
};

const HomePage = ({ allCategories }: Props) => {
  const categoryUtil = (category: string) => {
    return categoryInfo.find(
      (a) => a.name.toLowerCase() === category.toLowerCase()
    )?.desc;
  };

  return (
    <Box position={"relative"} bg="#040F03" maxWidth={"100%"}>
      <Header
        secondaryLink={{
          name: "Testrun Web3",
          link: "/simulation",
        }}
        showNavlinks={false}
        showSearch={true}
        showMenu={false}
      />
      <Container pb="16" maxW="90vw">
        <Container maxW="1200px">
          <Box mt="12">
            <Box>
              <Text
                my="3"
                fontFamily={"Druk Wide Bold"}
                fontWeight={"700"}
                fontSize={{ base: "3xl", md: "5xl" }}
                as="h1"
              >
                <Highlight
                  query={"Learn web3"}
                  styles={{
                    color: "#70FFE9",
                    my: "3",
                    fontFamily: "Druk Wide Bold",
                    fontWeight: "700",
                  }}
                >
                  Learn web3 with Flaq
                </Highlight>
              </Text>
              <Text
                color="#9999A5"
                fontSize={"md"}
                fontFamily={"Poppins"}
                fontWeight={500}
              >
                Learn ALL things web3 - cryptocurrencies, wallets, tips in web3,
                NFTs, DeFi, DAOs and so much more! We will help you master web3,
                step by step.
              </Text>
            </Box>
          </Box>
          <Box my="8">
            <Grid
              templateColumns={{
                xl: "repeat(2, 1fr)",
                base: "repeat(1, 1fr)",
              }}
              justifyItems="center"
              gap={5}
            >
              {allCategories.map((val, key) => {
                return (
                  <Link
                    passHref
                    key={key}
                    href={{
                      pathname: `/${val.slug}`,
                      query: { priority: `${val.priority}` },
                    }}
                  >
                    <a>
                      <GridItem
                        py="4"
                        px="6"
                        cursor={"pointer"}
                        border={"0.5px solid #70ffe9"}
                        borderRadius={"20px"}
                        bg="#1A1A1A"
                        w={{ md: "525px", base: "325px" }}
                        h={{ md: "250px", base: "150px" }}
                        display="flex"
                        flexDirection="column"
                        justifyContent={"space-evenly"}
                        position="relative"
                        backgroundImage={`url(${bgpattern.src})`}
                      >
                        <Box>
                          <Text
                            fontSize={{ md: "2.5rem", base: "1.2rem" }}
                            fontWeight={700}
                            fontFamily={"Druk Wide Bold"}
                          >
                            {val.category}
                          </Text>
                          <Text
                            fontSize={{ md: "16px", base: "12px" }}
                            textShadow="1px 1px #005704"
                          >
                            {categoryUtil(val.category)}
                          </Text>
                        </Box>
                        <Box alignSelf={"auto"}>
                          <Box display={"flex"} alignItems="center" w="100%">
                            <Text
                              fontSize={{ md: "24px", base: "16px" }}
                              fontWeight={700}
                              fontFamily={"Poppins"}
                            >
                              Start Learning
                            </Text>
                            <Image
                              src={LeftArrowIcon}
                              width="56px"
                              height="56px"
                            />
                          </Box>
                        </Box>
                      </GridItem>
                    </a>
                  </Link>
                );
              })}
            </Grid>
          </Box>
        </Container>
      </Container>
      <Container px="0" maxW="100vw">
        <Footer />
      </Container>
      <Box position={"absolute"} bottom={-1} right={0}>
        <Image src={LooperGroup} width="100%" height="100%" />
      </Box>
    </Box>
  );
};

export default HomePage;
