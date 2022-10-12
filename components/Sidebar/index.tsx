import {
  Box,
  Flex,
  IconButton,
  Show,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { BlogPages } from '../../src/utils/parse-properties'

import {
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerBody,
  DrawerContent,
  VStack,
} from '@chakra-ui/react'
import { AiOutlineDoubleLeft } from 'react-icons/ai'

interface Props {
  onClose: Function
  isOpen: boolean
  variant: string
  blogData: BlogPages[]
}
const smVariant = { navigation: 'drawer', navigationButton: true }
const mdVariant = { navigation: 'sidebar', navigationButton: false }

const SidebarContent = ({ blogData }: { blogData: BlogPages[] }) => {
  return (
    <VStack w="100%">
      <Flex
        py="4"
        w="100%"
        justifyContent={'space-between'}
        alignItems="center"
      >
        <Link href="/">
          <Text
            ml={4}
            p={1}
            fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
            fontWeight={900}
            _hover={{
              bg: '#E2E2E1',
              cursor: 'pointer',
              borderRadius: 'md',
            }}
          >
            Flaq Academy
          </Text>
        </Link>
        {/* <Show above="md">
          <IconButton
            variant={'outline'}
            mx="1"
            aria-label="open close drawer"
            icon={<AiOutlineDoubleLeft />}
          />
        </Show> */}
      </Flex>
      {blogData?.map((blog) => (
        <Flex
          fontSize="14px"
          color="#37352F"
          key={blog.pageId}
          // fontFamily="Segoe UI"
          fontWeight={'700'}
          px="2"
          borderRadius={'2'}
          py="1"
          _hover={{
            bg: '#E2E2E1',
            cursor: 'pointer',
            borderRadius: 'md',
          }}
        >
          <Text px="1">{blog.icon}</Text>
          <Link href={`/blog/${blog.pageId}`}>
            <Text>{blog.title}</Text>
          </Link>
        </Flex>
      ))}
    </VStack>
  )
}

const SidebarDrawar = ({ isOpen, variant, onClose, blogData }: Props) => {
  return variant === 'sidebar' ? (
    <Box
      px="4"
      bgColor="#FBFBFA"
      borderRight={'2px solid #ebebe1'}
      mx="1"
      left={0}
      w="298px"
      top={0}
      minH="100%"
    >
      <SidebarContent blogData={blogData} />
    </Box>
  ) : (
    <Drawer
      size={'full'}
      isOpen={isOpen}
      placement="left"
      onClose={() => onClose()}
    >
      <DrawerOverlay>
        <DrawerContent minH={'100%'}>
          <DrawerCloseButton />
          <DrawerBody minW={'85%'} w="85%" minH={'100%'} p="0">
            <SidebarContent blogData={blogData} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}
interface SidebarProps {
  isSidebarOpen: boolean
  blogData: BlogPages[]
  toggleSidebar: () => void
}
function SideBar({ blogData, isSidebarOpen, toggleSidebar }: SidebarProps) {
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant })

  return (
    <SidebarDrawar
      blogData={blogData}
      variant={variants!.navigation}
      isOpen={isSidebarOpen}
      onClose={toggleSidebar}
    />
  )
}

export default SideBar
