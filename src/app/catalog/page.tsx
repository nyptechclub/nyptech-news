"use client";

import LoadingPage from "@/app/loading";
import { getArticles } from "@/lib/database";
import { Article } from "@/lib/schema";
import clsx from "clsx";
import { FilterIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const availableTags = ["General", "Announcements", "Events"];
const availableClubs = ["NYP Technopreneurs", "NYP Cloud", "NYP Blockchain", "NYP LIT", "NYP GDSC"];

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const [search, setSearch] = useState<string | null>(searchParams.get("search"));
  const [tags, setTags] = useState<string[]>(searchParams.get("tags")?.split(",") ?? []);
  const [club, setClub] = useState<string | null>(searchParams.get("club"));

  function loadArticles() {
    setLoading(true);
    getArticles({
      search: search ?? undefined,
      tags: tags.length > 0 ? tags : undefined,
      clubs: club ? [club] : undefined,
    })
      .then((response) => {
        setArticles(response.results);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams();

    if (search) {
      params.set("search", search);
    }

    if (tags.length > 0) {
      params.set("tags", tags.join(","));
    }

    if (club) {
      params.set("club", club);
    }

    router.push(`/catalog?${params.toString()}`);

    loadArticles();
    setShowFilters(false);
  }

  function handleReset() {
    setSearch(null);
    setTags([]);
    setClub(null);

    router.push("/catalog");

    loadArticles();
    setShowFilters(false);
  }

  useEffect(() => {
    loadArticles();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <main className={"flex max-lg:flex-col gap-2"}>
      {/* Filter Form */}
      <form className={"flex flex-col gap-2 lg:w-80"} onSubmit={handleSubmit}>
        {/* Mobile Search */}
        <div className={"lg:hidden"}>
          <div className={"join w-full"}>
            <button
              className={"btn btn-square join-item btn-secondary"}
              type={"button"}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FilterIcon />
            </button>
            <input
              className={"input join-item flex-1"}
              placeholder={"Search articles..."}
              name={"search"}
              value={search ?? ""}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className={"btn btn-square join-item btn-primary"} type={"submit"}>
              <SearchIcon />
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        <div className={clsx("flex flex-col flex-1 gap-2 bg-base-300 p-4 rounded-box", showFilters || "max-lg:hidden")}>
          <div className={"flex-1"}>
            <fieldset className={"fieldset max-lg:hidden"}>
              <legend className={"fieldset-legend"}>Search</legend>
              <input
                className={"input"}
                placeholder={"Search articles..."}
                name={"search"}
                value={search ?? ""}
                onChange={(e) => setSearch(e.target.value)}
              />
            </fieldset>
            <fieldset className={"fieldset"}>
              <legend className={"fieldset-legend"}>Clubs</legend>
              <label className={"fieldset-label"}>
                <input
                  className={"radio"}
                  name={"club"}
                  type={"radio"}
                  checked={club === null}
                  onChange={(e) => e.target.checked && setClub(null)}
                />
                <span>All Clubs</span>
              </label>
              {availableClubs.map((clubName) => (
                <label key={clubName} className={"fieldset-label"}>
                  <input
                    className={"radio"}
                    name={"club"}
                    type={"radio"}
                    checked={clubName === club}
                    onChange={(e) => e.target.checked && setClub(clubName)}
                  />
                  <span>{clubName}</span>
                </label>
              ))}
            </fieldset>
            <fieldset className={"fieldset"}>
              <legend className={"fieldset-legend"}>Tags</legend>
              {availableTags.map((tag) => (
                <label key={tag} className={"fieldset-label"}>
                  <input
                    className={"checkbox"}
                    name={"tags"}
                    type={"checkbox"}
                    checked={tags.length > 0 ? tags.includes(tag) : true}
                    onChange={(e) => {
                      if (tags.length === 0) {
                        setTags([tag]);
                      } else if (e.target.checked) {
                        setTags((prev) => [...prev, tag]);
                      } else {
                        setTags((prev) => prev.filter((t) => t !== tag));
                      }
                    }}
                  />
                  <span>{tag}</span>
                </label>
              ))}
            </fieldset>
          </div>
          <div className={"mt-2 flex [&>*]:flex-1 gap-2"}>
            <button className={"btn btn-primary"} type={"submit"}>
              Filter
            </button>
            <button className={"btn btn-neutral"} type={"button"} onClick={handleReset}>
              Clear
            </button>
          </div>
        </div>
      </form>

      {/* Articles */}
      <div className={"flex-1 flex flex-col gap-2"}>
        {articles.map((article) => (
          <Link
            key={article.id}
            className={"card hover:scale-101 transition sm:flex-row sm:h-40 bg-base-300 overflow-hidden"}
            href={`/posts/${article.id}`}
          >
            <figure>
              <img className={"aspect-video h-full object-cover"} src={article.cover} alt={article.name} />
            </figure>
            <div className={"card-body p-4"}>
              <div className={"mb-2 flex-1"}>
                <span className={"text-xs text-current/80"}>{article.clubs[0]}</span>
                <h2 className={"mb-1 card-title"}>{article.name}</h2>
                <p className={"text-current/50"}>{article.excerpt}</p>
              </div>
              <div className={"flex gap-1"}>
                {article.tags.map((tag) => (
                  <div key={tag} className={"badge badge-sm badge-neutral"}>
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