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
import { GiHamburgerMenu } from "react-icons/gi";
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
          m="2"
          display={"flex"}
          alignItems={"center"}
          backdropBlur="md"
          justifyContent={"center"}
          bg="#000000"
          position="static"
          variant={"unstyled"}
          color="#ffffff"
          onClick={onOpen}
          fontSize="3xl"
          aria-label="open close drawer"
          icon={<GiHamburgerMenu />}
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
