import React, { ReactNode } from 'react'
import {
  CloseButton,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  Button,
  Box,
} from '@chakra-ui/react'

import { simulationProps } from './SimulationProps'
import { MobileNav, NavItem } from './navbar'

export default function SidebarWithNavbar({
  children,
  simulationData,
}: {
  children: ReactNode
  simulationData: simulationProps[]
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box
      color="#5c5c5c"
      fontFamily={'Nunito Sans'}
      minH="100vh"
      bg={useColorModeValue('gray.100', '#ffffff')}
    >
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
          <SidebarContent onClose={onClose} simulationData={simulationData} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
        simulationData={simulationData}
      />
      <Box h="100%" ml={{ base: 0, md: 64 }}>
        <Box h="100%" p="4">
          {children}
        </Box>

        {/* <Flex
          transform={"translateX(-50%)"}
          left={{ base: "50%", md: "58%" }}
          bottom={0}
          mx="auto"
          w={{ base: "50%", md: "40%" }}
          position={"fixed"}
          justifyContent={"space-between"}
          py="4"
        >
          <Button colorScheme="twitter">Back</Button>
          <Button colorScheme="twitter">Next</Button>
        </Flex> */}
      </Box>
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
  simulationData: simulationProps[]
}

const SidebarContent = ({ onClose, simulationData, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', '#F8F9FA')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 64 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex alignItems="right" mx="8" justifyContent="flex-end">
        <CloseButton
          color="#000000"
          display={{ base: 'flex', md: 'none' }}
          onClick={onClose}
        />
      </Flex>
      {simulationData.map((simulation, key) => (
        <NavItem key={key} linkkey={key} url={simulation.slug}>
          {simulation.name}
        </NavItem>
      ))}
    </Box>
  )
}
