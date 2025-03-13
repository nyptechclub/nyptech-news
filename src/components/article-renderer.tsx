import clsx from "clsx";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";
import "react-notion-x/src/styles.css";
import styles from "./article-renderer.module.css";

const Code = dynamic(() => import("react-notion-x/build/third-party/code").then((m) => m.Code));
const Collection = dynamic(() => import("react-notion-x/build/third-party/collection").then((m) => m.Collection));
const Equation = dynamic(() => import("react-notion-x/build/third-party/equation").then((m) => m.Equation));
const Pdf = dynamic(() => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf), {
  ssr: false,
});
const Modal = dynamic(() => import("react-notion-x/build/third-party/modal").then((m) => m.Modal), {
  ssr: false,
});

export default function ArticleRenderer(props: { className?: string; content: ExtendedRecordMap }) {
  return (
    <article className={clsx("py-4 px-6", props.className)}>
      <NotionRenderer
        className={styles.renderer}
        recordMap={props.content}
        darkMode={true}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          Pdf,
          nextImage: Image,
          nextLink: Link,
        }}
      />
    </article>
  );
}