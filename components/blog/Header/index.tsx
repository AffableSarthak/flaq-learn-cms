import React from "react";
import {
  Container,
  Flex,
  Box,
  Text,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Show,
} from "@chakra-ui/react";
import Image from "next/image";
import logo from "../../../public/img/logo.svg";
import Link from "next/link";
import { HiMenu } from "react-icons/hi";
import SearchBar from "../../common/Search";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const NotionPageHeader = ({ isOpen, onClose, onOpen }: Props) => {
  const router = useRouter();

  return (
    <Container
      zIndex={"1000"}
      position={"fixed"}
      top="0"
      left="0"
      right="0"
      bg="#040F03"
      minW="100%"
      borderBottom={"1px solid #9999A5"}
    >
      <Flex
        mx="auto"
        maxW="95vw"
        alignItems={"center"}
        py="4"
        justifyContent={{
          base: "space-between",
        }}
      >
        <HStack gap={{ md: "4", base: 2 }}>
          <HStack onClick={onOpen} cursor="pointer">
            <IconButton
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              position="static"
              _hover={{
                bgColor: "#040F03 ",
                scale: 1.1,
                transform: "translateY(-2px)",
                transition: "all 0.2s ease-in-out",
              }}
              variant={"unstyled"}
              fontSize="2xl"
              color="#B5E9CA"
              aria-label="open close drawer"
              icon={<HiMenu />}
            />
          </HStack>

          <Box>
            <Link passHref href={"https://flaq.club/"}>
              <a>
                <HStack gap="2" cursor={"pointer"}>
                  <Image alt="logo" src={logo} width="30px" height="30px" />

                  <Box>
                    <Text
                      fontSize={"14"}
                      color="#eaefea"
                      fontWeight={"400"}
                      fontFamily="Poppins"
                    >
                      flaq
                    </Text>
                  </Box>
                </HStack>
              </a>
            </Link>
          </Box>
        </HStack>
        <Show above="md">
          <Flex>
            <Box
              mx="6"
              onClick={() => {
                if (router.back() !== undefined) {
                  router.back();
                } else {
                  router.push("/");
                }
              }}
            >
              <Text
                cursor={"pointer"}
                _hover={{
                  color: "#1bd423",
                }}
                fontSize={"md"}
                fontFamily={"Poppins"}
              >
                ed path
              </Text>
            </Box>
            <Box mx="6">
              <Link passHref href={"/simulation"}>
                <Text
                  cursor={"pointer"}
                  _hover={{
                    color: "#1bd423",
                  }}
                  fontSize={"md"}
                  fontFamily={"Poppins"}
                >
                  testrun web3
                </Text>
              </Link>
            </Box>
          </Flex>
        </Show>

        <Flex
          gap={{ base: "0", md: "10" }}
          justifyItems={"center"}
          alignItems="center"
        >
          <Show below="md">
            <Menu>
              <MenuButton>
                <Text
                  fontWeight={"400"}
                  fontSize={"14px"}
                  fontFamily={"Druk Wide Bold"}
                  color="#FFFFFF"
                >
                  GO TO <ChevronDownIcon />
                </Text>
              </MenuButton>

              <MenuList bg={"#040F03 "} color="#9999A5">
                <MenuItem
                  bg={"#040F03 "}
                  onClick={() => {
                    if (router.back() !== undefined) {
                      router.back();
                    } else {
                      router.push("/");
                    }
                  }}
                >
                  <Text
                    cursor={"pointer"}
                    _hover={{
                      color: "#1bd423",
                    }}
                    fontSize={"md"}
                    fontFamily={"Poppins"}
                  >
                    Ed Path
                  </Text>
                </MenuItem>
                <MenuItem bg={"#040F03 "}>
                  <Link passHref href={"/simulation"}>
                    <Text
                      cursor={"pointer"}
                      _hover={{
                        color: "#1bd423",
                      }}
                      fontSize={"md"}
                      fontFamily={"Poppins"}
                    >
                      Testrun Web3
                    </Text>
                  </Link>
                </MenuItem>
              </MenuList>
            </Menu>
          </Show>

          <Box>
            <SearchBar />
          </Box>
        </Flex>
      </Flex>
    </Container>
  );
};
