import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";
import { garage } from "@/config/garage";
import {
  getAllVehicleSlugs,
  getRelatedVehiclesForSlug,
  getVehicleBySlug,
} from "@/lib/repositories/vehicles";
import { createPageMetadata } from "@/lib/seo";
import {
  breadcrumbJsonLd,
  vehicleJsonLd,
} from "@/lib/structured-data";
import { buildVehicleWhatsAppMessage } from "@/lib/whatsapp";
import { formatMileage, formatPrice, vehicleTitle } from "@/lib/format";
import {
  bodyLabel,
  fuelLabel,
  transmissionLabel,
} from "@/lib/vehicles/labels";
import { cn } from "@/lib/cn";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PhoneLink } from "@/components/shared/phone-link";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { VehicleGallery } from "@/components/vehicles/vehicle-gallery";
import { VehicleSpecs } from "@/components/vehicles/vehicle-specs";
import { VehicleGrid } from "@/components/vehicles/vehicle-grid";
import { StickyVehicleCta } from "@/components/vehicles/sticky-vehicle-cta";
import { Reveal } from "@/components/shared/reveal";

const labelCopy = {
  "nieuw-binnen": "Nieuw binnen",
  "btw-auto": "BTW-auto",
} as const;

const statusCopy = {
  available: "Beschikbaar",
  reserved: "Gereserveerd",
  sold: "Verkocht",
} as const;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllVehicleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) {
    return createPageMetadata({
      title: "Occasion niet gevonden",
      description: `Deze occasion is niet (meer) beschikbaar bij ${garage.name}.`,
      path: `/occasions/${slug}`,
      noIndex: true,
    });
  }

  const title = vehicleTitle(vehicle);
  const description = `${title} — ${vehicle.year}, ${formatMileage(vehicle.mileage)}, ${formatPrice(vehicle.price)}. Bekijk specificaties en plan een proefrit bij ${garage.shortName} in ${garage.address.city}.`;

  return createPageMetadata({
    title,
    description,
    path: `/occasions/${vehicle.slug}`,
    image: vehicle.images[0],
  });
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) {
    notFound();
  }

  const title = vehicleTitle(vehicle);
  const related = getRelatedVehiclesForSlug(vehicle.slug, 3);
  const whatsappMessage = buildVehicleWhatsAppMessage(garage, vehicle);
  const appointmentHref = `/afspraak?occasion=${encodeURIComponent(vehicle.slug)}`;
  const isSold = vehicle.status === "sold";

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Occasions", path: "/occasions" },
    { name: title, path: `/occasions/${vehicle.slug}` },
  ];

  const breadcrumbLd = breadcrumbJsonLd(breadcrumbs);
  const vehicleLd = vehicleJsonLd(vehicle);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vehicleLd) }}
      />

      <Section
        tone="paper"
        className={cn(
          "pt-8 pb-16 md:pt-12 md:pb-24 lg:pt-16",
          !isSold && "pb-28 md:pb-24",
        )}
      >
        <Breadcrumbs items={breadcrumbs} className="mb-8" />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
          <VehicleGallery images={vehicle.images} alt={title} />

          <div className="flex flex-col">
            <div className="flex flex-wrap gap-2">
              {vehicle.labels.map((label) => (
                <Badge key={label} variant="accent">
                  {labelCopy[label]}
                </Badge>
              ))}
              <Badge
                variant={
                  vehicle.status === "available"
                    ? "success"
                    : vehicle.status === "reserved"
                      ? "muted"
                      : "outline"
                }
              >
                {statusCopy[vehicle.status]}
              </Badge>
            </div>

            <h1 className="mt-4 font-display text-[clamp(1.75rem,2vw+1rem,2.75rem)] leading-tight text-ink">
              {title}
            </h1>

            <p className="mt-4 font-display text-2xl font-semibold text-ink md:text-3xl">
              {formatPrice(vehicle.price)}
            </p>

            <p className="mt-4 text-sm text-muted md:text-base">
              <span>{vehicle.year}</span>
              <span className="mx-2 text-line" aria-hidden>
                |
              </span>
              <span>{formatMileage(vehicle.mileage)}</span>
              <span className="mx-2 text-line" aria-hidden>
                |
              </span>
              <span>{fuelLabel(vehicle.fuel)}</span>
              <span className="mx-2 text-line" aria-hidden>
                |
              </span>
              <span>{transmissionLabel(vehicle.transmission)}</span>
              <span className="mx-2 text-line" aria-hidden>
                |
              </span>
              <span>{vehicle.power} pk</span>
              <span className="mx-2 text-line" aria-hidden>
                |
              </span>
              <span>{bodyLabel(vehicle.bodyType)}</span>
            </p>

            {!isSold ? (
              <div className="mt-8 hidden flex-col gap-3 md:flex xl:flex-row">
                <PhoneLink
                  asButton
                  variant="secondary"
                  size="lg"
                  label="Bellen"
                  className="xl:flex-1"
                />
                <WhatsAppButton
                  message={whatsappMessage}
                  label="WhatsApp"
                  variant="secondary"
                  size="lg"
                  className="xl:flex-1"
                />
                <Link
                  href={appointmentHref}
                  className={cn(
                    buttonVariants({ variant: "primary", size: "lg" }),
                    "xl:flex-1",
                  )}
                >
                  <Calendar className="size-4" aria-hidden />
                  Proefrit aanvragen
                </Link>
              </div>
            ) : (
              <p className="mt-8 border border-line bg-surface px-4 py-3 text-sm text-muted">
                Deze occasion is verkocht. Bekijk onze{" "}
                <Link
                  href="/occasions"
                  className="font-semibold text-accent underline-offset-4 hover:underline"
                >
                  actuele voorraad
                </Link>
                .
              </p>
            )}

            <div className="mt-10 border-t border-line pt-8">
              <h2 className="font-display text-lg text-ink">Omschrijving</h2>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {vehicle.description}
              </p>
            </div>

            {vehicle.options.length > 0 ? (
              <div className="mt-8">
                <h2 className="font-display text-lg text-ink">Opties</h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {vehicle.options.map((option) => (
                    <li
                      key={option}
                      className="flex gap-2 text-sm text-muted before:mt-[0.55em] before:size-1 before:shrink-0 before:bg-accent before:content-['']"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        <VehicleSpecs vehicle={vehicle} className="mt-16 md:mt-20" />
      </Section>

      {related.length > 0 ? (
        <Section tone="surface" className={!isSold ? "pb-28 md:pb-24 lg:pb-32" : undefined}>
          <Reveal>
            <SectionHeading
              eyebrow="Vergelijkbaar"
              title="Gerelateerde occasions"
              description="Andere auto’s die aansluiten bij dit model of prijsniveau."
            />
          </Reveal>
          <Reveal delay={0.08} className="mt-10 md:mt-12">
            <VehicleGrid vehicles={related} />
          </Reveal>
          <div className="mt-10">
            <Link
              href="/occasions"
              className={cn(buttonVariants({ variant: "outline", size: "md" }))}
            >
              Alle occasions
            </Link>
          </div>
        </Section>
      ) : null}

      <StickyVehicleCta vehicle={vehicle} />
    </>
  );
}
