import React from 'react'
import { CloseButton, Flex, Box } from '@chakra-ui/react'

interface Props { }

const SidebarContent = () => {
  return (
    <>
      <Box
        transition="3s ease"
        borderRight="1px"
        w={{ base: 'full', md: 64 }}
        pos="fixed"
        h="full"
      >
        <Flex alignItems="right" mx="8" justifyContent="flex-end">
          <CloseButton
            color="#000000"
            display={{ base: 'flex', md: 'none' }}
          // onClick={onClose}
          />
        </Flex>
      </Box>
    </>
  )
}

export default SidebarContent
