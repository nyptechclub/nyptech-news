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
        <div>
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
                <h2 className={"mb-1 text-lg font-bold"}>{article?.name}</h2>
                <p className={"mb-2 text-current/50"}>{article?.excerpt}</p>
                <p>
                  {article?.tags.map((tag) => (
                    <span key={tag} className={"badge badge-primary"}>
                      {tag}
                    </span>
                  ))}
                </p>
              </div>
            </div>

            {/* Author List */}
            <div className={"rounded-box bg-base-300"}>
              <div className={"p-4 pb-0"}>
                <h2 className={"mb-1 text-lg font-bold"}>Written By</h2>
              </div>
              {article?.writtenBy.map((author) => (
                <div key={author.name} className={"p-4 gap-4 flex items-center"}>
                  <span className={"avatar"}>
                    <div className={"w-8 rounded-full"}>
                      <img src={author.avatar} />
                    </div>
                  </span>
                  <span className={"font-medium"}>{author.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}