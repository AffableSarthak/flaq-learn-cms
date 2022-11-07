import {
  Box,
  BoxProps,
  CloseButton,
  Divider,
  Drawer,
  DrawerContent,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { CardDataType, SimulationPageType, SimulationType } from '../types'
import SimulationCard from './main/SimulationCard'
import MobileNav from './navbar'

function SimulationLayout(props: SimulationPageType) {
  const { simulationData, simulationHeader } = props
  const [currentSimulation, setCurrentSimulation] = React.useState<
    SimulationType
  >(simulationData[0])
  const [cardData, setCard] = React.useState<CardDataType>({
    currentSimulation: simulationData[0],
    isBackDisabled: true,
    isNextDisabled: false,
    currentSimulationIndex: 0,
  })

  const { isOpen, onOpen, onClose } = useDisclosure()

  const setCardData = useCallback(
    (index: number) => {
      setCard({
        currentSimulation: simulationData[index],
        isBackDisabled: index === 0,
        isNextDisabled: index === simulationData.length - 1,
        currentSimulationIndex: index,
      })
    },
    [simulationData],
  )

  return (
    <Box fontFamily={'Nunito Sans'} minH="100vh" bg="#020f02">
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
      <MobileNav onOpen={onOpen} />
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
        simulationData={simulationData}
        setCardData={setCardData}
        cardData={cardData}
      />
      <Box h="100%" ml={{ base: 0, md: '64' }}>
        <Box h="100%" p="4">
          <SimulationCard
            simulationHeader={simulationHeader}
            cardData={cardData}
            setCardData={setCardData}
          />
        </Box>
      </Box>
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
  simulationData: SimulationType[]
  setCardData: (index: number) => void
  cardData: CardDataType
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
        w={{ base: 'full', md: 64 }}
        pos="fixed"
        h="full"
        borderRight={'1px'}
        borderColor={'whiteAlpha.200'}
        {...rest}
        p={4}
      >
        <Flex alignItems="right" mx="8" justifyContent="flex-end">
          <CloseButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onClose}
          />
        </Flex>
        {simulationData.map((simulation, index) => {
          return (
            <Box
              as="div"
              maxW="xs"
              p="4"
              my={4}
              borderWidth="0.5px"
              borderColor={'#a6ebc9'}
              rounded="md"
              cursor={'pointer'}
              key={`${simulation.name}_${index}`}
              bg={cardData.currentSimulationIndex === index ? 'green.800' : ''}
              onClick={() => setCardData(index)}
            >
              <Flex>
                <Text fontSize={'md'} fontWeight="bold">
                  {index + 1}. {simulation.name}
                </Text>
              </Flex>
            </Box>
          )
        })}
      </Box>
      <Divider />
    </>
  )
}

export default SimulationLayout
