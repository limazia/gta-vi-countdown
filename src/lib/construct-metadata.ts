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
  useOgApi = false,
}: {
  title?: string | TitleTemplate;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  useOgApi?: boolean;
} = {}): Metadata {
  const ogApiUrl = `/api/og?cacheBuster=${
    new Date().toISOString().split("T")[0]
  }`;

  const finalImageUrl = useOgApi ? ogApiUrl : image;

  return {
    title: {
      default: typeof title === "string" ? title : title.default,
      template:
        typeof title === "string"
          ? title
          : title.template ?? `%s - ${title.default}`,
      absolute: typeof title === "string" ? undefined : title.absolute,
    },
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: finalImageUrl,
          alt: typeof title === "string" ? title : undefined,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: finalImageUrl }],
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
