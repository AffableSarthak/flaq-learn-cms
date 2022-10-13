import {
  Box,
  Flex,
  IconButton,
  Show,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { BlogPages } from "../../src/utils/parse-properties";

import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  VStack,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import SidebarLink from "./SidebarLink";

interface Props {
  onClose: Function;
  isOpen: boolean;
  variant: string;
  blogData: BlogPages[];
  openSidebar: boolean;
  cycleOpenSidebar: ()=>void;
}
const smVariant = { navigation: "drawer", navigationButton: true };
const mdVariant = { navigation: "sidebar", navigationButton: false };
interface SidebarContentProps { 
  blogData: BlogPages[];
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeDrawer:Function;
}
interface MenuListProps { 
  category: string
  blogs: BlogPages[]
}
const SidebarContent = ({
  blogData,
  isSidebarOpen,
  toggleSidebar,
  closeDrawer,
}: SidebarContentProps) => {

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
    menuList.push({category:key, blogs:value})
  })
  console.log(menuList)
  
  return (
    <VStack w="100%" alignItems={"left"}>
      <Flex
        py="4"
        w="100%"
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Show above="md">
          <Link href="/">Flaq Academy</Link>

          <IconButton
            variant={"outline"}
            mx="1"
            onClick={() => toggleSidebar()}
            aria-label="open close drawer"
            icon={<AiOutlineDoubleLeft />}
          />
        </Show>
      </Flex>
      <SidebarLink menuList={menuList} closeDrawer={() => closeDrawer()} />
      {/* {blogData?.map((blog, key) => (
        <Box key={key} cursor={"pointer"} onClick={() => closeDrawer()}>
          <Link href={`/blog/${blog.pageId}`}>
            <Flex
              fontSize="14px"
              color="#37352F"
              key={blog.pageId}
              fontFamily="Segoe UI"
              fontWeight={"600"}
              px="2"
              borderRadius={"2"}
              py="1"
              _hover={{
                bg: "#E2E2E1",
              }}
            >
              <Text px="1">{blog.icon}</Text>
              <Text>{blog.title}</Text>
            </Flex>
          </Link>
        </Box>
      ))} */}
    </VStack>
  );
};
const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0,
      staggerDirection: 1,
    },
  },
};
const SidebarDrawar = ({
  isOpen,
  variant,
  onClose,
  blogData,
  openSidebar,
  cycleOpenSidebar,
}: Props) => {
  return variant === "sidebar" ? (
    <AnimatePresence exitBeforeEnter initial={false}>
      {openSidebar && (
        <motion.aside
          initial={{ width: 0 }}
          animate={{
            width: 305,
            height: "100vh",
          }}
          transition={{ bounce: 0 }}
          exit={{
            width: 0,
            transition: { delay: 0.1, duration: 0.1, bounce: 0 },
          }}
        >
          <motion.div
            className="container"
            style={{
              height: "100vh",
            }}
            initial="closed"
            animate="open"
            exit="closed"
            variants={sideVariants}
          >
            <Box
              px="4"
              bgColor="#FBFBFA"
              borderRight={"2px solid #ebebe1"}
              mx="1"
              left={0}
              w="298px"
              top={0}
              minH="100%"
            >
              <SidebarContent
                closeDrawer={onClose}
                blogData={blogData}
                isSidebarOpen={openSidebar}
                toggleSidebar={cycleOpenSidebar}
              />
            </Box>
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  ) : (
    <Drawer
      size={"full"}
      isOpen={isOpen}
      placement="left"
      onClose={() => onClose()}
    >
      <DrawerOverlay>
        <DrawerContent minH={"100%"}>
          <DrawerCloseButton />
          <DrawerHeader>Flaq Academy</DrawerHeader>
          <DrawerBody  minH={"100%"} p="0">
            <SidebarContent
              isSidebarOpen={openSidebar}
              toggleSidebar={cycleOpenSidebar}
              blogData={blogData}
              closeDrawer={onClose}
            />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};
// TODO: Create a new responsive sidebar component.
interface SidebarProps {
  isSidebarOpen: boolean;
  blogData: BlogPages[];
  toggleSidebar: () => void;
  cycleOpenSidebar: () => void;
  openSidebar: boolean;
}
function SideBar({ blogData, isSidebarOpen, toggleSidebar,cycleOpenSidebar,openSidebar }: SidebarProps) {
  const variants = useBreakpointValue(
    { base: smVariant, md: mdVariant }
  );
  
  return (
    <SidebarDrawar
      cycleOpenSidebar={cycleOpenSidebar}
      openSidebar={openSidebar}
      blogData={blogData}
      variant={variants!.navigation}
      isOpen={isSidebarOpen}
      onClose={toggleSidebar}
    />
  );
}

export default SideBar;
