import notion from "@/lib/integrations/notion";

const databaseId = "1a8c3dd702f68000981ff849b8861709";

type Post = {
  id: string;
  name: string;
  excerpt: string;
  tags: string[];
  cover: string;
  modifiedAt: Date;
  createdAt: Date;
};

export async function getPosts() {
  const response = await notion.databases.query({ database_id: databaseId });
  return response.results.map(
    (data: any) =>
      ({
        id: data.id,
        name: data.properties.Name.title[0].text.content,
        excerpt: data.properties.Excerpt.rich_text[0].text.content,
        // tags: data.properties.Tags.multi_select.map((tag: any) => tag.name),
        tags: [],
        cover: data.cover.external.url,
        modifiedAt: new Date(data.last_edited_time),
        createdAt: new Date(data.created_time),
      } as Post)
  );
}