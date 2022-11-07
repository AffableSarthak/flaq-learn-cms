import { Box, Button, Center, Flex, Spacer, Text } from '@chakra-ui/react'
import Image from 'next/image'
import React, { ReactNode } from 'react'
import { RenderSimulation } from '../../simulations'

import { BlockType, ListType, CardDataType } from '../../types'

type Props = {
  cardData: CardDataType
  simulationHeader: string
  setCardData: (index: number) => void
}

const SimulationCard = ({ cardData, simulationHeader, setCardData }: Props) => {
  const {
    currentSimulation,
    currentSimulationIndex,
    isBackDisabled,
    isNextDisabled,
  } = cardData
  const { renderBlocks } = currentSimulation

  const renderList = (list: ListType[] | undefined): ReactNode => {
    if (list !== undefined) {
      return list.map((item, index) => {
        const { head, body, image, simKey } = item
        return (
          <Box key={index}>
            <Box mt={4} mb={10}>
              <Text fontSize="2xl">{head}</Text>
              <Flex>
                <Box width={image !== undefined ? '60vw' : '100vw'}>
                  <Text>{body}</Text>
                </Box>
                <Spacer />
                {image && (
                  <Box ml={4}>
                    <Image
                      src={image}
                      height="141px"
                      width="248px"
                      alt={head}
                      style={{ borderRadius: '25px' }}
                    />
                  </Box>
                )}
              </Flex>
              {simKey && <RenderSimulation simkey={simKey} />}
            </Box>
          </Box>
        )
      })
    }
  }

  const renderUiForBlocks = (blocks: BlockType[]): ReactNode => {
    return blocks.map((block: BlockType, key) => {
      const { image, subHeader, list } = block
      return (
        <Box key={key}>
          <Box>
            <Text fontSize="4xl">{subHeader}</Text>
          </Box>
          <Box>{renderList(list)}</Box>
        </Box>
      )
    })
  }

  return (
    <>
      <Center>
        <Box
          h="100%"
          w={{ base: '90vw', md: '60vw', lg: '70vw' }}
          boxShadow={'sm'}
          p={5}
        >
          <Box>
            <Text fontSize="6xl">{simulationHeader}</Text>
          </Box>
          <Box>{renderUiForBlocks(renderBlocks)}</Box>
          <Flex bottom={0} mx="auto" justifyContent={'space-between'} py="4">
            <Button
              color={'black'}
              bg={'#a6ebc9'}
              disabled={isBackDisabled}
              onClick={() => setCardData(currentSimulationIndex - 1)}
            >
              Back
            </Button>
            <Button
              color={'black'}
              bg={'#a6ebc9'}
              disabled={isNextDisabled}
              onClick={() => setCardData(currentSimulationIndex + 1)}
            >
              Next
            </Button>
          </Flex>
        </Box>
      </Center>
    </>
  )
}

export default SimulationCard
