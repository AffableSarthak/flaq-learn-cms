import {
  Box,
  Center,
  Container,
  Grid,
  GridItem,
  HStack,
  SimpleGrid,
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
import WalletIcon from "../../../public/img/simulations/wallets.svg";
import NftIcon from "../../../public/img/simulations/nft.svg";
import SwapIcon from "../../../public/img/simulations/swap.svg";

import algorandIcon from "../../../public/img/simulations/algorand.svg";
import avalancheIcon from "../../../public/img/simulations/avalanche.svg";
import ethereumIcon from "../../../public/img/simulations/ethereum.svg";
import solanaIcon from "../../../public/img/simulations/solana.svg";
import Image from "next/image";
import Link from "next/link";
import { getBlockchainData } from "../utils/blockchain";

type Props = {};
const chainSimulations = [
  {
    name: "Ethereuem",
    icon: ethereumIcon,
    simulations: [
      {
        name: "Create Wallet",
        link: "solana/create-wallet",
        icon: WalletIcon,
      },
      {
        name: "Mint a NFT",
        link: "solana/create-wallet",
        icon: NftIcon,
      },
      {
        name: "Swap Token",
        link: "solana/create-wallet",
        icon: SwapIcon,
      },
      {
        name: "Swap Token",
        link: "solana/create-wallet",
        icon: SwapIcon,
      },
      {
        name: "Mint a NFT",
        link: "solana/create-wallet",
        icon: NftIcon,
      },
      {
        name: "Create Wallet",
        link: "solana/create-wallet",
        icon: WalletIcon,
      },
    ],
  },
  {
    name: "Solana",
    icon: solanaIcon,
    simulations: [
      {
        name: "Create Wallet",
        link: "solana/create-wallet",
        icon: WalletIcon,
      },
      {
        name: "Mint a NFT",
        link: "solana/create-wallet",
        icon: NftIcon,
      },
      {
        name: "Swap Token",
        link: "solana/create-wallet",
        icon: SwapIcon,
      },
      {
        name: "Swap Token",
        link: "solana/create-wallet",
        icon: SwapIcon,
      },
      {
        name: "Mint a NFT",
        link: "solana/create-wallet",
        icon: NftIcon,
      },
      {
        name: "Create Wallet",
        link: "solana/create-wallet",
        icon: WalletIcon,
      },
    ],
  },
  {
    name: "Avalanche",
    icon: avalancheIcon,
    simulations: [
      {
        name: "Create Wallet",
        link: "solana/create-wallet",
        icon: WalletIcon,
      },
      {
        name: "Mint a NFT",
        link: "solana/create-wallet",
        icon: NftIcon,
      },
      {
        name: "Swap Token",
        link: "solana/create-wallet",
        icon: SwapIcon,
      },
      {
        name: "Swap Token",
        link: "solana/create-wallet",
        icon: SwapIcon,
      },
      {
        name: "Mint a NFT",
        link: "solana/create-wallet",
        icon: NftIcon,
      },
      {
        name: "Create Wallet",
        link: "solana/create-wallet",
        icon: WalletIcon,
      },
    ],
  },
  {
    name: "Algorand",
    icon: algorandIcon,
    simulations: [
      {
        name: "Create Wallet",
        link: "algorand/create-wallet",
        icon: WalletIcon,
      },
      {
        name: "Mint a NFT",
        link: "solana/create-wallet",
        icon: NftIcon,
      },
      {
        name: "Swap Token",
        link: "solana/create-wallet",
        icon: SwapIcon,
      },
      {
        name: "Swap Token",
        link: "solana/create-wallet",
        icon: SwapIcon,
      },
      {
        name: "Mint a NFT",
        link: "solana/create-wallet",
        icon: NftIcon,
      },
      {
        name: "Create Wallet",
        link: "solana/create-wallet",
        icon: WalletIcon,
      },
    ],
  },
];
const HomePage = (props: Props) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index: React.SetStateAction<number>) => {
    setTabIndex(index);
  };
  const [blockchainData, setBlockchainData] = React.useState<any>([]);
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
          <Tabs
            index={tabIndex}
            onChange={handleTabsChange}
            my="8"
            variant={"unstyled"}
          >
            <TabList overflowX={"scroll"}>
              {chainSimulations.map((chain, key) => (
                <Tab m="4" p="0" key={key}>
                  <Box
                    w="360px"
                    h="118px"
                    border="1px solid rgba(255, 255, 255, 0.5)"
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
              {chainSimulations.map((chain, key) => (
                <TabPanel key={key}>
                  <Grid
                    templateColumns={{
                      base: "repeat(1, 1fr)",
                      sm: "repeat(1, 1fr)",
                      md: "repeat(3, 1fr)",
                    }}
                    gap={6}
                  >
                    {chain.simulations.map((simulation, key) => (
                      <Link passHref href={`simulation/${simulation.link}`}>
                        <GridItem
                          cursor="pointer"
                          key={key}
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
                    ))}
                  </Grid>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
