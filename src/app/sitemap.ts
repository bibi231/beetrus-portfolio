import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

type ChangeFreq = MetadataRoute.Sitemap[number]["changeFrequency"];

const routes: { path: string; priority: number; changeFrequency: ChangeFreq }[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/music", priority: 0.9, changeFrequency: "weekly" },
  { path: "/work", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/store", priority: 0.7, changeFrequency: "weekly" },
  { path: "/skills", priority: 0.5, changeFrequency: "monthly" },
  { path: "/socials", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
