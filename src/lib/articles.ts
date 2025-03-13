"use server";

import { articleDatabaseId } from "@/lib/contants";
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

export async function getArticles() {
  // Fetch all articles
  const response = await notion.client.databases.query({
    database_id: articleDatabaseId,
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

  // Parse and return articles
  return response.results.map((data) => parseArticle(data as PageObjectResponse));
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