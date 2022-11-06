import {
  Avatar,
  Box,
  Text,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  VStack,
} from '@chakra-ui/react'

import { FiMenu, FiBell, FiChevronDown } from 'react-icons/fi'

interface MobileProps extends FlexProps {
  onOpen: () => void
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      px={{ base: 4, md: 4 }}
      height="16"
      alignItems="center"
      justifyContent="space-between"
      w="full"
      position={'sticky'}
      top={0}
      zIndex={1}
      bg={'green.900'}
      boxShadow={'md'}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display="flex"
        fontSize="2xl"
        fontFamily="Nunito Sans"
        fontWeight="bold"
      >
        Flaq
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <HStack>
            <Avatar
              size={'sm'}
              src={'https://avatars.githubusercontent.com/u/56780589?v=4'}
            />
            <VStack
              display={{ base: 'none', md: 'flex' }}
              alignItems="flex-start"
              spacing="1px"
              ml="2"
            >
              <Text fontSize="sm">Sagar Gajare</Text>
              <Text fontSize="xs">Frontend Dev</Text>
            </VStack>
            <Box display={{ base: 'none', md: 'flex' }}>
              <FiChevronDown />
            </Box>
          </HStack>
        </Flex>
      </HStack>
    </Flex>
  )
}

export default MobileNav
