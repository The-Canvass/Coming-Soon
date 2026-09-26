import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Outfit, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
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
    icon: [
      { url: "/brand/the-canvas-logo.png", sizes: "any" },
      { url: "/brand/the-canvas-logo.png", type: "image/png" },
    ],
    shortcut: "/brand/the-canvas-logo.png",
    apple: "/brand/the-canvas-logo.png",
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
      className={`dark ${outfit.variable} ${plusJakartaSans.variable} ${spaceGrotesk.variable}`}
    >
      <body className="min-h-screen bg-[#05070d] text-foreground font-sans antialiased selection:bg-macaw-blue/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
