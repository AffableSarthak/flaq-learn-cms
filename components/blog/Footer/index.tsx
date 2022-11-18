import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Show,
  Text,
  transition,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import logo from "../../../public/img/logo.svg";
import { HiOutlineMail } from "react-icons/hi";
import { RiLinkedinFill, RiTelegramLine } from "react-icons/ri";
import { FiTwitter } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";
import Link from "next/link";

type Props = {};
const links = [
  {
    name: "Home",
    link: "https://www.flaq.club/",
  },
  {
    name: "FAQs",
    link: "https://www.flaq.club/faqs",
  },
  {
    name: "Privacy Policy",
    link: "https://www.flaq.club/privacy-policy",
  },
  {
    name: "About Us",
    link: "https://www.flaq.club/about",
  },
];

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
const Footer = (props: Props) => {
  return (
    <Container mb="16" fontFamily={"Poppins"} minW="100%" w="100%">
      <Flex
        px={{ md: "8", base: "2" }}
        maxW={"1240px"}
        direction={{ base: "column", md: "row" }}
        mx="auto"
        justifyContent={"space-between"}
        w="100%"
      >
        <Box w="49%">
          <Link passHref href={"https://flaq.club/"}>
            <a>
              <HStack mb="16" gap="2">
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

          <Box>
            <HStack>
              <Box>
                <IconButton
                  bg="transparent"
                  border="0.1px solid #343538 "
                  borderRadius={"50%"}
                  aria-label="Email"
                  size={"lg"}
                  icon={<HiOutlineMail />}
                />
              </Box>
              <Box fontSize={"14px"}>
                <Text color="#8c8c8c" fontFamily={"Poppins"}>
                  Contact us at
                </Text>
                <Link
                  passHref
                  href="mailto:welcome@flaq.club?subject=Hi!%20I'm%20interested%20in%20knowing%20more%20about%20Flaq"
                >
                  <a target="_blank">
                    <Text fontFamily={"Poppins"} color="#fff">
                      welcome@flaq.club
                    </Text>
                  </a>
                </Link>
              </Box>
            </HStack>
          </Box>
        </Box>
        <Box
          mt={{
            md: "2",
            base: "6",
          }}
          w={{ md: "49%", base: "100%" }}
          maxW={"470px"}
        >
          <Text
            fontFamily={"Poppins"}
            mb="4"
            fontWeight={700}
            fontSize={{ md: "30px", base: "18px" }}
            color="#ffffff"
          >
            Newsletter
          </Text>
          <Text
            fontFamily={"Poppins"}
            mb="8"
            color="#8c8c8c"
            fontWeight={400}
            fontSize="14px"
          >
            Be the first to know about every publication, every new feature, and
            every event of Flaq, in your mailbox.
          </Text>
          <InputGroup w={{ md: "90%", base: "100%" }} size="md">
            <InputLeftElement
              display={"flex"}
              flexDirection="column"
              alignItems="center"
              h="3.5rem"
              px="6"
              justifyContent={"center"}
            >
              <Icon as={HiOutlineMail} />
            </InputLeftElement>
            <Input
              _active={{
                borderColor: "#8c8c8c",
                outline: "none",
              }}
              _focusVisible={{
                borderColor: "#8c8c8c",
              }}
              borderWidth={"2px"}
              borderColor={"#FFFFFF"}
              type={"email"}
              borderRadius={"70px"}
              h="3.5rem"
              placeholder="Enter Email"
            />
            <Show above="md">
              <InputRightElement h="3.5rem" width={"fit-content"}>
                <Button
                  h="3.5rem"
                  _hover={{
                    border: "1px solid #D2D2D2",
                  }}
                  w="185px"
                  borderRadius={"70px"}
                  bg="#1bd423"
                  color="#ffffff"
                  onClick={() => console.log("Email")}
                >
                  Subscribe
                </Button>
              </InputRightElement>
            </Show>
          </InputGroup>
        </Box>
        <Show below="md">
          <Box>
            <Button
              mt="1"
              h="3.5rem"
              _hover={{
                border: "1px solid #D2D2D2",
              }}
              w="100%"
              borderRadius={"70px"}
              bg="#1bd423"
              color="#ffffff"
              onClick={() => console.log("Email")}
            >
              Subscribe
            </Button>
          </Box>
        </Show>
      </Flex>
      <Container maxW="1240px" mx="auto" mt="14">
        <Flex
          maxW={"1240px"}
          mx="auto"
          justifyContent={"space-between"}
          w="100%"
        >
          {links.map((link, key) => {
            return (
              <Link passHref href={link.link} key={key}>
                <a target={"_blank"}>
                  <Text
                    fontFamily={"Poppins"}
                    fontSize={"14px"}
                    color="#8c8c8c"
                    fontWeight={"400"}
                    _hover={{
                      color: "#ffffff",
                      textShadow: "1px 0 0 #fff",
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    {link.name}
                  </Text>
                </a>
              </Link>
            );
          })}
        </Flex>
      </Container>
      <Flex
        mt="10"
        px={{ base: "2", md: "8" }}
        maxW={"1240px"}
        mx="auto"
        direction={{
          md: "row",
          base: "column",
        }}
        justifyContent={"space-between"}
      >
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
                  size="lg"
                />
              </Link>
            );
          })}
          <Box></Box>
        </HStack>
        <Box mt={{ md: "2", base: "6" }}>
          <Text
            fontFamily={"Poppins"}
            color="#8c8c8c"
            fontSize={"14px"}
            fontWeight={"400"}
          >
            © 2022, Flaq Academy
          </Text>
        </Box>
      </Flex>
    </Container>
  );
};

export default Footer;
