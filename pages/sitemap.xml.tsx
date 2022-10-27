import React from "react";
import { GetServerSidePropsContext } from "next";
import * as fs from "fs";
import { parseProperties } from "../src/utils/parse-properties";
import { queryDatabase } from "../src/api/query-database";
import { getBlogXmldata } from "../src/utils/get-xml-data";
const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  const BASE_URL = "http://localhost:3000";

  const database = await queryDatabase();
  const blogData = getBlogXmldata(database!);

  const staticPaths = fs
    .readdirSync("pages")
    .filter((staticPage) => {
      return ![
        "api",
        "product",
        "_app.js",
        "_document.js",
        "404.js",
        "sitemap.xml.js",
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
              <loc>${blog.url}</loc>
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
