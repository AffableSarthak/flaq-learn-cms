import React from "react";
import * as types from "notion-types";
import { Breadcrumbs, Header, useNotionContext } from "react-notion-x";
import {
  Container,
  Flex,
  Box,
  Text,
  HStack,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import Image from "next/image";
import logo from "../../../public/img/logo.svg";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import SearchBar from "../../common/Search";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
const MenuLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Who are we?",
    link: "/about",
  },
  {
    name: "Learn",
    link: "/learn",
  },
  {
    name: "सीखिए",
    link: "https://seekhiye.flaq.club/",
  },
  {
    name: "News",
    link: "/news",
  },
  {
    name: "Contact Us",
    link: "mailto:welcome@flaq.club?subject=Hi!%20I'm%20interested%20in%20knowing%20more%20about%20Flaq",
  },
];

export const NotionPageHeader = ({ isOpen, onClose, onOpen }: Props) => {
  return (
    <Container
      zIndex={"1000"}
      position={"fixed"}
      top="0"
      left="0"
      right="0"
      bg="#020f02"
      minW="100%"
    >
      <Flex
        mx="auto"
        maxW="1200px"
        alignItems={"center"}
        py="4"
        justifyContent={{
          base: "space-between",
        }}
      >
        <Box>
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
        </Box>
        <Box>
          <HStack gap="2">
            <Image src={logo} width="40px" height="40px" />
            <Box>
              <Text
                fontSize={"12"}
                color="#ffffff"
                fontWeight={"800"}
                fontFamily="Poppins"
              >
                FLAQ ACADEMY
              </Text>
            </Box>
          </HStack>
        </Box>
        <Box>
          <SearchBar />
        </Box>
      </Flex>
    </Container>
  );
};
