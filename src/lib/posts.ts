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
  console.log(JSON.stringify(response.results));
  return response.results.map((data: any) => {
    const coverType = data.cover?.type as "external" | "file";

    let post = {
      id: data.id,
      name: data.properties.Name.title[0].text.content,
      tags: data.properties.Tags.multi_select.map((tag: any) => tag.name),
      excerpt: data.properties.Excerpt.rich_text[0].text.content,
      modifiedAt: new Date(data.last_edited_time),
      createdAt: new Date(data.created_time),
    } as Post;

    if (coverType === "external") {
      post.cover = data.cover.external.url;
    } else if (coverType === "file") {
      post.cover = data.cover.file.url;
    } else {
      post.cover = undefined;
    }

    return post;
  });
}

export async function getPostContents(id: string) {
  const blocks = await notionMd.pageToMarkdown(id);
  const markdown = notionMd.toMarkdownString(blocks);
  return markdown.parent as string;
}