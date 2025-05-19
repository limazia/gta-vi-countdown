import "./globals.css";

import { Inter } from "next/font/google";

import { constructMetadata } from "@/lib/construct-metadata";
import { ClientOnly } from "@/components/client-only";

const inter = Inter({
  variable: "--font-inter",
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
      <body className={`${inter.variable} antialiased`}>
        <ClientOnly>{children}</ClientOnly>
      </body>
    </html>
  );
}
