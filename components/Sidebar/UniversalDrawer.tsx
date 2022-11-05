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
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import { BlogPages } from "../../src/utils/parse-properties";
import SearchBar from "../Search";
import SidebarContent from "./SidebarContent";

type Props = {
  blogData: BlogPages[];
};

const UniversalDrawer = ({ blogData }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/") {
      onOpen();
    }
  }, []);

  return (
    <>
      <Box position="fixed">
        <IconButton
          m="2"
          display={"flex"}
          alignItems={"center"}
          backdropBlur="md"
          justifyContent={"center"}
          bg="#005704"
          position="static"
          variant={"unstyled"}
          color="#A6EBC9"
          onClick={onOpen}
          fontSize="3xl"
          aria-label="open close drawer"
          icon={<GiHamburgerMenu />}
        />
        <SearchBar />
      </Box>

      <Drawer
        variant={"mainsidebar"}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton size={"lg"} />

          <DrawerHeader>
            <Link href={"/"}>
              <Text
                fontSize="2xl"
                fontFamily={"Dela Gothic One"}
                cursor={"pointer"}
                _hover={{
                  scale: 1.2,
                  transform: "translateY(-1px)",
                }}
              >
                Flaq Academy
              </Text>
            </Link>
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
