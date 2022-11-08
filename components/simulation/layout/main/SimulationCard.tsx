import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  List,
  ListIcon,
  ListItem,
  Spacer,
  Text,
} from '@chakra-ui/react'
import Image from 'next/image'
import React, { ReactNode } from 'react'
import { RenderSimulation } from '../../simulations'
import { BlockType, ListType, CardDataType, BodyType } from '../../types'
import { HiHashtag } from 'react-icons/hi'

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

  const renderPoints = (point: string[]) => {
    return point.map((point, index) => {
      return (
        <List key={index} spacing={3}>
          <Flex>
            <ListIcon as={HiHashtag} color="green.500" />
            <ListItem textAlign={'justify'}>{point}</ListItem>
          </Flex>
        </List>
      )
    })
  }

  const renderBody = (body: BodyType[]) => {
    return body.map((item, index) => {
      const { paragraph, pointHeader, points, image } = item
      return (
        <Flex direction={'column'} gap={4} key={index}>
          {paragraph && (
            <Box>
              <Text
                fontSize={{ base: 'md', md: 'lg' }}
                lineHeight={'1.8'}
                textAlign={'justify'}
              >
                {paragraph}
              </Text>
            </Box>
          )}
          <Spacer />
          {image && (
            <Center>
              <Box>
                <Image
                  src={image}
                  height="200px"
                  width="400px"
                  alt={'Fallback image'}
                  style={{ borderRadius: '10px' }}
                />
              </Box>
            </Center>
          )}
          {pointHeader && (
            <Box>
              <Text
                fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
                className="point-header-text"
              >
                {pointHeader}
              </Text>
            </Box>
          )}
          {points && renderPoints(points)}
        </Flex>
      )
    })
  }

  const renderList = (list: ListType[] | undefined): ReactNode => {
    if (list !== undefined) {
      return list.map((item, index) => {
        const { head, body, image, simKey } = item
        return (
          <Box key={index}>
            <Box mb={8}>
              <Text fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }} mb={2}>
                {head}
              </Text>

              {renderBody(body)}

              {simKey && (
                <Box>
                  <RenderSimulation simkey={simKey} />
                </Box>
              )}
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
          <Box mb={2}>
            <Text
              fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
              fontWeight={'bold'}
            >
              {subHeader}
            </Text>
          </Box>
          <Divider mb={4} />

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
          <Center>
            <Box mb={5}>
              <Text
                fontFamily={'Dela Gothic One'}
                fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                bgGradient="linear(to-l, green.100,green.800)"
                bgClip="text"
              >
                {simulationHeader}
              </Text>
            </Box>
          </Center>
          <Box>{renderUiForBlocks(renderBlocks)}</Box>
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
      </Center>
    </>
  )
}

export default SimulationCard
