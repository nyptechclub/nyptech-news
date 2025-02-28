"use client";

import { getPostContents } from "@/lib/posts";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";

export default function Page() {
  const params = useParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [content, setContent] = useState<string>("");

  const id = params.id as string;

  useEffect(() => {
    getPostContents(id)
      .then((content) => {
        setContent(content);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <main>Loading...</main>;
  }

  return (
    <main>
      <article className={"prose"}>
        <Markdown>{content}</Markdown>
      </article>
    </main>
  );
}