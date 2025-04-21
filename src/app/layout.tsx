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
      <body className={clsx(geistSans.variable, geistMono.variable, "antialiased grid place-content-center h-dvh")}>
        <div className={"text-center"}>
          <h1 className={"mb-4 font-bold text-4xl"}>SIT Chapters</h1>
          <p className={"text-current/80"}>
            This website is currently closed down for maintainence, we appreciate your patience.
          </p>
        </div>
      </body>
    </html>
  );
}