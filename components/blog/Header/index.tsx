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
      bg="#020f02"
      minW="100%"
    >
      <Flex
        mx="auto"
        maxW="90vw"
        alignItems={"center"}
        py="4"
        justifyContent={{
          base: "space-between",
        }}
      >
        <HStack>
          <HStack onClick={onOpen} cursor="pointer">
            <IconButton
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              position="static"
              _hover={{
                bgColor: "#020f02",
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
                <HStack cursor={"pointer"}>
                  <Image src={logo} width="30px" height="30px" />
                  <Show above="md">
                    <Box>
                      <Text
                        fontSize={"14"}
                        color="#ffffff"
                        fontWeight={"800"}
                        fontFamily="Poppins"
                      >
                        FLAQ
                      </Text>
                    </Box>
                  </Show>
                </HStack>
              </a>
            </Link>
          </Box>
        </HStack>

        <Flex
          gap={{ base: "0", md: "10" }}
          justifyItems={"center"}
          alignItems="center"
        >
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

            <MenuList bg={"#020f02"}>
              <MenuItem
                bg={"#020f02"}
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
              <MenuItem bg={"#020f02"}>
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
          <Box>
            <SearchBar />
          </Box>
        </Flex>
      </Flex>
    </Container>
  );
};
