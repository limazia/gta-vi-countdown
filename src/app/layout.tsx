import "./globals.css";

import { type Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { getUrl } from "@/utils/url";

import { ClientOnly } from "@/components/client-only";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "GTA VI Countdown",
    template: `%s - GTA VI Countdown`,
  },
  description:
    "A simple and stylish countdown to the release of Grand Theft Auto VI. Let the wait begin!",
  openGraph: {
    title: "GTA VI Countdown",
    description:
      "A simple and stylish countdown to the release of Grand Theft Auto VI. Let the wait begin!",
    images: [
      {
        url: "/opengraph-image.jpg",
        alt: "GTA VI Countdown",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GTA VI Countdown",
    description:
      "A simple and stylish countdown to the release of Grand Theft Auto VI. Let the wait begin!",
    images: [{ url: "/twitter-image.jpg" }],
  },
  icons: "/favicon.ico",
  metadataBase: new URL(getUrl("")),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientOnly>{children}</ClientOnly>
      </body>
    </html>
  );
}
