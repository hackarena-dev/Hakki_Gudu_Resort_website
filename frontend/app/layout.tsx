import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Nest — Private Nature Retreat",
  description:
    "Escape into a private villa surrounded by forests, farm trails, bonfire nights, and unforgettable starlit experiences at The Nest — a luxury nature retreat.",
  keywords: "luxury nature retreat, eco resort, private villa, forest retreat, The Nest resort",
  openGraph: {
    title: "The Nest — Private Nature Retreat",
    description:
      "Where nature welcomes you home. A private luxury resort nestled in the heart of pristine forests.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
