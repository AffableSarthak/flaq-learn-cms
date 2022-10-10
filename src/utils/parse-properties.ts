import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

export type BlogPages = {
  title: string;
  pageId: string;
};

const getPageId = (url: string): string => {
  const urlParts = url.split("-");
  return urlParts[urlParts.length - 1];
};

export const parseProperties = (database: QueryDatabaseResponse): BlogPages[] =>
  database.results.map((row: any) => {
    const title = row.properties.Article.title[0].plain_text;
    const pageId = getPageId(row.url);

    return { title, pageId };
  });
