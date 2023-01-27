import {
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Link,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import logo from "../../../public/img/logo.svg";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";

const socials = [
  { icon: <BsInstagram />, link: "" },
  { icon: <BsTwitter />, link: "" },
  { icon: <FaDiscord />, link: "" },
];

export default function Header() {
  const router = useRouter();

  return (
    <Container
      zIndex={"1000"}
      position={"sticky"}
      top="0"
      left="0"
      right="0"
      minW="100%"
    >
      <Flex
        mx="auto"
        maxW="95vw"
        alignItems={"center"}
        py={7}
        justifyContent={"space-between"}
      >
        <HStack
          gap="2"
          onClick={() => {
            router.push("/");
          }}
          cursor="pointer"
        >
          <Image src={logo} width="28px" height="32px" alt="Flaq logo" />
          <Box>
            <Text fontSize={"18"} fontWeight={"400"} fontFamily="Poppins">
              flaq
            </Text>
          </Box>
        </HStack>
        <Flex
          flexDirection={["column", "row"]}
          alignItems="center"
          position={["absolute", "unset"]}
          top={"450px"}
          left={0}
        >
          {socials.map((social, index) => (
            <Link key={index} href={social.link}>
              <IconButton
                aria-label="Search database"
                icon={social.icon}
                bg="transparent"
                color={"gray.500"}
                _hover={{
                  bg: "transparent",
                }}
              />
            </Link>
          ))}
        </Flex>
      </Flex>
    </Container>
  );
}
