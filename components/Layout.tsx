import {
  Box,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { BlogPages } from "../src/utils/parse-properties";
import SideBar from "./Sidebar";
function Layout({
  children,
  blogData,
}: {
  children: React.ReactNode;
  blogData: BlogPages[];
}) {
  const bgColor = useColorModeValue("#2F3437", "#2F3437");
  const textColor = useColorModeValue("#FBFBFA", "#2F3437");
  return (
    <Box position={"relative"} bg={bgColor} color={textColor}>
      <Flex flexDirection={{ base: "column", md: "row", lg: "row" }}>
        <Box
          fontFamily={"Poppins"}
          position={"relative"}
          top={0}
          left={0}
          zIndex={1}
        >
          <SideBar blogData={blogData} />
        </Box>

        <Box h="100vh" overflowY="scroll" flex="1">
          {children}
        </Box>
      </Flex>
    </Box>
  );
}

export default Layout;
