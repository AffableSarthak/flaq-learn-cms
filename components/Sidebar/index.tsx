import { useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import { BlogPages } from '../../src/utils/parse-properties'
import DesktopSidebar from './DesktopSidebar'

import MobileDrawer from './MobileDrawer'

interface Props {
  onClose: Function
  isOpen: boolean
  variant: string
  blogData: BlogPages[]
  openSidebar: boolean
  cycleOpenSidebar: () => void
}
const smVariant = { navigation: 'drawer', navigationButton: true }
const mdVariant = { navigation: 'sidebar', navigationButton: false }

const SidebarDrawar = ({
  isOpen,
  variant,
  onClose,
  blogData,
  openSidebar,
  cycleOpenSidebar,
}: Props) => {
  return variant === 'sidebar' ? (
    <DesktopSidebar
      blogData={blogData}
      cycleOpenSidebar={cycleOpenSidebar}
      onClose={onClose}
      openSidebar={openSidebar}
    />
  ) : (
    <MobileDrawer
      isOpen={isOpen}
      onClose={onClose}
      variant={variant}
      blogData={blogData}
      openSidebar={openSidebar}
      cycleOpenSidebar={cycleOpenSidebar}
    />
  )
}
interface SidebarProps {
  isSidebarOpen: boolean
  blogData: BlogPages[]
  toggleSidebar: () => void
  cycleOpenSidebar: () => void
  openSidebar: boolean
}
function SideBar({
  blogData,
  isSidebarOpen,
  toggleSidebar,
  cycleOpenSidebar,
  openSidebar,
}: SidebarProps) {
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant })

  return (
    <SidebarDrawar
      cycleOpenSidebar={cycleOpenSidebar}
      openSidebar={openSidebar}
      blogData={blogData}
      variant={variants!.navigation}
      isOpen={isSidebarOpen}
      onClose={toggleSidebar}
    />
  )
}

export default SideBar
