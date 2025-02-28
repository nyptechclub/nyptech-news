"use server";

import notion, { notionMd } from "@/lib/integrations/notion";

const databaseId = "1a8c3dd702f68000981ff849b8861709";

export type Post = {
  id: string;
  name: string;
  tags: string[];
  excerpt: string;
  cover?: string;
  modifiedAt: Date;
  createdAt: Date;
};

export async function getPosts() {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Visibility",
      select: {
        does_not_equal: "Draft",
      },
    },
    sorts: [
      {
        timestamp: "created_time",
        direction: "descending",
      },
    ],
  });
  return response.results.map(
    (data: any) =>
      ({
        id: data.id,
        name: data.properties.Name.title[0].text.content,
        tags: data.properties.Tags.multi_select.map((tag: any) => tag.name),
        excerpt: data.properties.Excerpt.rich_text[0].text.content,
        cover: data.cover?.external?.url ?? undefined,
        modifiedAt: new Date(data.last_edited_time),
        createdAt: new Date(data.created_time),
      } as Post)
  );
}

export async function getPostContents(id: string) {
  const blocks = await notionMd.pageToMarkdown(id);
  const markdown = notionMd.toMarkdownString(blocks);
  return markdown.parent as string;
}