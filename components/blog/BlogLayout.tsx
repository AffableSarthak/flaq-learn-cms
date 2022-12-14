import {
  Box,
  Container,
  Flex,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { BlogPages, BlogRoutesType } from "../../src/utils/parse-properties";
import Footer from "../common/Footer";
import { NotionPageHeader } from "./Header";
import ReadProgressBar from "./ReadProgressBar";
import SideBar from "./sidebar";

function BlogLayout({
  children,
  blogData,
}: {
  children: React.ReactNode;
  blogData: BlogPages[];
}) {
  const textColor = useColorModeValue("#FBFBFA", "#D0D1D2");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box position={"relative"} bg="#D0D1D2" color={textColor}>
        <Flex flexDirection={{ base: "column", md: "row", lg: "row" }}>
          <Box
            fontFamily={"Nunito Sans"}
            position={"relative"}
            top={0}
            left={0}
            zIndex={1}
          >
            <SideBar
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
              blogData={blogData}
            />
          </Box>
          <ReadProgressBar />
          <div
            style={{
              height: "100vh",
              overflow: "auto",
              width: "100%",
              background: "#040F03 ",
            }}
            id="box"
          >
            <NotionPageHeader
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
            />
            <Box mt="8">{children}</Box>
            <Container px="0" maxW="100vw">
              <Footer />
            </Container>
          </div>
        </Flex>
      </Box>
    </>
  );
}

export default BlogLayout;
