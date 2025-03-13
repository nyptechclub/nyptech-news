import clsx from "clsx";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const links = [
  {
    name: "Featured",
    url: "/catalog/featured",
  },
  {
    name: "Clubs",
    url: "/catalog/clubs",
  },
  {
    name: "Tech",
    url: "/catalog/tech",
  },
  {
    name: "Guides",
    url: "/catalog/guides",
  },
];

export default function NavigationBar(props: { className?: string }) {
  return (
    <nav className={clsx("navbar bg-base-300 rounded-box", props.className)}>
      <div className={"navbar-start"}>
        <div className={"lg:hidden dropdown"}>
          <div tabIndex={0} className={"btn btn-square btn-ghost"} role={"button"}>
            <MenuIcon />
          </div>
          <ul tabIndex={0} className={"dropdown-content menu bg-base-300 rounded-box w-48 p-2 shadow-lg"}>
            {links.map((link) => (
              <li key={link.url}>
                <Link href={link.url}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link className={"btn btn-ghost"} href={"/"}>
          <span className={"font-bold text-lg"}>SIT Chapters</span>
        </Link>
      </div>
      <div className={"navbar-center"}>
        <ul className={"max-lg:hidden menu menu-horizontal"}>
          {links.map((link) => (
            <li key={link.url}>
              <Link href={link.url}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={"navbar-end"}>
        <Link className={"btn btn-ghost"} href={"/about"}>
          About Us
        </Link>
      </div>
    </nav>
  );
}