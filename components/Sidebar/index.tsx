import React from 'react'
import { BlogPages } from '../../src/utils/parse-properties'
import UniversalDrawer from './UniversalDrawer'

interface SidebarProps {
  blogData: BlogPages[]
}

function SideBar({
  blogData,
}: SidebarProps) {
  return (
   <UniversalDrawer blogData={blogData} />
  )
}

export default SideBar
