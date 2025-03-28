import NavigationBar from "@/components/navigation-bar";
import { geistMono, geistSans } from "@/fonts";
import clsx from "clsx";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SIT Chapters",
};

export default function Layout(props: React.PropsWithChildren) {
  return (
    <html lang={"en"} data-theme={"dark"}>
      <body className={clsx(geistSans.variable, geistMono.variable, "antialiased flex flex-col gap-2 p-2 lg:p-4")}>
        <div>
          <NavigationBar />
        </div>
        <div className={"flex-1"}>{props.children}</div>
      </body>
    </html>
  );
}