import { parseProperties } from "../utils/parse-properties";
import { notion, notionApi } from "./client";

// Query notion database to get all the approved pages blogs data.
export const queryDatabase = async () => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID ?? "",
      filter: {
        property: "Status",
        select: {
          equals: "Approved",
        },
      },
    });
    return response;
  } catch (error) {
    console.log({ error }, "Databese query error");
  }
};

// Fetch the parsed data for the Notion renderer.
export const getRecordDataForPage = async (pageId: string) => {
  try {
    const recordMap = await notionApi.getPage(pageId);
    return recordMap;
  } catch (error) {
    console.log({ error }, "Page not found");
  }
};

export const getBlogsByCategory = async (category: string) => {
  // Flaq Academy 1
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID ?? "",
    filter: {
      and: [
        {
          property: "Status",
          select: {
            equals: "Approved",
          },
        }, {
          property: "Category",
          select: {
            equals: category,
          }
        }
      ],
    },
  });

  return parseProperties(response);
};
