import {
  Box,
  Container,
  Grid,
  GridItem,
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
import Navbar from "./Navbar";
import Image from "next/image";
import Link from "next/link";
import { getBlockchainData } from "../utils/blockchain";

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
    <Box bg="#040F03" maxWidth={"100%"}>
      <Container maxWidth={"1200px"}>
        <Navbar />
        <Box my="8" w="100%">
          <Text
            lineHeight={"5.7rem"}
            fontFamily={"Druk Wide Bold"}
            fontWeight={"700"}
            fontSize={{ base: "4xl", md: "7xl" }}
            as="h1"
          >
            Select a{" "}
            <Text
              lineHeight={"5.7rem"}
              fontFamily={"Druk Wide Bold"}
              fontWeight={"700"}
              fontSize={{ base: "4xl", md: "7xl" }}
              color="#70FFE9"
              as="span"
            >
              chain
            </Text>
          </Text>
          {chainSimulations.length > 0 && (
            <Tabs
              index={tabIndex}
              onChange={handleTabsChange}
              my="8"
              variant={"unstyled"}
            >
              <TabList overflowX={"scroll"}>
                {chainSimulations.map((chain: any, key: number) => (
                  <Tab m="4" p="0" key={key}>
                    <Box
                      w="360px"
                      h="118px"
                      border={
                        key === tabIndex
                          ? "4px solid #B381FF"
                          : "1px solid rgba(255, 255, 255, 0.5)"
                      }
                      bg={`${key === tabIndex ? "#F8F8F8" : "#040F03"}`}
                      color={`${key === tabIndex ? "#3D3D3D" : "#FFFFFF"}`}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      borderRadius={"20px"}
                    >
                      <HStack>
                        <Image src={chain.icon} alt={chain.name} />
                        <Text
                          fontSize={{ base: "xl", md: "2xl" }}
                          fontFamily={"Druk Wide Bold"}
                        >
                          {chain.name}
                        </Text>
                      </HStack>
                    </Box>
                  </Tab>
                ))}
              </TabList>
              <Box py="8">
                <Text
                  color="#ffffff"
                  fontWeight={700}
                  fontFamily={"Druk Wide Bold"}
                  fontSize={{ md: "4xl", base: "2xl" }}
                >
                  Learn {chainSimulations[tabIndex].name}
                </Text>
              </Box>
              <TabPanels>
                {chainSimulations.map((chain: any, key: number) => {

                  return chain.simulations.length > 0 ? (
                    <TabPanel key={key}>
                      <Grid
                        templateColumns={{
                          base: "repeat(1, 1fr)",
                          sm: "repeat(1, 1fr)",
                          md: "repeat(3, 1fr)",
                        }}
                        gap={6}
                      >
                        {chain.simulations.map(
                          (simulation: any, key: number) => (
                            <Link
                              key={key}
                              passHref
                              href={`simulation/${simulation.link}`}
                            >
                              <GridItem
                                cursor="pointer"
                                border="1px solid #000000"
                                bg="#1A1A1A"
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
                          )
                        )}
                      </Grid>
                    </TabPanel>
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
    </Box>
  );
};

export default HomePage;
