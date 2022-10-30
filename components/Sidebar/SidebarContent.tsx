import { VStack, Flex } from "@chakra-ui/react";
import React from "react";
import { BlogPages } from "../../src/utils/parse-properties";
import SidebarLink from "./SidebarLink";

interface SidebarContentProps {
  blogData: BlogPages[];
  closeDrawer: () => void;
}

interface MenuListProps {
  category: string;
  blogs: BlogPages[];
}

const SidebarContent = ({ blogData, closeDrawer }: SidebarContentProps) => {
  // this utils groups the blog data by category
  const groupByToMap = <T, Q>(
    array: T[],
    predicate: (value: T, index: number, array: T[]) => Q
  ) =>
    array.reduce((map, value, index, array) => {
      const key = predicate(value, index, array);
      map.get(key)?.push(value) ?? map.set(key, [value]);
      return map;
    }, new Map<Q, T[]>());

  const menu = groupByToMap(blogData, (v) => v.category);

  const menuList: MenuListProps[] = [];
  menu.forEach((value, key) => {
    // sort the blogs by created_time
    menuList.push({
      category: key,
      blogs: value.sort(function (a, b) {
        var dateA = new Date(a.created_time).getTime();
        var dateB = new Date(b.created_time).getTime();
        return dateA > dateB ? 1 : -1;
      }),
    });
  });
  return (
    <VStack w="100%" alignItems={"left"}>
      <SidebarLink menuList={menuList} closeDrawer={() => closeDrawer()} />
    </VStack>
  );
};

export default SidebarContent;
