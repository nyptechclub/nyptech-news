import { geistMono, geistSans } from "@/fonts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SIT Chapters",
};

export default function Layout(props: React.PropsWithChildren) {
  return (
    <html lang={"en"}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{props.children}</body>
    </html>
  );
}