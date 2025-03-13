"use client";

import LoadingPage from "@/app/loading";
import { getArticles } from "@/lib/articles";
import { Article } from "@/lib/schema";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true);
  const [article, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    getArticles()
      .then((posts) => {
        setArticles(posts);
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
        {article.map((article) => (
          <Link
            key={article.id}
            className={"card bg-base-300 hover:bg-base-200 transition"}
            href={`/posts/${article.id}`}
          >
            <figure>
              <img className={"aspect-video object-cover"} src={article.cover} />
            </figure>
            <div className={"card-body"}>
              <h2 className={"card-title"}>{article.name}</h2>
              <p className={"text-current/50"}>{article.excerpt}</p>
              <p>
                <span className={"badge badge-primary"}>{article.tags[0]}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}