import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

export type BlogPages = {
  title: string;
  pageId: string;
  icon: string;
  category: string;
  url: string;
  created_time: string;
};

const getPageId = (url: string): string => {
  const urlParts = url.split("-");
  return urlParts[urlParts.length - 1];
};

// Parse the notion database response to get the blog pages data.
export const parseProperties = (database: QueryDatabaseResponse): BlogPages[] =>
  database.results.map((row: any) => {
    const title = row.properties.Article.title[0].plain_text;
    const pageId = getPageId(row.url);
    const url = row.url.replace("https://www.notion.so/", "");
    const icon = row.icon?.emoji ?? null;
    const category = row.properties.Category.select.name;
    const created_time = row.created_time;
    return { title, pageId, icon, category, url, created_time };
  });
