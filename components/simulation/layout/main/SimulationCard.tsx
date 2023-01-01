import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import React from "react";
import RenderSimulation from "../../simulations";
import { Blockchains, CardDataType } from "../../types";
import RenderBlock from "./RenderBlock";

type Props = {
  cardData: CardDataType;
  setCardData: (index: number) => void;
  blockchain: Blockchains;
};

const SimulationCard = ({ cardData, setCardData, blockchain }: Props) => {
  const {
    currentSimulation,
    currentSimulationIndex,
    isBackDisabled,
    isNextDisabled,
  } = cardData;
  const { block, title, simKey } = currentSimulation;

  return (
    <>
      <Center>
        <Box w={{ base: "90vw", md: "60vw", lg: "70vw" }} boxShadow={"sm"}>
          <Box mb={4}>
            {/* Main Header */}

            <Box mb={5}>
              <Text
                fontFamily={"Druk Wide Bold "}
                fontSize={{ base: "2rem", md: "2.2rem", lg: "2.5rem" }}
                textAlign={"left"}
                color={"#B5E8CC"}
              >
                {title}
              </Text>
            </Box>

            {/* Render Blocks */}
            <Box>{<RenderBlock block={block} />}</Box>

            {/* Simulation */}
            <>
              {" "}
              {simKey ? (
                <RenderSimulation simKey={simKey} blockchain={blockchain} />
              ) : (
                <></>
              )}
            </>
          </Box>
          <Box>
            {/* Nav */}
            <Flex bottom={0} mx="auto" justifyContent={"space-between"} py="4">
              <Button
                variant={"primarybtn"}
                disabled={isBackDisabled}
                onClick={() => setCardData(currentSimulationIndex - 1)}
              >
                Back
              </Button>
              <Button
                variant={"primarybtn"}
                disabled={isNextDisabled}
                onClick={() => setCardData(currentSimulationIndex + 1)}
              >
                Next
              </Button>
            </Flex>
          </Box>
        </Box>
      </Center>
    </>
  );
};

export default SimulationCard;
