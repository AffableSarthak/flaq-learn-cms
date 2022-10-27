import React from "react";
import { GetServerSidePropsContext } from "next";
import * as fs from "fs";
import { parseProperties } from "../src/utils/parse-properties";
import { queryDatabase } from "../src/api/query-database";
import { getBlogXmldata } from "../src/utils/get-xml-data";
const Sitemap = () => {
  return null;
};
function return_url(context: GetServerSidePropsContext) {
  if (process.env.NODE_ENV === "production") {
    // if you are hosting a http website use http instead of https
    return `https://${context.req.rawHeaders[1]}`;
  } else {
    return "http://localhost:3000";
  }
}
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { res, req } = context;
  const BASE_URL = return_url(context) || "http://localhost:3000";
  console.log(return_url(context));
  const database = await queryDatabase();
  const blogData = getBlogXmldata(database!);

  const staticPaths = fs
    .readdirSync("pages")
    .filter((staticPage) => {
      return ![
        "api",
        "index.tsx",
        "_app.tsx",
        "_document.tsx",
        "404.tsx",
        "blog",
        "sitemap.xml.tsx",
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${BASE_URL}/${staticPagePath}`;
    });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPaths
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}

        ${blogData
          .map((blog) => {
            return `
            <url>
              <loc>${BASE_URL}/blog/${blog.url}</loc>
              <lastmod>${blog.lastModified}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
          })
          .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
  return {
    props: {},
  };
};

export default Sitemap;
