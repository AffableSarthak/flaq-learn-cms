import { Box, Container, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import Navbar from "../../common/Navbar";
import LeftArrowIcon from "../../../public/img/blog/left arrow.svg";
import web3icon from "../../../public/img/blog/web3Icon.svg";
import bgpattern from "../../../public/img/blog/bgpattern.svg";
import LooperGroup from "../../../public/img/blog/LooperGroup.svg";

import Image from "next/image";
import { BlogPages } from "../../../src/utils/parse-properties";
import blogsToCategoryMap from "../utils/blogUtils";
type Props = {
  blogData: BlogPages[];
};

const HomePage = ({ blogData }: Props) => {
  const blogs = blogsToCategoryMap(blogData);
  return (
    <Box position={"relative"} bg="#040F03" maxWidth={"100%"}>
      <Container pb="16" mb="16" maxW="1200px">
        <Navbar />
        <Box mt="12">
          <Box>
            <Text
              my="3"
              lineHeight={"5.7rem"}
              fontFamily={"Druk Wide Bold"}
              fontWeight={"700"}
              fontSize={{ base: "3xl", md: "7xl" }}
              as="h1"
            >
              select a{" "}
              <Text
                as="span"
                lineHeight={"5.7rem"}
                fontFamily={"Druk Wide Bold"}
                fontWeight={"700"}
                fontSize={{ base: "3xl", md: "7xl" }}
                color={"#70FFE9"}
              >
                course
              </Text>
            </Text>
            <Text
              color="#9999A5"
              fontSize={"md"}
              fontFamily={"Poppins"}
              fontWeight={500}
            >
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used <br /> to demonstrate the visual form of a
              document or a typeface.
            </Text>
          </Box>
        </Box>
        <Box my="8">
          <Grid
            templateColumns={{
              xl: "repeat(2, 1fr)",
              base: "repeat(1, 1fr)",
            }}
            justifyItems="center"
            gap={6}
          >
            {blogs.map((val,key) => {
              return (
                <GridItem
                  py="4"
                  px="6"
                  border={"3px solid #BA2FE4"}
                  borderRadius={"20px"}
                  bg="#1A1A1A"
                  w={{ md: "556px", base: "350px" }}
                  h={{ md: "304px", base: "195px" }}
                  key={key}
                  display="flex"
                  flexDirection="column"
                  justifyContent={"space-between"}
                  position="relative"
                  backgroundImage={`url(${bgpattern.src})`}
                >
                  <Box>
                    <Text
                      fontSize={{ md: "2.5rem", base: "1.2rem" }}
                      fontWeight={700}
                      fontFamily={"Druk Wide Bold"}
                    >
                      {val.category}
                    </Text>
                    <Text
                      fontSize={{ md: "16px", base: "12px" }}
                      color="#9999A5"
                    >
                      A good place to begin with if you are fresh af into web3
                    </Text>
                  </Box>
                  <Box alignSelf={"auto"}>
                    <Box display={"flex"} alignItems="center" w="100%">
                      <Text
                        fontSize={{ md: "24px", base: "16px" }}
                        fontWeight={700}
                        fontFamily={"Poppins"}
                      >
                        Start Learning
                      </Text>
                      <Image src={LeftArrowIcon} width="56px" height="56px" />
                    </Box>
                  </Box>
                  <Box
                    right={{ md: "52px", base: "5px" }}
                    bottom={{ md: "52px", base: "5px" }}
                    position={"absolute"}
                  >
                    <Image src={web3icon} width="90" height="90" />
                  </Box>
                </GridItem>
              );
            })}
          </Grid>
        </Box> 
      </Container>
      <Box position={"absolute"} bottom={-1} right={0}>
        <Image src={LooperGroup} width="100%" height="100%" />
      </Box>
    </Box>
  );
};

export default HomePage;
