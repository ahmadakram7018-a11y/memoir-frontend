import type { Metadata } from "next";
import { fraunces, publicSans, caveat } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Memoir — Keep your family's stories, together",
  description:
    "Memoir helps families gather a loved one's life story together, before it's lost — in voices, photos, and memories from everyone who knew them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${publicSans.variable} ${caveat.variable}`}
    >
      <body>
        <div aria-hidden className="grain-overlay" />
        {children}
      </body>
    </html>
  );
}
