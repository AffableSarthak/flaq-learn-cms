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
  DrawerFooter,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { BlogPages } from "../../../src/utils/parse-properties";
import SidebarContent from "./SidebarContent";

import { HiOutlineMail } from "react-icons/hi";
import { RiLinkedinFill, RiTelegramLine } from "react-icons/ri";
import { FiTwitter } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";
type Props = {
  blogData: BlogPages[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
const socialLink = [
  {
    name: "Linkedin",
    link: "https://www.linkedin.com/company/flaq-club/",
    icon: <RiLinkedinFill size="18px" />,
    color: "#0077B5",
  },
  {
    name: "Twitter",
    link: "https://twitter.com/flaq_club",
    icon: <FiTwitter size="18px" />,
    color: "#FFFFFF",
  },
  {
    name: "Discord",
    link: "https://discord.com/invite/pgzHRFR2Jq",
    icon: <FaDiscord size="18px" />,
    color: "#5562EA",
  },
  {
    name: "Telegram",
    link: "https://t.me/+pUwD3bO2KAA0NTI1",
    icon: <RiTelegramLine size="18px" />,
    color: "#2DA4DD",
  },
];
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

          <DrawerHeader w="fit-content">
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
          <DrawerFooter>
            <HStack gap="4">
              {socialLink.map((socialLink, key) => {
                return (
                  <Link key={key} passHref href={socialLink.link}>
                    <IconButton
                      bg="transparent"
                      color={socialLink.color}
                      border="0.1px solid #343538 "
                      borderRadius={"50%"}
                      icon={socialLink.icon}
                      aria-label={socialLink.name}
                      size="md"
                    />
                  </Link>
                );
              })}
              <Box></Box>
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
