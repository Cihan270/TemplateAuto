import type { Metadata } from "next";
import { garage } from "@/config/garage";

const DEFAULT_OG_IMAGE = "/images/garage/hero.jpg";

type PageMetaInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

export function absoluteUrl(path = "/"): string {
  const base = garage.website.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createPageMetadata({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: garage.name,
      locale: "nl_NL",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

export function rootMetadata(): Metadata {
  return {
    metadataBase: new URL(garage.website),
    title: {
      default: `${garage.name} | Occasions & garage in ${garage.address.city}`,
      template: `%s | ${garage.name}`,
    },
    description: garage.description,
    openGraph: {
      title: `${garage.name} | Occasions & garage in ${garage.address.city}`,
      description: garage.description,
      url: absoluteUrl("/"),
      siteName: garage.name,
      locale: "nl_NL",
      type: "website",
      images: [
        {
          url: absoluteUrl(DEFAULT_OG_IMAGE),
          width: 1200,
          height: 630,
          alt: garage.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${garage.name} | Occasions & garage in ${garage.address.city}`,
      description: garage.description,
      images: [absoluteUrl(DEFAULT_OG_IMAGE)],
    },
  };
}
