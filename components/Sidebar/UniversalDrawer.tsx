import {
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
  Drawer,
  useDisclosure,
  DrawerCloseButton,
  IconButton,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { BlogPages } from "../../src/utils/parse-properties";
import SidebarContent from "./SidebarContent";

type Props = {
  blogData: BlogPages[];
};

const UniversalDrawer = ({ blogData }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box position="fixed">
        <IconButton
          position="static"
          variant={"unstyled"}
          mx="1"
          onClick={onOpen}
          fontSize="4xl"
          aria-label="open close drawer"
          icon={<AiOutlineDoubleRight />}
        />
      </Box>

      <Drawer
        variant={"mainsidebar"}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader>
            <Link href={"/"}>Flaq Academy</Link>
          </DrawerHeader>

          <DrawerBody>
            <SidebarContent blogData={blogData} closeDrawer={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UniversalDrawer;
