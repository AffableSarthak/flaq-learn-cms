import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { BlogPages } from '../../src/utils/parse-properties'
import Link from 'next/link'
import { useRouter } from 'next/router'
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
  const [activeAccordion, setActiveAccordion] = React.useState(0)
  useEffect(() => {
    menuList.forEach((menu, index) => {
      menu.blogs.forEach((blog) => {
        if (blog.pageId === slug) {
          console.log('active', index)
          setActiveAccordion(index)
        }
      })
    })
  }, [activeAccordion, menuList])
  const textColor = useColorModeValue('#FFFFFF', '#37352F')
  return (
    <Box w="full">
      <Accordion defaultIndex={[activeAccordion]} allowMultiple>
        {menuList.map((menu, tabkey) => (
          <AccordionItem key={tabkey}>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {menu.category}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {menu.blogs.map((blog, key) => (
                <Box key={key} cursor={'pointer'} onClick={closeDrawer}>
                  <Link href={`/blog/${blog.url}`}>
                    <Flex
                      fontSize="14px"
                      // color={textColor}
                      key={blog.pageId}
                      fontFamily="Poppins"
                      fontWeight={'600'}
                      px="2"
                      borderRadius={'2'}
                      py="1"
                      bg={`${slug === blog.pageId ? '#E2E2E1' : ''}`}
                      color={`${slug === blog.pageId ? '#37352F' : '#FFFFFF'}`}
                      _hover={{
                        bg: '#E2E2E1',
                        color: '#37352F',
                      }}
                    >
                      <Text px="1">{blog.icon}</Text>
                      <Text>{blog.title}</Text>
                    </Flex>
                  </Link>
                </Box>
              ))}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  )
}

export default SidebarLink
