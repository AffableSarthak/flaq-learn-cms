import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Highlight,
  Show,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import blogcover from "../../../public/img/blog/blogcover.svg";
import LooperGroup from "../../../public/img/blog/LooperGroup.svg";
import { getBlogUrl } from "../../../src/utils/parse-properties";
import Page404 from "../../fallback/Page404";
import { category_utils, MenuListProps } from "../utils/blogUtils";
import Link from "next/link";
import categoryInfo from "../data/categoryInfo";
import Footer from "../../common/Footer";
import Header from "../../common/Header";

type Props = {
  BlogsByCategory: MenuListProps[];
};

const CategoryPage = ({ BlogsByCategory }: Props) => {
  if (BlogsByCategory.length === 0) {
    return <Page404 />;
  }
  const category = category_utils(BlogsByCategory[0].category).split(" ");
  const desc = categoryInfo.find(
    (a) => a.name.toLowerCase() === category.join(" ").toLowerCase()
  );

  return (
    <Box position={"relative"} bg="#040F03" maxWidth={"100%"}>
      <Header
        showSearch={true}
        showNavlinks={false}
        homeLink={"/"}
        secondaryLink={{
          name: "Testrun Web3",
          link: "/simulation",
        }}
        showMenu={true}
      />

      <Container maxW="1200px">
        <Box mt="12" mb="3">
          <Box position={"relative"} w="fit-content">
            <Text
              my="3"
              fontFamily={"Druk Wide Bold"}
              fontWeight={"700"}
              fontSize={{ base: "3xl", md: "6xl" }}
              as="h1"
            >
              <Highlight
                query={category[category.length - 1]}
                styles={{
                  color: "#70FFE9",
                  my: "3",
                  fontFamily: "Druk Wide Bold",
                  fontWeight: "700",
                }}
              >
                {category.join(" ")}
              </Highlight>
            </Text>
            <Text
              color="#9999A5"
              fontSize={{ md: "md", base: "sm" }}
              fontFamily={"Poppins"}
              fontWeight={500}
            >
              {desc?.desc}
            </Text>
          </Box>
        </Box>
        <Box my="8">
          <Grid
            templateColumns={{
              xl: "repeat(3, 1fr)",
              base: "repeat(1, 1fr)",
            }}
            justifyItems="center"
            gap={6}
          >
            {BlogsByCategory.map((blogData, key) => {
              return (
                <>
                  {blogData.blogs.map((val, key) => {
                    return (
                      <Link
                        href={`/${category
                          .join("-")
                          .toLowerCase()
                          .split(" ")
                          .join("-")}/${getBlogUrl(val.url)}`}
                        passHref
                        key={key}
                      >
                        <a>
                          <GridItem
                            borderRadius={"2xl"}
                            bg="#393953"
                            overflow={"hidden"}
                            w={{ md: "392px", base: "350px" }}
                            h={{ md: "440px", base: "392px" }}
                          >
                            <Box>
                              <Image
                                src={
                                  val.coverImage !== null
                                    ? val.coverImage
                                    : blogcover
                                }
                                placeholder="blur"
                                blurDataURL={blogcover}
                                width="392"
                                height="220"
                                alt="blur"
                              />
                            </Box>
                            <Box py="4" px="6">
                              <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent={"space-between"}
                                alignItems={"left"}
                                flexWrap="wrap"
                                h={{ md: "175px", base: "120px" }}
                              >
                                <Box>
                                  {BlogsByCategory[0].priority !== 1 && (
                                    <Text
                                      fontSize={"md"}
                                      fontWeight={400}
                                      fontFamily={"Space Mono"}
                                    >
                                      {` Ed-piece #${key + 1}`}
                                    </Text>
                                  )}

                                  <Text
                                    fontSize={{ md: "24px", base: "16px" }}
                                    fontWeight={700}
                                    fontFamily={"Poppins"}
                                  >
                                    {val.title}
                                  </Text>
                                </Box>
                                <Box alignSelf={"auto"}>
                                  <Text
                                    fontSize={"md"}
                                    fontWeight={400}
                                    fontFamily={"Space Mono"}
                                  >
                                    {
                                      [
                                        "January",
                                        "February",
                                        "March",
                                        "April",
                                        "May",
                                        "June",
                                        "July",
                                        "August",
                                        "September",
                                        "October",
                                        "November",
                                        "December",
                                      ][new Date(val.published_on).getMonth()]
                                    }{" "}
                                    {"  "}
                                    {new Date(val.published_on).getDate()},{" "}
                                    {new Date(val.published_on).getFullYear()}
                                  </Text>
                                </Box>
                              </Box>
                            </Box>
                          </GridItem>
                        </a>
                      </Link>
                    );
                  })}
                </>
              );
            })}
          </Grid>
          {/* <Box
            py="16"
            display={"flex"}
            flexDirection="row"
            justifyContent={"flex-end"}
          >
            <Button bg="#1bd423">
              <Link href={`${category.join("-")}/quiz`}>Take Quiz</Link>
            </Button>
          </Box> */}
        </Box>
      </Container>
      <Container px="0" maxW="100vw">
        <Footer />
      </Container>

      <Box position={"absolute"} bottom={-1} right={0}>
        <Show above="md">
          <Image src={LooperGroup} alt="lotus" width="171" height="221" />
        </Show>
        <Show below="md">
          <Image src={LooperGroup} width="100" alt="lotus" height="130" />
        </Show>
      </Box>
    </Box>
  );
};

export default CategoryPage;
