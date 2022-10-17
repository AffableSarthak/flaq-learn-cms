import { Box, Flex, Icon, IconButton, Show, Text, useColorModeValue } from '@chakra-ui/react'
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
  const [openSidebar, cycleOpenSidebar] = useCycle(true, false)
  const bgColor = useColorModeValue("#2F3437", "#2F3437");
  const textColor = useColorModeValue("#FBFBFA", "#2F3437");
  return (
    <Box position={"relative"} bg={bgColor} color={textColor}>
      {!openSidebar && (
        <Show above="md">
          <IconButton
            position="static"
            variant={"outline"}
            mx="1"
            onClick={() => cycleOpenSidebar()}
            aria-label="open close drawer"
            icon={<AiOutlineDoubleRight />}
          />
        </Show>
      )}

      <Flex flexDirection={{ base: "column", md: "row", lg: "row" }}>
        <Box
          fontFamily={"Poppins"}
          position={"relative"}
          top={0}
          left={0}
          zIndex={1}
        >
          <SideBar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            blogData={blogData}
            cycleOpenSidebar={cycleOpenSidebar}
            openSidebar={openSidebar}
          />

          <Box flex="1" mt="1">
            <Flex alignItems="center">
              <Show below="md">
                <IconButton
                  position={'fixed'}
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

        <Box mt={!openSidebar?"0":"6"} h="100vh" overflowY="scroll" flex="1">
          {children}
        </Box>
      </Flex>
    </Box>
  );
}

export default Layout
