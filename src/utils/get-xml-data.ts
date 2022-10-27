import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

export type BlogPageData = {
  lastModified: string;
  url: string;
};

export const getBlogXmldata = (database: QueryDatabaseResponse): BlogPageData[] =>
  database.results.map((row: any) => {

    const url = row.url.replace("https://www.notion.so/", "");
    const lastModified = row.last_edited_time;
    
    return { url, lastModified };
  });
