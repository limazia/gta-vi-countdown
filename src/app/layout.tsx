// app/layout.tsx - Usando a nova opção de OG API
import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";

import { constructMetadata } from "@/lib/construct-metadata";
import { ClientOnly } from "@/components/client-only";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = constructMetadata({
  title: "GTA VI Countdown",
  useOgApi: true, // Habilita o uso da API OG dinâmica
});

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