import { Box, Flex, useColorModeValue } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'
import { BlogPages } from '../../src/utils/parse-properties'
import ReadProgressBar from './ReadProgressBar'
import SideBar from './sidebar'

function BlogLayout({
  children,
  blogData,
}: {
  children: React.ReactNode
  blogData: BlogPages[]
}) {
  const textColor = useColorModeValue('#FBFBFA', '#D0D1D2')
  return (
    <>
      <Box position={'relative'} bg="#D0D1D2" color={textColor}>
        <Flex flexDirection={{ base: 'column', md: 'row', lg: 'row' }}>
          <Box
            fontFamily={'Nunito Sans'}
            position={'relative'}
            top={0}
            left={0}
            zIndex={1}
          >
            <SideBar blogData={blogData} />
          </Box>
          <ReadProgressBar />
          <div
            style={{
              height: '100vh',
              overflow: 'auto',
              width: '100%',
            }}
            id="box"
          >
            {children}
          </div>
        </Flex>
      </Box>
    </>
  )
}

export default BlogLayout
