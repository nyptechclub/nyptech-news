import { NOTION_ACCESS_TOKEN } from "@/environment";
import { Client } from "@notionhq/client";
import { NotionCompatAPI } from "notion-compat";

const notion = new NotionCompatAPI(
  new Client({
    auth: NOTION_ACCESS_TOKEN,
  })
);

export default notion;