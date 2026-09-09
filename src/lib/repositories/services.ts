import { services } from "@/data/services";
import type { Service } from "@/types/service";

export function getServices(): Service[] {
  return services;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((service) => service.slug);
}

export function getFeaturedServices(limit = 3): Service[] {
  return services.filter((service) => service.featured).slice(0, limit);
}

export function getRelatedServices(slug: string, limit = 3): Service[] {
  const service = getServiceBySlug(slug);
  if (!service) return [];

  const related = service.relatedSlugs
    .map((relatedSlug) => getServiceBySlug(relatedSlug))
    .filter((item): item is Service => Boolean(item));

  if (related.length >= limit) return related.slice(0, limit);

  const extras = services.filter(
    (item) =>
      item.slug !== slug && !service.relatedSlugs.includes(item.slug),
  );

  return [...related, ...extras].slice(0, limit);
}
