import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { BlogPages } from '../../src/utils/parse-properties'
import Link from 'next/link'
import { useRouter } from 'next/router'
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
  const router = useRouter()
  const { slug } = router.query

  return (
    <Box w="full">
      {menuList.map((menu, tabkey) => (
        <Box key={tabkey} my="1">
          <Text color="#dad6d6">{menu.category}</Text>
          <Box py="4">
            {menu.blogs.map((blog, key) => (
              <Box key={key} py="1" cursor={'pointer'} onClick={closeDrawer}>
                <Link href={`/blog/${blog.url}`} passHref>
                  <Flex
                    fontSize="14px"
                    key={blog.pageId}
                    fontFamily="Poppins"
                    fontWeight={'600'}
                    px="2"
                    borderRadius={'2'}
                    py="1"
                    bg={slug === blog.url ? '#E2E2E1' : 'transparent'}
                    color={`${slug === blog.url ? '#37352F' : '#FFFFFF'}`}
                    _hover={{
                      bg: '#E2E2E1',
                      color: '#37352F',
                    }}
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
