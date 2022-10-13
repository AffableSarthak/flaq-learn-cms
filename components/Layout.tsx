import { Box, Flex, Icon, IconButton, Show, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BlogPages } from '../src/utils/parse-properties'
import SideBar from './Sidebar'
import { AiOutlineDoubleRight } from 'react-icons/ai'
import { useCycle } from 'framer-motion'
function Layout({
  children,
  blogData,
}: {
  children: React.ReactNode
  blogData: BlogPages[]
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)
  const [openSidebar, cycleOpenSidebar] = useCycle(true, false);
  return (
    <div>
      {!openSidebar && (
        <Show above="md">
          <IconButton
            variant={"outline"}
            mx="1"
            onClick={() => cycleOpenSidebar()}
            aria-label="open close drawer"
            icon={<AiOutlineDoubleRight />}
          />
        </Show>
      )}

      <Flex >
        <Box height="100vh" minH="100vh" position={'relative'} top={0} left={0} zIndex={1 }>
          <SideBar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            blogData={blogData}
            cycleOpenSidebar={cycleOpenSidebar}
            openSidebar={openSidebar}
          />

          <Box flex="1" px="1">
            <Flex py="4" alignItems="center">
              <Show below="md">
                <IconButton
                  variant={"outline"}
                  mx="1"
                  onClick={() => toggleSidebar()}
                  aria-label="open close drawer"
                  icon={<AiOutlineDoubleRight />}
                />
              </Show>
            </Flex>
          </Box>
        </Box>

        <Box h="100vh" overflowY="scroll" flex="1">{children}</Box>
      </Flex>
    </div>
  );
}

export default Layout
