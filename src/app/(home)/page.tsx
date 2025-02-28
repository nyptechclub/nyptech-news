import { getPosts } from "@/lib/posts";
import Link from "next/link";

export default async function Page() {
  const posts = await getPosts();

  return (
    <main className={"p-4"}>
      <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"}>
        {posts.map((post) => (
          <Link key={post.id} className={"card bg-base-300 hover:bg-base-200 transition"} href={`/posts/${post.id}`}>
            <figure>
              <img className={"aspect-video object-cover"} src={post.cover} />
            </figure>
            <div className={"card-body"}>
              <h2 className={"card-title"}>{post.name}</h2>
              <p className={"text-current/50"}>{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}