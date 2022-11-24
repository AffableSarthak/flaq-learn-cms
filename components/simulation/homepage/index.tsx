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
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Navbar from '../../common/Navbar'
import Image from 'next/image'
import { getBlockchainData } from '../utils/blockchain'
import Footer from '../../common/Footer'
import Link from 'next/link'

type Props = {}

const HomePage = (props: Props) => {
  const [tabIndex, setTabIndex] = useState(0)

  const handleTabsChange = (index: React.SetStateAction<number>) => {
    setTabIndex(index)
  }
  const [chainSimulations, setBlockchainData] = React.useState<any>([])
  useEffect(() => {
    setBlockchainData(getBlockchainData())
    return () => {
      setBlockchainData([])
    }
  }, [])

  return (
    <Box bg="#040F03" maxWidth={'100%'}>
      <Container maxWidth={'1200px'}>
        <Navbar />
        <Box my="8" w="100%">
          <Text
            my="3"
            fontFamily={'Druk Wide Bold'}
            fontWeight={'700'}
            fontSize={{ base: '3xl', md: '6xl' }}
            as="h1"
          >
            <Highlight
              query={'chain'}
              styles={{
                color: '#70FFE9',
                my: '3',
                fontFamily: 'Druk Wide Bold',
                fontWeight: '700',
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
              variant={'unstyled'}
            >
              <TabList overflowX={'scroll'}>
                {chainSimulations.map((chain: any, key: number) => (
                  <Tab m="4" p="0" key={key}>
                    <Box
                      border={'1px solid #70ffe9'}
                      px="8"
                      py="2"
                      bg={`${key === tabIndex ? '#f2f2f2' : '#040F03'}`}
                      color={`${key === tabIndex ? '#3D3D3D' : '#FFFFFF'}`}
                      display={'flex'}
                      alignItems={'center'}
                      justifyContent={'center'}
                      borderRadius={'20px'}
                    >
                      <HStack>
                        <Image src={chain.icon} alt={chain.name} />
                        <Text
                          fontSize={{ base: 'lg', md: 'xl' }}
                          fontFamily={'Druk Wide Bold'}
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
                  fontFamily={'Druk Wide Bold'}
                  fontWeight={'700'}
                  fontSize={{ base: 'xl', md: '2xl' }}
                >
                  <Highlight
                    query={`${chainSimulations[tabIndex].name} blockchain`}
                    styles={{
                      color: '#70FFE9',
                      my: '3',
                      fontFamily: 'Druk Wide Bold',
                      fontWeight: '700',
                      textDecoration: 'underline',
                      textUnderlineOffset: '8px',
                    }}
                  >
                    {`Explore the simulations on the ${chainSimulations[tabIndex].name} blockchain`}
                  </Highlight>
                </Text>
              </Box>
              <TabPanels>
                {chainSimulations.map((chain: any, key: number) => {
                  return chain.simulations.length > 0 ? (
                    <TabPanel key={key}>
                      <Grid
                        templateColumns={{
                          base: 'repeat(1, 1fr)',
                          sm: 'repeat(1, 1fr)',
                          md: 'repeat(3, 1fr)',
                        }}
                        gap={6}
                      >
                        {chain.simulations.map(
                          (simulation: any, key: number) => (
                            <>
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
                                    w={{ base: '306px', md: '384px' }}
                                    h={{ base: '179px', md: '218px' }}
                                    display={'flex'}
                                    alignItems={'center'}
                                    justifyContent={'center'}
                                    borderRadius={'20px'}
                                  >
                                    <VStack>
                                      <Image
                                        src={simulation.icon}
                                        alt={simulation.name}
                                      />
                                      <Text
                                        fontFamily={'Poppins'}
                                        fontSize={{ md: 'lg', base: 'md' }}
                                        fontWeight={700}
                                      >
                                        {simulation.name}
                                      </Text>
                                    </VStack>
                                  </GridItem>
                                </Link>
                              ) : (
                                <GridItem
                                  border="1px solid #000000"
                                  bg="#1A1A1A5C"
                                  w={{ base: '306px', md: '384px' }}
                                  h={{ base: '179px', md: '218px' }}
                                  display={'flex'}
                                  alignItems={'center'}
                                  justifyContent={'center'}
                                  borderRadius={'20px'}
                                >
                                  <VStack>
                                    <Image
                                      src={simulation.icon}
                                      alt={simulation.name}
                                    />
                                    <Text
                                      fontFamily={'Poppins'}
                                      fontSize={{ md: 'lg', base: 'md' }}
                                      fontWeight={700}
                                    >
                                      {simulation.name}
                                    </Text>
                                    <Text>Coming soon</Text>
                                  </VStack>
                                </GridItem>
                              )}
                            </>
                          ),
                        )}
                      </Grid>
                    </TabPanel>
                  ) : (
                    <TabPanel key={key}>
                      <Box key={key} w="100%" h="100%">
                        <Text
                          lineHeight={'5.7rem'}
                          fontFamily={'Druk Wide Bold'}
                          fontWeight={'600'}
                          fontSize={{ base: '2xl', md: '4xl' }}
                          as="h2"
                        >
                          Coming Soon...
                        </Text>
                      </Box>
                    </TabPanel>
                  )
                })}
              </TabPanels>
            </Tabs>
          )}
        </Box>
        <Footer />
      </Container>
    </Box>
  )
}

export default HomePage
