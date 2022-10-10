import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";

export const notionApi = new NotionAPI();

const NOTION_API_KEY = process.env.NOTION_API_KEY ?? "";

export const notion = new Client({ auth: NOTION_API_KEY });
