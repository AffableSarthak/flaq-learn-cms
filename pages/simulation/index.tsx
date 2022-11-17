import React, { useEffect } from 'react'

import { Center, Text, Box, Heading, Flex } from '@chakra-ui/react'
import { getBlockchainData } from '../../components/simulation/utils/blockchain'
import Link from 'next/link'

function SimulationHomePage() {
  const [blockchainData, setBlockchainData] = React.useState<any>([])
  useEffect(() => {
    setBlockchainData(getBlockchainData())
    return () => {
      setBlockchainData([])
    }
  }, [])

  return (
    <>
      <Box height={'100vh'} bgColor="#010801">
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
                      fontFamily={'Dela Gothic One'}
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
      </Box>
    </>
  )
}

export default SimulationHomePage
