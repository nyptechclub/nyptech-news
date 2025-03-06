"use client";

import LoadingPage from "@/app/loading";
import { getPosts, Post } from "@/lib/posts";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts()
      .then((posts) => {
        setPosts(posts);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <main className={"p-4"}>
      <nav className={"mb-4 navbar bg-base-300 rounded-box px-4"}>
        <div className={"navbar-start"}>
          <Link className={"btn btn-ghost"} href={"/posts"}>
            <span className={"font-bold text-lg"}>SIT Chapters</span>
          </Link>
        </div>
        <div className={"navbar-center"}>
          <Link className={"btn btn-ghost"} href={"#"}>
            Featured
          </Link>
          <Link className={"btn btn-ghost"} href={"#"}>
            Clubs
          </Link>
          <Link className={"btn btn-ghost"} href={"#"}>
            Tech
          </Link>
          <Link className={"btn btn-ghost"} href={"#"}>
            Guides
          </Link>
        </div>
        <div className={"navbar-end"}>
          <Link className={"btn btn-ghost"} href={"/about"}>
            About Us
          </Link>
        </div>
      </nav>
      <div className={"mb-4 bg-base-300 rounded-box h-100"}>
        <div className={"size-full grid grid-cols-[1fr_auto]"}>
          <div className={"ml-16 flex flex-col justify-center"}>
            <h2 className={"text-4xl font-bold"}>Welcome to SIT Chapters!</h2>
            <p className={"mt-2"}>Stay up to date with the latest news and events happening in NYP SIT.</p>
          </div>
          <div className={"grid place-items-center"}>
            <img className={"h-[80%] aspect-square"} src={"/icon.png"} alt={"Image"} />
          </div>
        </div>
      </div>
      <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"}>
        {posts.map((post) => (
          <Link key={post.id} className={"card bg-base-300 hover:bg-base-200 transition"} href={`/posts/${post.id}`}>
            <figure>
              <img className={"aspect-video object-cover"} src={post.cover} />
            </figure>
            <div className={"card-body"}>
              <h2 className={"card-title"}>{post.name}</h2>
              <p className={"text-current/50"}>{post.excerpt}</p>
              <p>
                <span className={"badge badge-primary"}>{post.tags[0]}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}