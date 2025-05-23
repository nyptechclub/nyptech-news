import ArticleCard from "@/components/article-card";
import { getArticles, getFeaturedArticles } from "@/lib/database";
import clsx from "clsx";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

export const revalidate = 60; // 1 minute

export default async function Page() {
  const articles = (await getArticles()).results;
  const featuredArticles = (await getFeaturedArticles()).results;

  return (
    <main className={"space-y-2"}>
      {/* Featured Carousel */}
      <section className={"aspect-video max-h-100 carousel w-full rounded-box"}>
        {featuredArticles.map((article, index) => (
          <Link
            key={index}
            id={`featured${index + 1}`}
            className={"carousel-item w-full relative group"}
            href={`/posts/${article.id}`}
          >
            <img
              className={"absolute size-full object-cover blur-xs brightness-60 group-hover:brightness-50 transition"}
              src={article.cover}
            />
            <div className={"absolute size-full flex items-end"}>
              <div className={clsx("px-6 py-4 md:py-6", featuredArticles.length > 1 && "md:px-16")}>
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
      </section>

      {/* All Articles */}
      <section className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"}>
        {articles.map((article) => (
          <ArticleCard key={article.id} data={article} />
        ))}
      </section>
    </main>
  );
}