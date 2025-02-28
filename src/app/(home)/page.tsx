import { getPosts } from "@/lib/posts";
import Link from "next/link";

export default async function Page() {
  const posts = await getPosts();

  return (
    <main className={"p-4"}>
      <div className={"flex flex-col gap-2"}>
        {posts.map((post) => (
          <Link
            key={post.id}
            className={"card bg-base-300 w-80 hover:bg-base-200 transition"}
            href={`/posts/${post.id}`}
          >
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