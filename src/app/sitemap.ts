import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { getAllVehicleSlugs } from "@/lib/repositories/vehicles";
import { getAllServiceSlugs } from "@/lib/repositories/services";

const staticRoutes = [
  "/",
  "/occasions",
  "/diensten",
  "/over-ons",
  "/contact",
  "/afspraak",
  "/privacy",
  "/voorwaarden",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === "/" || path === "/occasions" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/occasions" || path === "/diensten" ? 0.9 : 0.7,
  }));

  const vehicleEntries: MetadataRoute.Sitemap = getAllVehicleSlugs().map(
    (slug) => ({
      url: absoluteUrl(`/occasions/${slug}`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }),
  );

  const serviceEntries: MetadataRoute.Sitemap = getAllServiceSlugs().map(
    (slug) => ({
      url: absoluteUrl(`/diensten/${slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    }),
  );

  return [...staticEntries, ...vehicleEntries, ...serviceEntries];
}
