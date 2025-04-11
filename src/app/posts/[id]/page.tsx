"use client";

import LoadingPage from "@/app/loading";
import NotFoundPage from "@/app/not-found";
import ArticleRenderer from "@/components/article-renderer";
import { getArticle, getArticleContent } from "@/lib/database";
import { Article } from "@/lib/schema";
import { useParams } from "next/navigation";
import { ExtendedRecordMap } from "notion-types";
import { parsePageId } from "notion-utils";
import { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [article, setArticle] = useState<Article | null>(null);
  const [articleContent, setArticleContent] = useState<ExtendedRecordMap | null>(null);

  const id = params.id as string;

  useEffect(() => {
    const pageId = parsePageId(id);

    Promise.all([
      getArticle(id).then((post) => {
        setArticle(post);
      }),
      getArticleContent(pageId!).then((content) => {
        setArticleContent(content);
      }),
    ]).finally(() => {
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <LoadingPage />;
  }

  if (!articleContent) {
    return <NotFoundPage />;
  }

  return (
    <main>
      <div className={"sm:w-[90%] md:w-[70%] xl:w-[80%] flex max-xl:flex-col-reverse mx-auto gap-2"}>
        {/* Left Column */}
        <div className={"flex-1"}>
          <div className={"bg-base-300 rounded-box lg:p-4"}>
            <ArticleRenderer content={articleContent!} />
          </div>
        </div>

        {/* Right Column */}
        <div>
          <div className={"lg:sticky lg:top-4 space-y-2"}>
            {/* Post Overview */}
            <div className={"xl:w-80 rounded-box overflow-hidden bg-base-300"}>
              <figure>
                <img src={article?.cover} alt={article?.name} className={"w-full h-full object-cover"} />
              </figure>
              <div className={"p-4"}>
                <div className={"mb-2"}>
                  <h2 className={"mb-1 text-lg font-bold"}>{article?.name}</h2>
                  <p className={"text-current/50"}>{article?.excerpt}</p>
                </div>
                <div className={"flex gap-1"}>
                  {article?.tags.map((tag) => (
                    <span key={tag} className={"badge badge-neutral"}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Clubs List */}
            {(article?.club.length ?? 0) > 0 && (
              <div className={"rounded-box bg-base-300"}>
                <div className={"p-4 pb-0"}>
                  <h2 className={"mb-1 text-lg font-bold"}>Clubs</h2>
                </div>
                <div className={"p-4 pt-2 flex flex-col gap-2"}>
                  {article?.club.map((club) => (
                    <div key={club} className={"gap-3 flex items-center"}>
                      <span className={"avatar"}>
                        <div className={"w-8 rounded-full"}>
                          <img src={"/placeholder.webp"} />
                        </div>
                      </span>
                      <span>{club}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Author List */}
            {(article?.writtenBy.length ?? 0) > 0 && (
              <div className={"rounded-box bg-base-300"}>
                <div className={"p-4 pb-0"}>
                  <h2 className={"mb-1 text-lg font-bold"}>Written By</h2>
                </div>
                <div className={"p-4 pt-2 flex flex-col gap-2"}>
                  {article?.writtenBy.map((author) => (
                    <div key={author.name} className={"gap-3 flex items-center"}>
                      <span className={"avatar"}>
                        <div className={"w-8 rounded-full"}>
                          <img src={author.avatar} />
                        </div>
                      </span>
                      <span>{author.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}