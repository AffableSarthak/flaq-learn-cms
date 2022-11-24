import {
  Box,
  Flex,
  Hide,
  HStack,
  Show,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import logo from "../../../public/img/logo.svg";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
type HeaderProps = {
  showSearch: boolean;
  showNavlinks: boolean;
  showMenu: boolean;
  homeLink: string;
  secondaryLink: {
    name: string;
    link: string;
  }
};
const navbarLinks = [
  {
    name: "Home",
    link: "https://www.flaq.club/",
  },
  {
    name: "Who we are?",
    link: "https://www.flaq.club/who-are-we",
  },
  {
    name: "Learn",
    link: "https://learn.flaq.club/",
  },
  {
    name: "सीखिए",
    link: "https://seekhiye.flaq.club/",
  },
  {
    name: "News",
    link: "https://www.flaq.club/news",
  },
  {
    name: "Contact Us",
    link: "mailto:welcome@flaq.club?subject=Hi!%20I'm%20interested%20in%20knowing%20more%20about%20Flaq",
  },
];

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);
const Header = ({ showNavlinks, homeLink,secondaryLink,showMenu,showSearch }: HeaderProps) => {
  const [isMobMenuOpen, setIsMobMenuOpen] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box
        fontFamily={"Nunito Sans"}
        position={"relative"}
        top={0}
        left={0}
        zIndex={1}
      ></Box>
      <Flex py="6" justifyContent={"space-between"}>
        <Box>
          <Link passHref href={"https://flaq.club/"}>
            <a>
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
            </a>
          </Link>
        </Box>
        <Box h="100%">
          <Show above="md">
            <Flex h="full" alignItems={"center"} justifyContent="center">
              <Box h="full" ml="12">
                <Link passHref href={homeLink}>
                  <Text
                    cursor={"pointer"}
                    _hover={{
                      color: "#1bd423",
                    }}
                    fontSize={"md"}
                    fontFamily={"Poppins"}
                  >
                    Home
                  </Text>
                </Link>
              </Box>
              {secondaryLink && (
                <Box h="full" ml="12">
                  <Link passHref href={secondaryLink.link}>
                    <Text
                      cursor={"pointer"}
                      _hover={{
                        color: "#1bd423",
                      }}
                      fontSize={"md"}
                      fontFamily={"Poppins"}
                    >
                      {secondaryLink.name}
                    </Text>
                  </Link>
                </Box>
              )}

              {showNavlinks &&
                navbarLinks.map((navLink, key) => {
                  return (
                    <Box h="full" ml="12" key={key}>
                      <Link passHref href={navLink.link}>
                        <Text
                          cursor={"pointer"}
                          _hover={{
                            color: "#1bd423",
                          }}
                          fontSize={"md"}
                          fontFamily={"Poppins"}
                        >
                          {navLink.name}
                        </Text>
                      </Link>
                    </Box>
                  );
                })}
            </Flex>
          </Show>
          <Show below="md">
            <motion.button
              onClick={() => setIsMobMenuOpen(!isMobMenuOpen)}
              animate={isMobMenuOpen ? "open" : "closed"}
              initial={false}
              style={{
                borderRadius: "50%",
                border: "1px solid #ffffff",
                padding: "7px",
              }}
            >
              <svg
                width="23"
                height="23"
                style={{ margin: "4px 0 0 2px" }}
                viewBox="0 0 23 23"
              >
                <Path
                  variants={{
                    closed: { d: "M 2 2.5 L 20 2.5" },
                    open: { d: "M 3 16.5 L 17 2.5" },
                  }}
                />
                <Path
                  d="M 2 9.423 L 20 9.423"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                  transition={{ duration: 0.1 }}
                />
                <Path
                  variants={{
                    closed: { d: "M 2 16.346 L 20 16.346" },
                    open: { d: "M 3 2.5 L 17 16.346" },
                  }}
                />
              </svg>
            </motion.button>
          </Show>
        </Box>
      </Flex>
      <Hide above="md">
        <AnimatePresence>
          {isMobMenuOpen && (
            <motion.div
              key="modal"
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              initial={{ height: 0, opacity: 0 }}
            >
              <VStack pb="4" zIndex={"200"} gap={6}>
                <Box textAlign={"center"}>
                  <Link passHref href={homeLink}>
                    <Text
                      cursor={"pointer"}
                      _hover={{
                        color: "#1bd423",
                      }}
                      fontSize={"md"}
                      fontFamily={"Poppins"}
                    >
                      Home
                    </Text>
                  </Link>
                </Box>
                {secondaryLink && (
                  <Box textAlign={"center"}>
                    <Link passHref href={secondaryLink.link}>
                      <Text
                        cursor={"pointer"}
                        _hover={{
                          color: "#1bd423",
                        }}
                        fontSize={"md"}
                        fontFamily={"Poppins"}
                      >
                        {secondaryLink.name}
                      </Text>
                    </Link>
                  </Box>
                )}

                {showNavlinks &&
                  navbarLinks.map((navLink, key) => {
                    return (
                      <Box textAlign={"center"} key={key}>
                        <Link passHref href={navLink.link}>
                          <Text
                            cursor={"pointer"}
                            _hover={{
                              color: "#1bd423",
                            }}
                            fontSize={"md"}
                            fontFamily={"Poppins"}
                          >
                            {navLink.name}
                          </Text>
                        </Link>
                      </Box>
                    );
                  })}
              </VStack>
            </motion.div>
          )}{" "}
        </AnimatePresence>
      </Hide>
    </>
  );
};

export default Header;
