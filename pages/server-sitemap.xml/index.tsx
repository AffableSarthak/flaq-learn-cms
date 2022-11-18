// pages/server-sitemap.xml/index.tsx
import { GetServerSidePropsContext } from "next";
import { getServerSideSitemap } from "next-sitemap";
import { GetServerSideProps } from "next";
import { queryDatabase } from "../../src/api/query-database";
import { getBlogXmldata } from "../../src/utils/get-xml-data";

function return_url(context: GetServerSidePropsContext) {
  if (process.env.NODE_ENV === "production") {
    // if you are hosting a http website use http instead of https
    return `https://${context.req.rawHeaders[1]}`;
  } else {
    return "http://localhost:3000";
  }
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')
  const database = await queryDatabase();
  const BASE_URL = return_url(ctx) || "http://localhost:3000";
  const blogData = getBlogXmldata(database!);
  const fields = blogData.map((blog) => {
    return {
      loc: `${BASE_URL}/blog/${blog.url}`,
      lastmod: `${new Date().toISOString()}`,
      priority: 1.0,
    };
  });

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default function Sitemap() {}
