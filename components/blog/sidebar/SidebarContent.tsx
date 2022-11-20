import { VStack } from '@chakra-ui/react'
import React from 'react'
import { BlogPages } from '../../../src/utils/parse-properties'
import blogsToCategoryMap from '../utils/blogUtils'
import SidebarLink from './SidebarLink'

interface SidebarContentProps {
  blogData: BlogPages[]
  closeDrawer: () => void
}

const SidebarContent = ({ blogData, closeDrawer }: SidebarContentProps) => {
  
  const menuList = blogsToCategoryMap(blogData)

  return (
    <VStack w="100%" alignItems={'left'}>
      <SidebarLink menuList={menuList} closeDrawer={() => closeDrawer()} />
    </VStack>
  )
}

export default SidebarContent
