"use client";

import LoadingPage from "@/app/loading";
import { getArticles, getFeaturedArticles } from "@/lib/database";
import { Article } from "@/lib/schema";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);

  useEffect(() => {
    Promise.all([
      getArticles().then((response) => {
        setArticles(response.results);
      }),
      getFeaturedArticles().then((response) => {
        setFeaturedArticles(response.results);
      }),
    ]).finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <main>
      <div className={"mb-2 aspect-video max-h-100 carousel w-full rounded-box"}>
        {featuredArticles.map((article, index) => (
          <Link
            key={index}
            id={`featured${index + 1}`}
            className={"carousel-item w-full relative"}
            href={`/posts/${article.id}`}
          >
            <img className={"absolute size-full object-cover blur-xs brightness-50"} src={article.cover} />
            <div className={"absolute size-full flex items-end"}>
              <div className={"px-6 md:px-16 py-4 md:py-8"}>
                <h2 className={"mb-2 text-2xl md:text-4xl font-bold"}>{article.name}</h2>
                <p className={"text-sm md:text-md text-current/70"}>{article.excerpt}</p>
              </div>
            </div>
            {featuredArticles.length > 1 && (
              <div
                className={
                  "max-md:hidden absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between"
                }
              >
                <Link
                  className={"btn btn-circle"}
                  href={articles[index - 1] ? `#featured${index}` : `#featured${articles.length}`}
                >
                  <ChevronLeftIcon />
                </Link>
                <Link className={"btn btn-circle"} href={articles[index + 1] ? `#featured${index + 2}` : `#featured1`}>
                  <ChevronRightIcon />
                </Link>
              </div>
            )}
          </Link>
        ))}
      </div>
      <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"}>
        {articles.map((article) => (
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