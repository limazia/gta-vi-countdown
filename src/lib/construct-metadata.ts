import { Metadata } from "next";

interface TitleTemplate {
  default: string;
  template: string;
  absolute?: string;
}

function getUrl(url: string) {
  if (typeof window !== "undefined") return url;

  if (process.env.NEXT_PUBLIC_URL) {
    return process.env.NEXT_PUBLIC_URL;
  } else {
    return "http://localhost:3000";
  }
}

export function constructMetadata({
  title = "GTA VI Countdown",
  description = "A simple and stylish countdown to the release of Grand Theft Auto VI. Let the wait begin!",
  image = "/opengraph-image.jpg",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string | TitleTemplate;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
          alt: typeof title === "string" ? title : undefined,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image }],
    },
    icons,
    metadataBase: new URL(getUrl("")),
    ...(noIndex && {
      robots: {
        index: true,
        follow: true,
      },
    }),
  };
}
