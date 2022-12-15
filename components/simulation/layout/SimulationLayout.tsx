import {
  Box,
  BoxProps,
  Button,
  CloseButton,
  Container,
  Divider,
  Drawer,
  DrawerContent,
  Flex,
  HStack,
  Text,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";
import Footer from "../../common/Footer";
import Header from "../../common/Header";
import {
  CardDataType,
  SimulationBlockType,
  SimulationPageType,
} from "../types";
import SimulationCard from "./main/SimulationCard";
import demoSimulationImg from "../../../public/img/simulations/demo-simulation-img.svg";
function SimulationLayout(props: SimulationPageType) {
  const { simulationData, blockchain } = props;
  console.log(blockchain);
  // State for the current simulation.
  const [cardData, setCard] = React.useState<CardDataType>({
    currentSimulation: simulationData[0],
    isBackDisabled: true,
    isNextDisabled: false,
    currentSimulationIndex: 0,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  // Callback to set the current simulation.
  const setCardData = useCallback(
    (index: number) => {
      setCard({
        currentSimulation: simulationData[index],
        isBackDisabled: index === 0,
        isNextDisabled: index === simulationData.length - 1,
        currentSimulationIndex: index,
      });
    },
    [simulationData]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [cardData]);

  return (
    <Box bg="#040F03">
      <Box fontFamily={"Nunito Sans"} minH="100vh" bg="#040F03 ">
        {/* <Button onClick={() => onOpen()}>Open</Button> */}
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="md"
        >
          <DrawerContent>
            <SidebarContent
              onClose={onClose}
              simulationData={simulationData}
              setCardData={setCardData}
              cardData={cardData}
            />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}

        <Header
          showSearch={false}
          showNavlinks={false}
          showMenu={false}
          homeLink={"/simulation"}
          secondaryLink={{
            name: "Learn Web3",
            link: "/",
          }}
        />

        <Divider />
        <Flex direction={"row"}>
          <Box mx={{ base: "1", md: "10" }}>
            <SidebarContent
              onClose={() => onClose}
              display={{ base: "none", md: "block" }}
              simulationData={simulationData}
              setCardData={setCardData}
              cardData={cardData}
            />
          </Box>
          <Box h="100%">
            <Box h="100%" p="4">
              <SimulationCard
                cardData={cardData}
                setCardData={setCardData}
                blockchain={blockchain}
              />
            </Box>
          </Box>
        </Flex>
      </Box>
      <Container mt="0" px="0" maxW="100vw">
        <Footer />
      </Container>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  simulationData: SimulationBlockType[];
  setCardData: (index: number) => void;
  cardData: CardDataType;
}

const SidebarContent = ({
  onClose,
  simulationData,
  cardData,
  setCardData,
  ...rest
}: SidebarProps) => {
  return (
    <>
      <Box
        transition="3s ease"
        w={{ base: "full", md: 64 }}
        pos="relative"
        h="full"
        bg="#040F03"
        {...rest}
        boxShadow="2xl"
        p={4}
      >
        <Flex alignItems="right" mx="8" justifyContent="flex-end">
          <CloseButton
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
            mb={{ base: "4" }}
          />
        </Flex>
        <Box>
          <Image src={demoSimulationImg.src} alt="demo" />
          {/* <Text
            mt="4"
            textDecoration={"underline"}
            fontWeight={700}
            fontSize={"1.2rem"}
            color={"#B5E8CC"}
          >
            WALLET CREATION
          </Text> */}
        </Box>
        {simulationData.map((simulation, index) => {
          return (
            <>
              <Box my="6" onClick={() => setCardData(index)} cursor="pointer">
                {cardData.currentSimulationIndex === index ? (
                  <HStack gap="2">
                    <Text
                      as="span"
                      height="10px"
                      width="10px"
                      backgroundColor="#B5E8CC"
                      borderRadius="50%"
                      display="inline-block"
                      color={"#040F03"}
                    ></Text>{" "}
                    <Text
                      fontFamily={"'Poppins'"}
                      fontSize={"1rem"}
                      fontWeight={600}
                      textTransform="uppercase"
                      color="#F2FFEA"
                    >
                      {simulation.title}
                    </Text>
                  </HStack>
                ) : (
                  <Text
                    fontFamily={"'Poppins'"}
                    fontSize={"1rem"}
                    fontWeight={600}
                    color="#9999A5"
                  >
                    {simulation.title}
                  </Text>
                )}
              </Box>
              {/* <Box
                maxW={{ base: "full", md: "xs" }}
                rounded="md"
                p={4}
                my={4}
                cursor={"pointer"}
                borderWidth={
                  cardData.currentSimulationIndex === index ? "none" : "0.5px"
                }
                key={`${simulation.title}_${index}`}
                bgGradient={
                  cardData.currentSimulationIndex === index
                    ? "linear(to-l, green.900,green.700)"
                    : ""
                }
                onClick={() => setCardData(index)}
              >
                <Flex fontSize={"md"} fontWeight="bold">
                  <Text mr={2}>{index + 1}.</Text>
                  <Text>{simulation.title}</Text>
                </Flex>
              </Box> */}
            </>
          );
        })}
      </Box>
    </>
  );
};

export default SimulationLayout;
