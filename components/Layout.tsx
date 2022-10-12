import { Box, Flex, Icon, IconButton, Show, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BlogPages } from '../src/utils/parse-properties'
import SideBar from './Sidebar'
import { AiOutlineDoubleRight } from 'react-icons/ai'
function Layout({
  children,
  blogData,
}: {
  children: React.ReactNode
  blogData: BlogPages[]
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)
  return (
    <div className="flex-container">
      <div>
        <SideBar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          blogData={blogData}
        />

        <Box flex="1" px="1">
          <Flex py="4" alignItems="center">
            <Show below="md">
              <IconButton
                variant={'outline'}
                mx="1"
                onClick={() => toggleSidebar()}
                aria-label="open close drawer"
                icon={<AiOutlineDoubleRight />}
              />
            </Show>
          </Flex>
        </Box>
      </div>

      <div className="flex-item">{children}</div>
    </div>
  )
}

export default Layout
