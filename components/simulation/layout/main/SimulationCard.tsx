import { Box, Button, Center, Divider, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { renderSimulation } from '../../simulations'
import { CardDataType } from '../../types'
import RenderBlock from './RenderBlock'

type Props = {
  cardData: CardDataType
  setCardData: (index: number) => void
  blockchain: string
}

const SimulationCard = ({ cardData, setCardData, blockchain }: Props) => {
  const {
    currentSimulation,
    currentSimulationIndex,
    isBackDisabled,
    isNextDisabled,
  } = cardData
  const { block, title, simKey } = currentSimulation

  return (
    <>
      <Center>
        <Box w={{ base: '90vw', md: '60vw', lg: '70vw' }} boxShadow={'sm'}>
          <Box mb={4}>
            {/* Main Header */}
            <Center>
              <Box mb={5}>
                <Text
                  fontFamily={'Dela Gothic One'}
                  fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
                  bgGradient="linear(to-l, green.100,green.800)"
                  bgClip="text"
                >
                  {title}
                </Text>
              </Box>
            </Center>

            <Divider />

            {/* Render Blocks */}
            <Box>{<RenderBlock block={block} />}</Box>

            {/* Simulation */}
            <> {simKey ? renderSimulation(simKey, blockchain) : <></>}</>
          </Box>
          <Box>
            {/* Nav */}
            <Flex bottom={0} mx="auto" justifyContent={'space-between'} py="4">
              <Button
                variant={'primarybtn'}
                disabled={isBackDisabled}
                onClick={() => setCardData(currentSimulationIndex - 1)}
              >
                Back
              </Button>
              <Button
                variant={'primarybtn'}
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
  )
}

export default SimulationCard
