import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { simulationProps } from "./SimulationProps";

type Props = {
  currentSimulation: simulationProps;
};

const SimulationCard = ({ currentSimulation }: Props) => {
  return (
    <Box bg="#F8F9FA" h="100%" boxShadow={"sm"} m="4">
      <Flex justifyContent={"center"} alignItems="center">
        {currentSimulation.name}
      </Flex>
    </Box>
  );
};

export default SimulationCard;
