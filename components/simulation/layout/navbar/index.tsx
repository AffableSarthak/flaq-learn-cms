import {
  Box,
  Text,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Button,
} from '@chakra-ui/react'

import { FiMenu, FiBell, FiChevronDown } from 'react-icons/fi'
import NextLink from 'next/link'

interface MobileProps extends FlexProps {
  onOpen: () => void
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      px={{ base: 2, md: 2 }}
      height="16"
      alignItems="center"
      w="full"
      position={'sticky'}
      top={0}
      zIndex={1000}
      bgGradient="linear(to-l, green.900,green.700)"
      justifyContent={'space-between'}
      boxShadow={'md'}
      {...rest}
    >
      <Flex justifyContent={'center'} alignItems={'center'}>
        <Box>
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onOpen}
            variant="ghost"
            aria-label="open menu"
            icon={<FiMenu />}
          />
        </Box>
        <Box>
          <Text
            mx="5"
            display="flex"
            fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
            fontFamily="Druk Wide Bold "
            colorScheme={'blue'}
            justifyContent="space-between"
          >
            Flaq Academy
          </Text>
        </Box>
      </Flex>

      <HStack spacing={{ base: '0', md: '6' }}>
        {/* <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        /> */}
        <Flex alignItems={'center'}>
          <HStack>
            {/* <Avatar
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
            </Box> */}
            <NextLink href="/simulation" passHref>
              {/* <Link>
                <Heading>Simulation</Heading>
              </Link> */}
              <Button
                bg="#020f02"
                borderRadius={'lg'}
                color="#a6ebc9"
                _hover={{
                  bg: '#a6ebc9',
                  color: '#020f02',
                }}
              >
                <Text as="samp">Learn</Text>
              </Button>
            </NextLink>
          </HStack>
        </Flex>
      </HStack>
    </Flex>
  )
}

export default MobileNav
