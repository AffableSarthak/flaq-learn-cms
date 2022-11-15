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
    <Container mb="32" fontFamily={"Poppins"} minW="100%" w="100%">
      <Flex
        px="8"
        maxW={"1240px"}
        mx="auto"
        justifyContent={"space-between"}
        w="100%"
      >
        <Box w="40%">
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
          <Box>
            <HStack>
              <Box>
                <IconButton
                  borderRadius={"50%"}
                  bg="transparent"
                  border="1px solid #D2D2D2"
                  aria-label="Search database"
                  icon={<HiOutlineMail />}
                />
              </Box>
              <Box fontSize={"14px"}>
                <Text>Contact us at</Text>
                <Link
                  passHref
                  href="mailto:welcome@flaq.club?subject=Hi!%20I'm%20interested%20in%20knowing%20more%20about%20Flaq"
                >
                  <a target="_blank">
                    <Text color="#fff">welcome@flaq.club</Text>
                  </a>
                </Link>
              </Box>
            </HStack>
          </Box>
        </Box>
        <Box maxW={"470px"}>
          <Text mb="4" fontWeight={700} fontSize={"30px"} color="#ffffff">
            Newsletter
          </Text>
          <Text mb="8" color="#8c8c8c" fontWeight={400} fontSize="14px">
            Be the first to know about every publication, every new feature, and
            every event of Flaq, in your mailbox.
          </Text>
          <InputGroup size="md" h="40px">
            <InputLeftElement
              display={"flex"}
              alignItems="center"
              justifyContent={"center"}
            >
              <Icon as={HiOutlineMail} />
            </InputLeftElement>
            <Input
              borderWidth={"2px"}
              borderColor={"#FFFFFF"}
              type={"email"}
              borderRadius={"70px"}
              placeholder="Enter password"
            />
            <InputRightElement width={"fit-content"}>
              <Button
                _hover={{
                  border: "1px solid #D2D2D2",
                }}
                w="185px"
                borderRadius={"70px"}
                bg="#1bd423"
                onClick={() => console.log("Email")}
              >
                Subscribe
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </Flex>
      <Container maxW="1240px" mx="auto" mt="16">
        <Flex
          mb="4"
          mt="16"
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
        mt="32"
        px="8"
        maxW={"1240px"}
        mx="auto"
        justifyContent={"space-between"}
      >
        <HStack gap="4">
          {socialLink.map((socialLink, key) => {
            return (
              <Link key={key} passHref href={socialLink.link}>
                <IconButton
                  color={socialLink.color}
                  border="0.1px solid #343538 "
                  borderRadius={"50%"}
                  icon={socialLink.icon}
                  aria-label={socialLink.name}
                />
              </Link>
            );
          })}
          <Box></Box>
        </HStack>
        <Box>
          <Text color="#8c8c8c" fontSize={"14px"} fontWeight={"400"}>
            © 2022, Flaq Academy
          </Text>
        </Box>
      </Flex>
    </Container>
  );
};

export default Footer;
