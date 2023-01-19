import { Box, Container, Grid } from "@chakra-ui/react";
import React from "react";
import { getBlogUrl } from "../../../src/utils/parse-properties";
import Page404 from "../../fallback/Page404";
import { category_utils, MenuListProps } from "../utils/blogUtils";
import Footer from "../../common/Footer";
import Header from "../../common/Header";
import BlogCard from "./BlogCard";
import Title from "./Title";

type Props = {
  BlogsByCategory: MenuListProps[];
};

const CategoryPage = ({ BlogsByCategory }: Props) => {
  if (BlogsByCategory.length === 0) {
    return <Page404 />;
  }
  const category = category_utils(BlogsByCategory[0].category).split(" ");

  return (
    <Box bg="#040F03" maxWidth={"100%"}>
      <Header
        showSearch={true}
        showNavlinks={false}
        secondaryLink={{
          name: "Testrun Web3",
          link: "/simulation",
        }}
        showMenu={true}
      />
      <Container maxW="1200px">
        <Title category={category} />
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
                      <BlogCard
                        key={key}
                        val={val}
                        priority={BlogsByCategory[0].priority}
                        index={key}
                        link={`/${category
                          .join("-")
                          .toLowerCase()
                          .split(" ")
                          .join("-")}/${getBlogUrl(val.url)}`}
                      />
                    );
                  })}
                </>
              );
            })}
          </Grid>
        </Box>
      </Container>
      <Container px="0" maxW="100vw">
        <Footer />
      </Container>
    </Box>
  );
};

export default CategoryPage;
