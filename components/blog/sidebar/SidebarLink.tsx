import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { BlogPages, getBlogUrl } from '../../../src/utils/parse-properties'
import Link from 'next/link'
import { BsPen } from 'react-icons/bs'
interface MenuListProps {
  category: string
  blogs: BlogPages[]
}
const SidebarLink = ({
  menuList,
  closeDrawer,
}: {
  menuList: MenuListProps[]
  closeDrawer: () => void
}) => {
  return (
    <Box w="full">
      {menuList.map((menu, tabkey) => (
        <Box key={tabkey} my="1">
          <Text
            fontSize={'xs'}
            textAlign={'center'}
            fontWeight={'600'}
            backgroundColor="#020F02"
            py={'1'}
            borderRadius={'sm'}
            backdropFilter="blur(100px)"
          >
            {menu.category}
          </Text>
          <Box pb="2">
            {menu.blogs.map((blog, key) => (
              <Box key={key} py="1" cursor={'pointer'} onClick={closeDrawer}>
                <Link
                  href={`/${menu.category
                    .toLowerCase()
                    .split(' ')
                    .join('-')}/${getBlogUrl(blog.url)}`}
                  passHref
                >
                  <Flex
                    fontSize="14px"
                    key={blog.pageId}
                    fontFamily="Poppins"
                    fontWeight={'600'}
                    px="2"
                    borderRadius={'50'}
                    py="1"
                  >
                    {blog.icon ? (
                      <Text px="1">{blog.icon}</Text>
                    ) : (
                      <Box p="1.5">
                        <BsPen />
                      </Box>
                    )}
                    <Text>{blog.title}</Text>
                  </Flex>
                </Link>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default SidebarLink
