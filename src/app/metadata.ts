import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Catálogo de Brinquedos",
  description: "Catálogo de brinquedos com Next.js e Tailwind CSS",
  keywords: [
    "brinquedos",
    "jogos",
    "educativos",
    "loja de brinquedos",
    "brinquedos educativos",
    "jogos de tabuleiro",
    "brinquedos para crianças",
    "brinquedos pedagógicos",
  ],
  authors: [
    {
      name: "MuhlStore",
      url: siteConfig.url,
    },
  ],
  creator: "MuhlStore",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@muhlstore",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
}; 