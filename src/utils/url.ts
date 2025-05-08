export function getUrl(url: string) {
  if (typeof window !== "undefined") return url;

  if (process.env.NEXT_PUBLIC_URL) {
    return process.env.NEXT_PUBLIC_URL;
  } else {
    return "http://localhost:3000";
  }
}
