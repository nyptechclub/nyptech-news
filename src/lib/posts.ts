"use server";

import notion from "@/lib/integrations/notion";

const databaseId = "1a8c3dd702f68000981ff849b8861709";

export type Post = {
  id: string;
  cover?: string;
  name: string;
  tags: string[];
  excerpt: string;
  writtenBy: {
    avatar: string;
    name: string;
  }[];
  modifiedAt: Date;
  createdAt: Date;
};

export async function getPosts() {
  const response = await notion.client.databases.query({
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
        cover:
          data.cover?.type === "external"
            ? data.cover.external.url
            : data.cover?.type === "file"
            ? data.cover.file.url
            : undefined,
        modifiedAt: new Date(data.last_edited_time),
        createdAt: new Date(data.created_time),
      } as Post)
  );
}

export async function getPost(id: string) {
  const response: any = await notion.client.pages.retrieve({
    page_id: id,
  });

  return {
    id: response.id,
    name: response.properties.Name.title[0].text.content,
    tags: response.properties.Tags.multi_select.map((tag: any) => tag.name),
    excerpt: response.properties.Excerpt.rich_text[0].text.content,
    cover:
      response.cover?.type === "external"
        ? response.cover.external.url
        : response.cover?.type === "file"
        ? response.cover.file.url
        : undefined,
    writtenBy: response.properties["Written By"].people.map((person: any) => ({
      avatar: person.avatar_url,
      name: person.name,
    })),
    modifiedAt: new Date(response.last_edited_time),
    createdAt: new Date(response.created_time),
  } as Post;
}

export async function getPostContents(id: string) {
  return await notion.getPage(id);
}