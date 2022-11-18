import React, { useEffect } from "react";

import { Box } from "@chakra-ui/react";
import HomePage from "../../components/simulation/homepage";

function SimulationHomePage() {
  return (
    <Box w="100%" h="100vh" bg="#040F03">
      {/* <Box height={'100vh'} bgColor="#010801">
        <Center>
          <Flex gap={3} mt={'5vw'} flexDirection={'column'}>
            {blockchainData.map((blockchain: any) => {
              const { simulations } = blockchain
              return (
                <Box
                  as="article"
                  minW="sm"
                  p="5"
                  borderWidth="1px"
                  rounded="md"
                  key={blockchain.name}
                >
                  <Heading size="md" my="2">
                    <Text
                      fontFamily={'Druk Wide Bold '}
                      fontSize="4xl"
                      color={'green.900'}
                    >
                      {blockchain.name}
                    </Text>
                  </Heading>

                  <Box as="a" color="teal.400" href="#" fontWeight="bold">
                    {simulations.length !== 0 ? (
                      simulations.map((simulation: any) => {
                        return (
                          <Link
                            href={`simulation/${simulation.url.toLowerCase()}`}
                            passHref
                            key={simulation.name}
                          >
                            {simulation.name}
                          </Link>
                        )
                      })
                    ) : (
                      <Text>Coming Soon!</Text>
                    )}
                  </Box>
                </Box>
              )
            })}
          </Flex>
        </Center>
      </Box> */}
      <HomePage />
    </Box>
  );
}

export default SimulationHomePage;
