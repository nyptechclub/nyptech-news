"use server";

import { aboutPageId, articleDatabaseId } from "@/lib/constants";
import notion from "@/lib/integrations/notion";
import { Article } from "@/lib/schema";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

function parseArticle(data: PageObjectResponse) {
  const properties = data.properties as any;

  return {
    // Add metadata
    id: data.id,
    cover:
      data.cover?.type === "external"
        ? data.cover.external.url
        : data.cover?.type === "file"
        ? data.cover.file.url
        : undefined,
    modifiedAt: new Date(data.last_edited_time),
    createdAt: new Date(data.created_time),

    // Add properties
    name: properties["Name"].title[0].text.content,
    tags: properties["Tags"].multi_select.map((tag: any) => tag.name),
    excerpt: properties["Excerpt"].rich_text[0].text.content,
    club: properties["Club"].multi_select.map((club: any) => club.name),
    writtenBy: properties["Written By"].people.map((person: any) => ({
      avatar: person.avatar_url,
      name: person.name,
    })),
  } as Article;
}

export async function getArticles(
  filters?: { search?: string; tags?: string[]; clubs?: string[] },
  cursor?: string,
  size?: number
) {
  // Fetch all articles
  const response = await notion.client.databases.query({
    database_id: articleDatabaseId,
    filter: {
      and: [
        {
          property: "Visibility",
          select: {
            does_not_equal: "Draft",
          },
        },
        ...(filters?.search
          ? [
              {
                property: "Name",
                title: {
                  contains: filters.search,
                },
              },
            ]
          : []),
        ...(filters?.tags?.length
          ? filters.tags.map((tag) => ({
              property: "Tags",
              multi_select: {
                contains: tag,
              },
            }))
          : []),
        ...(filters?.clubs?.length
          ? filters.clubs.map((club) => ({
              property: "Club",
              multi_select: {
                contains: club,
              },
            }))
          : []),
      ],
    },
    sorts: [
      {
        timestamp: "created_time",
        direction: "descending",
      },
    ],
    start_cursor: cursor,
    page_size: size ?? 100,
  });

  return {
    // Add metadata
    nextCursor: response.next_cursor,
    inSize: size ?? 100,
    outSize: response.results.length,

    // Parse articles as results
    results: response.results.map((data) => parseArticle(data as PageObjectResponse)),
  };
}

export async function getFeaturedArticles() {
  // Fetch all articles
  const response = await notion.client.databases.query({
    database_id: articleDatabaseId,
    filter: {
      property: "Visibility",
      select: {
        equals: "Featured",
      },
    },
    sorts: [
      {
        timestamp: "created_time",
        direction: "descending",
      },
    ],
    page_size: 3,
  });

  return {
    // Add metadata
    inSize: 3,
    outSize: response.results.length,

    // Parse articles as results
    results: response.results.map((data) => parseArticle(data as PageObjectResponse)),
  };
}

export async function getArticle(id: string) {
  // Fetch article by ID
  const response: any = await notion.client.pages.retrieve({
    page_id: id,
  });

  // Parse and return article
  return parseArticle(response);
}

export async function getArticleContent(id: string) {
  return await notion.getPage(id);
}

export async function getAboutContent() {
  return await getArticleContent(aboutPageId);
}