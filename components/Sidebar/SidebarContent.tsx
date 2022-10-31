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
  priority: number;
}

const category_utils = (inpCategory: string) => {
  const priority = parseInt(inpCategory.split(" ").slice(-1).join(" "));
  if (isNaN(priority)) {
    return inpCategory;
  }
  return inpCategory.split(" ").slice(0, -1).join(" ");
};

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
    // sort the blogs by published_on date and priority
    menuList.push({
      priority: parseInt(key.split(" ").slice(-1).join(" ")) || 5000,
      category: category_utils(key),
      blogs: value.sort(function (a, b) {
        var dateA = new Date(a.published_on).getTime();
        var dateB = new Date(b.published_on).getTime();
        return dateA > dateB ? 1 : -1;
      }),
    });
  });

  // sort the menuList by priority
  menuList.sort(function (a, b) {
    return a.priority > b.priority ? 1 : -1;
  });

  return (
    <VStack w="100%" alignItems={"left"}>
      <SidebarLink menuList={menuList} closeDrawer={() => closeDrawer()} />
    </VStack>
  );
};

export default SidebarContent;
