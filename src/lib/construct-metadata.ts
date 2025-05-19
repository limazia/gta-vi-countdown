import { Metadata } from "next";

export function constructMetadata({
  title = "GTA VI Countdown",
  description = "A simple and stylish countdown to the release of Grand Theft Auto VI. Let the wait begin!",
  image = "/opengraph-image.jpg",
  icons = "/favicon.ico",
  noIndex = false,
  useOgApi = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  useOgApi?: boolean;
} = {}): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";

  const finalImageUrl = `${baseUrl}${useOgApi ? "/api/og" : image}`;

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    openGraph: {
      title,
      description,
      url: baseUrl,
      siteName: "GTA VI Countdown",
      images: [
        {
          url: finalImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [finalImageUrl],
    },
    icons,
    ...(noIndex && {
      robots: {
        index: true,
        follow: true,
      },
    }),
  };
}
