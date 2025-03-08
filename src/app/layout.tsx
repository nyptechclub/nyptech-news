import NavigationBar from "@/components/navigation-bar";
import { geistMono, geistSans } from "@/fonts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SIT Chapters",
};

export default function Layout(props: React.PropsWithChildren) {
  return (
    <html lang={"en"}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className={"p-4 pb-0"}>
          <NavigationBar />
        </div>
        <div>{props.children}</div>
      </body>
    </html>
  );
}