"use client";

import LoadingPage from "@/app/loading";
import { getArticles } from "@/lib/database";
import { Article } from "@/lib/schema";
import clsx from "clsx";
import { FilterIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const search = searchParams.get("search") ?? "";
  const tags = searchParams.get("tags")?.split(",") ?? [];
  const club = searchParams.get("club") ?? "all";

  useEffect(() => {
    getArticles()
      .then((response) => {
        setArticles(response.results);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <main className={"flex max-lg:flex-col h-full gap-2"}>
      <form className={"flex flex-col gap-2 lg:w-80"}>
        <div className={"lg:hidden"}>
          <div className={"join w-full"}>
            <button
              className={"btn btn-square join-item btn-primary"}
              type={"button"}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FilterIcon />
            </button>
            <input className={"input join-item flex-1"} placeholder={"Search articles..."} />
            <button className={"btn btn-square join-item btn-primary"} type={"submit"}>
              <SearchIcon />
            </button>
          </div>
        </div>
        <div className={clsx("flex flex-col flex-1 gap-2 bg-base-300 p-4 rounded-box", showFilters || "max-lg:hidden")}>
          <div className={"flex-1"}>
            <fieldset className={"fieldset max-lg:hidden"}>
              <legend className={"fieldset-legend"}>Search</legend>
              <input className={"input"} placeholder={"Search articles..."} />
            </fieldset>
            <fieldset className={"fieldset"}>
              <legend className={"fieldset-legend"}>Clubs</legend>
              <label className={"fieldset-label"}>
                <input className={"checkbox"} type={"checkbox"} defaultChecked />
                <span>Technopreneurship Club</span>
              </label>
              <label className={"fieldset-label"}>
                <input className={"checkbox"} type={"checkbox"} defaultChecked />
                <span>Google Student Developer Club</span>
              </label>
            </fieldset>
          </div>
          <div className={"flex [&>*]:flex-1 gap-2"}>
            <button className={"btn btn-primary"} type={"submit"}>
              Filter
            </button>
            <button className={"btn btn-neutral"} type={"reset"}>
              Clear
            </button>
          </div>
        </div>
      </form>
      <div className={"flex-1 flex flex-col gap-2"}>
        {articles.map((article) => (
          <Link
            key={article.id}
            className={"h-34 lg:h-40 bg-base-300 flex rounded-box overflow-hidden hover:bg-base-200 transition"}
            href={`/posts/${article.id}`}
          >
            <img className={"aspect-video h-full object-cover"} src={article.cover} />
            <div className={"flex-1 p-4 flex flex-col"}>
              <h2 className={"mb-1 text-lg lg:text-2xl font-bold"}>{article.name}</h2>
              <div className={"flex-1"}>
                <p className={"max-lg:text-sm text-current/50"}>{article.excerpt}</p>
              </div>
              <div>
                {article.tags.map((tag) => (
                  <div key={tag} className={"badge max-lg:badge-sm badge-info"}>
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}