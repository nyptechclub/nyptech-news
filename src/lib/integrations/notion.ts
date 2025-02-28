import { NOTION_ACCESS_TOKEN } from "@/environment";
import { Client } from "@notionhq/client";

const notion = new Client({
  auth: NOTION_ACCESS_TOKEN,
});

export default notion;