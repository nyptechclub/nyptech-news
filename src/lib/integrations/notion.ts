import { NOTION_ACCESS_TOKEN } from "@/environment";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const notion = new Client({
  auth: NOTION_ACCESS_TOKEN,
});

const notionMd = new NotionToMarkdown({
  notionClient: notion,
  config: {
    separateChildPage: true, // default: false
  },
});

export { notionMd };
export default notion;