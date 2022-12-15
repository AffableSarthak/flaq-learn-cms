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
import { BlogPages } from "../../../src/utils/parse-properties";
import SidebarContent from "./SidebarContent";
import SearchBar from "../../common/Search";
type Props = {
  blogData: BlogPages[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const Sidebar = ({ blogData, isOpen, onOpen, onClose }: Props) => {
  const router = useRouter();

  return (
    <>
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
            <Link href={"/"} passHref>
              <Text
                fontSize="2xl"
                fontFamily={"Poppins"}
                cursor={"pointer"}
                _hover={{
                  scale: 1.2,
                  transform: "translateY(-1px)",
                }}
              >
                Flaq
              </Text>
            </Link>
          </DrawerHeader>

          <DrawerBody>
            <Text
              fontSize={"16px"}
              fontFamily={"Poppins"}
              fontWeight={600}
              color={"#C8C7D8"}
              mb="2"
            >
              LEARNING PATHS
            </Text>
            <SidebarContent blogData={blogData} closeDrawer={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
