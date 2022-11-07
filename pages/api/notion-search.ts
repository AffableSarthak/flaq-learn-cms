import { NextApiRequest, NextApiResponse } from "next";
import { ExtendedRecordMap, SearchParams, SearchResults } from "notion-types";
import * as types from "notion-types";
import { notion } from "../../src/api/client";
import {
  QueryDatabaseResponse,
  SearchResponse,
} from "@notionhq/client/build/src/api-endpoints";

export type SearchResult = {
  title: string;
  icon?: string;
  url: string;
};

export const parseProperties = (database: any): SearchResult[] => {
  return database.map((row: any) => {
    const title =
      row.properties.Article?.title[0].plain_text ?? "fallback title";

    const url = row.url.replace("https://www.notion.so/", "");
    const icon = row.icon?.emoji ?? null;
    return { title, icon, url };
  });
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).send({ error: "method not allowed" });
  }

  const searchParams: types.SearchParams = req.body;
  if ((searchParams.query.length < 3)) { 
    return res.status(200).json([]);
  }
  const allResults = await notion.search({
    ...searchParams,
  });
  const filterfunction = (result: any) => {
    return result.properties.Status?.select?.name === "Approved";
  };

  const approved = allResults.results.filter(filterfunction);

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, max-age=60, stale-while-revalidate=60"
  );
  res.status(200).json(parseProperties(approved));
};
