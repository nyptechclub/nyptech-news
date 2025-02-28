import { getPosts } from "@/lib/posts";

export default async function Page() {
  const posts = await getPosts();

  return (
    <main>
      {posts.map((post) => (
        <div>{post.name}</div>
      ))}
    </main>
  );
}