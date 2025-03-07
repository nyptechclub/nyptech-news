import { NotionRenderer } from "react-notion-x";

import dynamic from "next/dynamic";
import { ExtendedRecordMap } from "notion-types";

const Code = dynamic(() => import("react-notion-x/build/third-party/code").then((m) => m.Code));
const Collection = dynamic(() => import("react-notion-x/build/third-party/collection").then((m) => m.Collection));
const Equation = dynamic(() => import("react-notion-x/build/third-party/equation").then((m) => m.Equation));
const Pdf = dynamic(() => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf), {
  ssr: false,
});
const Modal = dynamic(() => import("react-notion-x/build/third-party/modal").then((m) => m.Modal), {
  ssr: false,
});

export default function ArticleRenderer(props: { content: ExtendedRecordMap }) {
  return (
    <NotionRenderer
      recordMap={props.content}
      darkMode={true}
      components={{
        Code,
        Collection,
        Equation,
        Modal,
        Pdf,
      }}
    />
  );
}