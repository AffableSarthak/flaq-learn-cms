import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
} from "@chakra-ui/react";
import React from 'react'
import { BlogPages } from "../../src/utils/parse-properties";
import SidebarContent from "./SidebarContent";

type MobileDrawerProps = {
  isOpen: boolean;
  onClose: Function;
  variant: string;
  blogData: BlogPages[];
  openSidebar: boolean;
  cycleOpenSidebar: () => void;
};

const MobileDrawer = ({blogData,cycleOpenSidebar,isOpen,onClose,openSidebar,variant}: MobileDrawerProps) => {
  return (
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
          <DrawerBody minH={"100%"} p="0">
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

export default MobileDrawer