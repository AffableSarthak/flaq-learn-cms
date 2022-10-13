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
  toggleSidebar: ()=>void;
}
const SidebarContent = ({
  blogData,
  isSidebarOpen,
  toggleSidebar,
}: SidebarContentProps) => {
  return (
    <VStack w="100%">
      <Flex
        py="4"
        w="100%"
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Link href="/">Flaq Academy</Link>
        <Show above="md">
          <IconButton
            variant={"outline"}
            mx="1"
            onClick={() => toggleSidebar()}
            aria-label="open close drawer"
            icon={<AiOutlineDoubleLeft />}
          />
        </Show>
      </Flex>
      {blogData?.map((blog) => (
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
          <Link href={`/blog/${blog.pageId}`}>{blog.title}</Link>
        </Flex>
      ))}
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
      staggerChildren: 0.2,
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
    <AnimatePresence>
      {openSidebar && (
        <motion.aside
          initial={{ width: 0 }}
          animate={{
            width: 300,
          }}
          exit={{
            width: 0,
            transition: { delay: 0.7, duration: 0.3 },
          }}
        >
          <motion.div
            className="container"
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
          <DrawerBody minW={"85%"} w="85%" minH={"100%"} p="0">
            <SidebarContent
              isSidebarOpen={openSidebar}
              toggleSidebar={cycleOpenSidebar}
              blogData={blogData}
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
