import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Nunito, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const americanTypewriter = localFont({
  src: [
    {
      path: "./fonts/American-Typewriter-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/American-Typewriter-Regular.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-american-typewriter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thecanvas.academy"),
  title: "The Canvas — The Next-Generation Learning Universe | Coming Soon",
  description:
    "An immersive multi-tenant educational platform engineered for effortless understanding. Bite-sized interactive quests, tactile workspaces, and gamified mastery.",
  keywords: [
    "The Canvas",
    "The Canvas Academy",
    "Coming Soon",
    "EdTech",
    "Interactive Learning",
    "Online Education",
    "STEM",
  ],
  icons: {
    icon: "/brand/Tab_Thumbnail.png",
    apple: "/brand/Tab_Thumbnail.png",
  },
  openGraph: {
    title: "The Canvas — The Next-Generation Learning Universe | Coming Soon",
    description:
      "School subjects and creative masterclasses made intuitive, engaging, and simple to master.",
    images: ["/brand/Tab_Thumbnail.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${nunito.variable} ${inter.variable} ${americanTypewriter.variable}`}
    >
      <body className="min-h-screen bg-[#070a13] text-foreground font-sans antialiased selection:bg-macaw-blue/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
