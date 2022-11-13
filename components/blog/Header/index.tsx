import React from "react";
import * as types from "notion-types";
import { Breadcrumbs, Header, Search, useNotionContext } from "react-notion-x";
import {
  Container,
  Flex,
  Box,
  Text,
  HStack,
  Hide,
  Show,
  useDisclosure,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import Image from "next/image";
import logo from "../../../public/img/logo.svg";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

type Props = {};
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
export const NotionPageHeader: React.FC<{
  block: types.CollectionViewPageBlock | types.PageBlock;
}> = ({ block }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Container maxW="1200px">
      <Flex
        direction={{
          base: "column",
          md: "row",
        }}
        py="8"
        alignItems={"center"}
        justifyContent={{ md: "space-between", base: "center" }}
      >
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
            <IconButton
              size={"md"}
              justifyContent={"center"}
              alignItems={"center"}
              alignContent={"center"}
              icon={
                isOpen ? (
                  <Icon as={AiOutlineClose} />
                ) : (
                  <Icon as={GiHamburgerMenu} />
                )
              }
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
          </HStack>
        </Box>
        <Box>
          <Show above="md">
            <Flex>
              {MenuLinks.map((link, key) => (
                <Link key={key} passHref href={link.link}>
                  <a>
                    <Box ml="50">
                      <Text
                        color="#ffffff"
                        _hover={{
                          color: "#1bd423",
                        }}
                        fontFamily={"Poppins"}
                        fontWeight="400"
                      >
                        {link.name}
                      </Text>
                    </Box>
                  </a>
                </Link>
              ))}
            </Flex>
          </Show>
          <Show below="md">
            <AnimatePresence>
              {isOpen ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Flex
                    mt="8"
                    justifyContent={"center"}
                    alignItems={"center"}
                    direction={{
                      base: "column",
                    }}
                  >
                    {MenuLinks.map((link,key) => (
                      <Link key={key} passHref href={link.link}>
                        <a>
                          <Box my="3">
                            <Text
                              color="#ffffff"
                              _hover={{
                                color: "#1bd423",
                              }}
                              fontFamily={"Poppins"}
                              fontWeight="400"
                            >
                              {link.name}
                            </Text>
                          </Box>
                        </a>
                      </Link>
                    ))}
                  </Flex>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </Show>
        </Box>
      </Flex>
    </Container>
  );
};
