"use client";

import LoadingPage from "@/app/loading";
import NotFoundPage from "@/app/not-found";
import ArticleRenderer from "@/components/article-renderer";
import { getPost, getPostContents as getPostContent, Post } from "@/lib/posts";
import { useParams } from "next/navigation";
import { ExtendedRecordMap } from "notion-types";
import { parsePageId } from "notion-utils";
import { useEffect, useState } from "react";
import "react-notion-x/src/styles.css";

export default function Page() {
  const params = useParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [post, setPost] = useState<Post | null>(null);
  const [content, setContent] = useState<ExtendedRecordMap | null>(null);

  const id = params.id as string;

  useEffect(() => {
    const pageId = parsePageId(id);

    Promise.all([
      getPost(id).then((post) => {
        setPost(post);
      }),
      getPostContent(pageId!).then((content) => {
        setContent(content);
      }),
    ]).finally(() => {
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
    <main className={"grid w-max mx-auto grid-cols-[1fr_auto] gap-4 p-4"}>
      {/* Left Column */}
      <article className={"p-4 w-max rounded-box bg-base-300"}>
        <ArticleRenderer content={content} />
      </article>

      {/* Right Column */}
      <div className={"w-80 h-max sticky top-4 flex flex-col gap-2"}>
        {/* Post Overview */}
        <div className={"rounded-box overflow-hidden bg-base-300"}>
          <figure>
            <img src={post?.cover} alt={post?.name} className={"w-full h-full object-cover"} />
          </figure>
          <div className={"p-4"}>
            <h2 className={"mb-1 text-lg font-bold"}>{post?.name}</h2>
            <p className={"mb-2 text-current/50"}>{post?.excerpt}</p>
            <p>
              {post?.tags.map((tag) => (
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
          {post?.writtenBy.map((author) => (
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
    </main>
  );
}