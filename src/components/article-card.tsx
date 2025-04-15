import { Article } from "@/lib/schema";
import Link from "next/link";

export default function ArticleCard(props: { data: Article }) {
  return (
    <Link
      key={props.data.id}
      className={"card bg-base-300 hover:scale-101 transition"}
      href={`/posts/${props.data.id}`}
      title={props.data.name}
    >
      <figure>
        <img className={"w-full aspect-video object-cover"} src={props.data.cover} />
      </figure>
      <div className={"card-body gap-1"}>
        <span className={"text-xs text-current/80"}>{props.data.clubs[0]}</span>
        <h2 className={"card-title line-clamp-1"}>{props.data.name}</h2>
        <p className={"mb-2 text-current/50 line-clamp-2"}>{props.data.excerpt}</p>
        <div className={"flex gap-1"}>
          {props.data.tags.map((tag) => (
            <span key={tag} className={"badge badge-sm badge-neutral text-xs text-current/80"}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}