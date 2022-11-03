import { Avatar, Box,Text, Button, Flex, FlexProps, HStack, IconButton, Link, useColorModeValue, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactText } from "react";
import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi";

interface NavItemProps extends FlexProps {
  children: ReactText;
  url: string;
  linkkey: number;
}
const NavItem = ({ children, url, linkkey, ...rest }: NavItemProps) => {
  const { query } = useRouter();

  return (
    <Link href={`?slug=${url}`}>
      <Flex
        align="center"
        p="4"
        m="2"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        border="0.1px solid #d3dfeb"
        bg="#ffffff"
        color={"#000000"}
        boxShadow={`${
          query.slug === url ? "0px 0px 15px -4px rgba(0,0,0,0.75);" : "sm"
        }`}
        {...rest}
      >
        <Button
          _hover={{
            bg: "#1A73E8",
          }}
          size={"xs"}
          mx="2"
          p="0"
          textColor={"#ffffff"}
          bg="#1A73E8"
          borderRadius={"50%"}
        >
          {linkkey}
        </Button>
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      px={{ base: 4, md: 4 }}
      height="16"
      alignItems="center"
      bg={useColorModeValue("white", "#ffffff")}
      justifyContent="space-between"
      w="full"
      position={"sticky"}
      top={0}
      zIndex={1}
      color="#000000"
      boxShadow={"md"}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        color="#000000"
        icon={<FiMenu />}
      />

      <Text
        display="flex"
        fontSize="2xl"
        fontFamily="Nunito Sans"
        fontWeight="bold"
      >
        Flaq
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <HStack>
            <Avatar
              size={"sm"}
              src={"https://avatars.githubusercontent.com/u/56780589?v=4"}
            />
            <VStack
              display={{ base: "none", md: "flex" }}
              alignItems="flex-start"
              spacing="1px"
              ml="2"
            >
              <Text fontSize="sm">Sagar Gajare</Text>
              <Text fontSize="xs" color="gray.600">
                Frontend Dev
              </Text>
            </VStack>
            <Box display={{ base: "none", md: "flex" }}>
              <FiChevronDown />
            </Box>
          </HStack>
        </Flex>
      </HStack>
    </Flex>
  );
};

export {
    NavItem,
    MobileNav
 }