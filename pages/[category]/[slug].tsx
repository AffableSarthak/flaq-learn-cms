import Image from "next/image";
import Link from "next/link";
import { NotionRenderer } from "react-notion-x";
import { getPageTitle, parsePageId } from "notion-utils";
import React from "react";
import {
  getRecordDataForPage,
  queryDatabase,
} from "../../src/api/query-database";
import {
  BlogPages,
  getBlogRoutes,
  parseProperties,
} from "../../src/utils/parse-properties";
import Page404 from "../../components/fallback/Page404";
import PageHead from "../../components/seo/PageHead";
import BlogLayout from "../../components/blog/BlogLayout";
import { Highlight, Text } from "@chakra-ui/react";
const PageTitle = ({ title }: { title: string }) => {
  const titleArray = title.split(" ");
  return (
    <Text
      fontFamily={"Druk Wide Bold"}
      fontWeight={"700"}
      fontSize={{ base: "3xl", md: "6xl" }}
    >
      <Highlight
        query={titleArray[titleArray.length - 1]}
        styles={{
          color: "#70FFE9",
          my: "3",
          fontFamily: "Druk Wide Bold",
          fontWeight: "700",
        }}
      >
        {titleArray.join(" ")}
      </Highlight>
    </Text>
  );
};
const CategoryItem = ({
  recordMap,
  blogData,
}: {
  recordMap: any;
  blogData: BlogPages[];
}) => {
  if (recordMap === null) {
    return <Page404 />;
  }

  return (
    <div>
      <PageHead blogData={blogData} recordMap={recordMap} />
      <NotionRenderer
        recordMap={recordMap}
        fullPage={true}
        darkMode={true}
        showTableOfContents={true}
        disableHeader={true}
        pageTitle={<PageTitle title={getPageTitle(recordMap)} />}
        components={{
          nextImage: Image,
          nextLink: Link,
        }}
      />
    </div>
  );
};
export async function getServerSideProps(context: any) {
  const { slug } = context.query;
  const database = await queryDatabase();
  const blogRoutes = getBlogRoutes(database!);
  const blogData = parseProperties(database!);

  const currentRoute = blogRoutes.find((route) => route.url === slug);
  if (!currentRoute) {
    return {
      notFound: true,
    };
  }

  const recordMap = await getRecordDataForPage(currentRoute.pageId);

  return {
    props: {
      recordMap: recordMap ? recordMap : null,
      blogData,
    },
  };
}

CategoryItem.PageLayout = BlogLayout;

export default CategoryItem;
