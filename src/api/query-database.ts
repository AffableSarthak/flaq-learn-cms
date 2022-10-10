import { notion, notionApi } from "./client";

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
    console.log({ error });
  }
};

export const getRecordDataForPage = async (pageId: string) => {
  try {
    const recordMap = await notionApi.getPage(pageId);
    console.log(recordMap);
    return recordMap;
  } catch (error) {
    console.log({ error });
  }
};
