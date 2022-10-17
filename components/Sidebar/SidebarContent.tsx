import { VStack, Flex} from '@chakra-ui/react'
import React from 'react'
import { BlogPages } from '../../src/utils/parse-properties'
import SidebarLink from './SidebarLink'

interface SidebarContentProps {
  blogData: BlogPages[];
  closeDrawer: () => void;
}

interface MenuListProps {
  category: string
  blogs: BlogPages[]
}

const SidebarContent = ({
  blogData,
  closeDrawer,
}: SidebarContentProps) => {
  const groupByToMap = <T, Q>(
    array: T[],
    predicate: (value: T, index: number, array: T[]) => Q,
  ) =>
    array.reduce((map, value, index, array) => {
      const key = predicate(value, index, array)
      map.get(key)?.push(value) ?? map.set(key, [value])
      return map
    }, new Map<Q, T[]>())

  const menu = groupByToMap(blogData, (v) => v.category)

  const menuList: MenuListProps[] = []
  menu.forEach((value, key) => {
    menuList.push({ category: key, blogs: value })
  })

  return (
    <VStack w="100%" alignItems={'left'}>
      <Flex
        py="4"
        w="100%"
        justifyContent={'space-between'}
        alignItems="center"
      >
      </Flex>
      <SidebarLink menuList={menuList} closeDrawer={() => closeDrawer()} />
    </VStack>
  )
}

export default SidebarContent
