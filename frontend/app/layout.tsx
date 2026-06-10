import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Nest — Private Nature Retreat | Luxury Forest Villa",
  description:
    "Escape into The Nest — a private luxury nature retreat surrounded by 2 acres of pristine forest, natural streams, farm trails, and starlit bonfire nights in Karnataka, India.",
  keywords: [
    "luxury nature retreat",
    "private forest villa",
    "eco resort Karnataka",
    "The Nest resort",
    "Coorg nature stay",
    "forest retreat India",
  ].join(", "),
  openGraph: {
    title: "The Nest — Private Nature Retreat",
    description:
      "Where nature welcomes you home. A private luxury resort immersed in pristine forest.",
    type: "website",
    locale: "en_IN",
    siteName: "The Nest Nature Retreat",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Nest — Private Nature Retreat",
    description: "Luxury forest villa escape. Bonfires, streams, stars, and silence.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
