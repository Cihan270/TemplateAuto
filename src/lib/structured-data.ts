import { garage } from "@/config/garage";
import type { Vehicle } from "@/types/vehicle";
import type { Service } from "@/types/service";
import { absoluteUrl } from "@/lib/seo";
import { vehicleTitle } from "@/lib/format";

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function localBusinessJsonLd() {
  const { address, openingHours, coordinates } = garage;

  return {
    "@context": "https://schema.org",
    "@type": ["AutoRepair", "LocalBusiness", "AutomotiveBusiness"],
    name: garage.name,
    legalName: garage.legalName,
    description: garage.description,
    url: garage.website,
    telephone: garage.phone,
    email: garage.email,
    image: absoluteUrl(garage.logo),
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      postalCode: address.postalCode,
      addressLocality: address.city,
      addressRegion: address.region,
      addressCountry: address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    },
    openingHoursSpecification: openingHours
      .filter((entry) => !entry.closed && entry.open && entry.close)
      .map((entry) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${capitalize(entry.day)}`,
        opens: entry.open,
        closes: entry.close,
      })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: garage.reviewScore,
      reviewCount: garage.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    sameAs: Object.values(garage.socials).filter(Boolean),
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function vehicleJsonLd(vehicle: Vehicle) {
  const title = vehicleTitle(vehicle);
  const images =
    vehicle.images.length > 0
      ? vehicle.images.map((src) => absoluteUrl(src))
      : [absoluteUrl("/images/garage/hero.jpg")];

  return {
    "@context": "https://schema.org",
    "@type": ["Product", "Car"],
    name: title,
    description: vehicle.description,
    image: images,
    brand: {
      "@type": "Brand",
      name: vehicle.brand,
    },
    model: vehicle.model,
    vehicleModelDate: String(vehicle.year),
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: vehicle.mileage,
      unitCode: "KMT",
    },
    vehicleTransmission: vehicle.transmission,
    fuelType: vehicle.fuel,
    color: vehicle.color,
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/occasions/${vehicle.slug}`),
      priceCurrency: "EUR",
      ...(vehicle.price > 0 ? { price: vehicle.price } : {}),
      availability:
        vehicle.status === "available"
          ? "https://schema.org/InStock"
          : vehicle.status === "reserved"
            ? "https://schema.org/LimitedAvailability"
            : "https://schema.org/SoldOut",
      itemCondition: "https://schema.org/UsedCondition",
      seller: {
        "@type": "AutoDealer",
        name: garage.name,
      },
    },
  };
}

export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    image: absoluteUrl(service.image),
    provider: {
      "@type": "AutoRepair",
      name: garage.name,
      url: garage.website,
    },
    areaServed: {
      "@type": "City",
      name: garage.address.city,
    },
    url: absoluteUrl(`/diensten/${service.slug}`),
    ...(service.priceFrom != null
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
            price: service.priceFrom,
            url: absoluteUrl(`/diensten/${service.slug}`),
          },
        }
      : {}),
  };
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
