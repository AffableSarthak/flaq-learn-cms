import {
  Box,
  Container,
  Grid,
  GridItem,
  Highlight,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getBlockchainData } from "../utils/blockchain";
import Footer from "../../common/Footer";
import Header from "../../common/Header";
import RenderParaBlock from "../layout/main/RenderParaBlock";

type Props = {};

const HomePage = (props: Props) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index: React.SetStateAction<number>) => {
    setTabIndex(index);
  };
  const [chainSimulations, setBlockchainData] = React.useState<any>([]);
  useEffect(() => {
    setBlockchainData(getBlockchainData());
    return () => {
      setBlockchainData([]);
    };
  }, []);

  return (
    <>
      <Header
        showSearch={false}
        showNavlinks={false}
        showMenu={false}
        secondaryLink={{
          name: "Learn",
          link: "/",
        }}
      />
      <Box bg="#040F03">
        <Container maxW={"1240px"}>
          <Box my="8" w="100%">
            <Text
              fontFamily={"Druk Wide Bold"}
              fontWeight={"700"}
              fontSize={{ base: "3xl", md: "5xl" }}
              as="h1"
            >
              <Highlight
                query={"Web3"}
                styles={{
                  color: "#70FFE9",
                  fontFamily: "Druk Wide Bold",
                  fontWeight: "700",
                }}
              >
                Testrun Web3
              </Highlight>
            </Text>
            <VStack gap="4" mb="8">
              <Box>
                <Text
                  my="4"
                  fontFamily={"Poppins"}
                  fontWeight={"500"}
                  fontSize={{ base: "xl", md: "3xl" }}
                  as="h2"
                  color="#a6ebc9"
                >
                  What are simulations - why are they the future of web3
                  education? 🔮
                </Text>
                <Text fontSize={{ base: "xl", md: "lg" }}>
                  Aren’t we all tired of the bookish academic learning in
                  schools and colleges that seldom help us in our daily lives?
                  📚The education system needs to take a leap to practical
                  education, and Flaq aims to do just that! We offer free
                  interactive simulations that give you a comprehensive testrun
                  of everything web3 and ease your transition from web2 to web3.
                  You will not only understand the academic side of things
                  through our ed-pieces, but you’ll also understand the
                  practical side of web3 through our originally designed,
                  one-of-a-kind, world’s first, interactive simulations. 🥂 Now,
                  isn’t this holistic education? 🚀
                </Text>
              </Box>
              <Box>
                <Text
                  my="4"
                  fontFamily={"Poppins"}
                  fontWeight={"500"}
                  fontSize={{ base: "xl", md: "3xl" }}
                  as="h2"
                  color="#a6ebc9"
                >
                  But what will I learn through these interactive simulations?
                  🤔
                </Text>
                <Text fontSize={{ base: "xl", md: "lg" }}>
                  Thes simulations offer exactly what we claim - a testrun of
                  web3! This means that you’ll be learning how to create a
                  wallet, backup a seed phrase, swap tokens, and so much more,
                  on the widely used chains in the web3 space - Solana,
                  Algorand, Ethereum, and Filecoin. Best part? You can try these
                  simulations on any number of chains of your choice! The more
                  you practice, the better you get when you’re out there in the
                  real world. 🏃🏼‍♀️ 🚀
                </Text>
              </Box>
            </VStack>
            <Text
              my="3"
              fontFamily={"Druk Wide Bold"}
              fontWeight={"700"}
              fontSize={{ base: "3xl", md: "5xl" }}
              as="h1"
            >
              <Highlight
                query={"chain"}
                styles={{
                  color: "#70FFE9",
                  my: "3",
                  fontFamily: "Druk Wide Bold",
                  fontWeight: "700",
                }}
              >
                Select a chain
              </Highlight>
            </Text>
            {chainSimulations.length > 0 && (
              <Tabs
                index={tabIndex}
                onChange={handleTabsChange}
                my="8"
                variant={"unstyled"}
              >
                <TabList overflowX={"scroll"} className="hide-scrollbar">
                  {chainSimulations.map((chain: any, key: number) => (
                    <Tab m="4" p="0" key={key}>
                      <Box
                        border={"1px solid #70ffe9"}
                        px="8"
                        py="2"
                        bg={`${key === tabIndex ? "#f2f2f2" : "#040F03"}`}
                        color={`${key === tabIndex ? "#3D3D3D" : "#FFFFFF"}`}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        borderRadius={"20px"}
                      >
                        <HStack>
                          <Image src={chain.icon} alt={chain.name} />
                          <Text
                            fontSize={{ base: "lg", md: "xl" }}
                            fontFamily={"Druk Wide Bold"}
                          >
                            {chain.name}
                          </Text>
                        </HStack>
                      </Box>
                    </Tab>
                  ))}
                </TabList>
                <Box pt="8" pl="4">
                  <Text
                    my="3"
                    fontFamily={"Druk Wide Bold"}
                    fontWeight={"700"}
                    fontSize={{ base: "xl", md: "2xl" }}
                  >
                    <Highlight
                      query={`${chainSimulations[tabIndex].name} blockchain`}
                      styles={{
                        color: "#70FFE9",
                        my: "3",
                        fontFamily: "Druk Wide Bold",
                        fontWeight: "700",
                        textDecoration: "underline",
                        textUnderlineOffset: "8px",
                      }}
                    >
                      {`Explore the simulations on the ${chainSimulations[tabIndex].name} blockchain`}
                    </Highlight>
                  </Text>
                </Box>
                <TabPanels>
                  {chainSimulations.map((chain: any, key: number) => {
                    return chain.simulations.length > 0 ? (
                      <>
                        <TabPanel key={key}>
                          <RenderParaBlock
                            key={chain.name}
                            block={chain.paraBlock}
                          />
                          <Grid
                            templateColumns={{
                              base: "repeat(1, 1fr)",
                              sm: "repeat(1, 1fr)",
                              md: "repeat(2, 1fr)",
                              lg: "repeat(3, 1fr)",
                            }}
                            gap={6}
                          >
                            {chain.simulations.map(
                              (simulation: any, key: number) => (
                                <div key={key}>
                                  {simulation.isActive ? (
                                    <Link
                                      key={key}
                                      passHref
                                      href={`simulation/${simulation.link}`}
                                    >
                                      <GridItem
                                        cursor="pointer"
                                        border="1px solid #000000"
                                        bg="#C4FFE614"
                                        w={{ base: "306px", md: "384px" }}
                                        h={{ base: "179px", md: "218px" }}
                                        display={"flex"}
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                        borderRadius={"20px"}
                                      >
                                        <VStack>
                                          <Image
                                            src={simulation.icon}
                                            alt={simulation.name}
                                          />
                                          <Text
                                            fontFamily={"Poppins"}
                                            fontSize={{ md: "lg", base: "md" }}
                                            fontWeight={700}
                                          >
                                            {simulation.name}
                                          </Text>
                                        </VStack>
                                      </GridItem>
                                    </Link>
                                  ) : (
                                    <GridItem
                                      key={key}
                                      border="1px solid #000000"
                                      bg="#1A1A1A5C"
                                      w={{ base: "306px", md: "384px" }}
                                      h={{ base: "179px", md: "218px" }}
                                      display={"flex"}
                                      alignItems={"center"}
                                      justifyContent={"center"}
                                      borderRadius={"20px"}
                                    >
                                      <VStack>
                                        <Image
                                          src={simulation.icon}
                                          alt={simulation.name}
                                        />
                                        <Text
                                          fontFamily={"Poppins"}
                                          fontSize={{ md: "lg", base: "md" }}
                                          fontWeight={700}
                                        >
                                          {simulation.name}
                                        </Text>
                                        <Text>Coming soon</Text>
                                      </VStack>
                                    </GridItem>
                                  )}
                                </div>
                              )
                            )}
                          </Grid>
                        </TabPanel>
                      </>
                    ) : (
                      <TabPanel key={key}>
                        <Box key={key} w="100%" h="100%">
                          <Text
                            lineHeight={"5.7rem"}
                            fontFamily={"Druk Wide Bold"}
                            fontWeight={"600"}
                            fontSize={{ base: "2xl", md: "4xl" }}
                            as="h2"
                          >
                            Coming Soon...
                          </Text>
                        </Box>
                      </TabPanel>
                    );
                  })}
                </TabPanels>
              </Tabs>
            )}
          </Box>
        </Container>
        <Container px="0" maxW="100vw">
          <Footer />
        </Container>
      </Box>
    </>
  );
};

export default HomePage;
