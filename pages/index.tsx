import { Box } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";
import BlogLayout from "../components/blog/BlogLayout";
import { NotionPageHeader } from "../components/blog/Header";
import HomePage from "../components/blog/Homepage";
import Page404 from "../components/fallback/Page404";
import PageHead from "../components/seo/PageHead";
import { getRecordDataForPage, queryDatabase } from "../src/api/query-database";
import {
  BlogPages,
  getAllCategories,
  parseProperties,
} from "../src/utils/parse-properties";
interface IAllCategories {
  category: string;
  priority: number;
  slug: string;
}
const Home = ({ allCategories }: { allCategories: IAllCategories[] }) => {
  return (
    <div>
      <Box w="100%" h="100vh" bg="#040F03">
        <HomePage allCategories={allCategories} />
      </Box>
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  const database = await queryDatabase();

  // sort the categories by priority
  const allCategories = getAllCategories(database!).sort((a, b) => a.priority>b.priority?1:-1);

  return {
    props: {
      allCategories,
    },
  };
}
