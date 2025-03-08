import clsx from "clsx";
import Link from "next/link";

export default function NavigationBar(props: { className?: string }) {
  return (
    <nav className={clsx("navbar bg-base-300 rounded-box", props.className)}>
      <div className={"navbar-start"}>
        <Link className={"btn btn-ghost"} href={"/"}>
          <span className={"font-bold text-lg"}>SIT Chapters</span>
        </Link>
      </div>
      <div className={"navbar-center"}>
        <Link className={"btn btn-ghost"} href={"#"}>
          Featured
        </Link>
        <Link className={"btn btn-ghost"} href={"#"}>
          Clubs
        </Link>
        <Link className={"btn btn-ghost"} href={"#"}>
          Tech
        </Link>
        <Link className={"btn btn-ghost"} href={"#"}>
          Guides
        </Link>
      </div>
      <div className={"navbar-end"}>
        <Link className={"btn btn-ghost"} href={"/about"}>
          About Us
        </Link>
      </div>
    </nav>
  );
}