"use client";

import LoadingPage from "@/app/loading";
import NotFoundPage from "@/app/not-found";
import ArticleRenderer from "@/components/article-renderer";
import { getPostContents } from "@/lib/posts";
import { useParams } from "next/navigation";
import { ExtendedRecordMap } from "notion-types";
import { parsePageId } from "notion-utils";
import { useEffect, useState } from "react";
import "react-notion-x/src/styles.css";

export default function Page() {
  const params = useParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [content, setContent] = useState<ExtendedRecordMap | null>(null);

  const id = params.id as string;

  useEffect(() => {
    const pageId = parsePageId(id);

    getPostContents(pageId!)
      .then((post) => {
        setContent(post);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <LoadingPage />;
  }

  if (!content) {
    return <NotFoundPage />;
  }

  return (
    <main>
      <div className={"my-8 p-8 rounded-box mx-auto w-max bg-base-300"}>
        <article>
          <ArticleRenderer content={content} />
        </article>
      </div>
    </main>
  );
}