import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { garage } from "@/config/garage";
import {
  getAllServiceSlugs,
  getRelatedServices,
  getServiceBySlug,
} from "@/lib/repositories/services";
import { createPageMetadata } from "@/lib/seo";
import {
  breadcrumbJsonLd,
  serviceJsonLd,
} from "@/lib/structured-data";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";
import { Section } from "@/components/ui/section";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Reveal } from "@/components/shared/reveal";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceFaqAccordion } from "@/components/services/service-faq";
import { ServiceCta } from "@/components/services/service-cta";
import { ServiceList } from "@/components/services/service-list";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return createPageMetadata({
      title: "Dienst niet gevonden",
      description: `Deze dienst is niet beschikbaar bij ${garage.name}.`,
      path: `/diensten/${slug}`,
      noIndex: true,
    });
  }

  const pricePart =
    service.priceFrom != null
      ? ` ${service.priceLabel ?? "Vanaf"} ${formatPrice(service.priceFrom)}.`
      : "";

  return createPageMetadata({
    title: service.name,
    description: `${service.shortDescription}${pricePart} Bij ${garage.shortName} in ${garage.address.city}.`,
    path: `/diensten/${service.slug}`,
    image: service.image,
  });
}

export default async function DienstDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const related = getRelatedServices(service.slug, 3);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Diensten", path: "/diensten" },
    { name: service.name, path: `/diensten/${service.slug}` },
  ];

  const breadcrumbLd = breadcrumbJsonLd(breadcrumbs);
  const serviceLd = serviceJsonLd(service);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />

      <Section tone="paper" className="pt-8 pb-16 md:pt-12 md:pb-24 lg:pt-16">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />
        <ServiceHero service={service} />
      </Section>

      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <SectionHeading
              eyebrow="Over deze dienst"
              title="Wat houdt het in?"
              description={service.description}
            />

            {service.highlights.length > 0 ? (
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {service.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 border border-line bg-paper px-4 py-3 text-sm text-ink"
                  >
                    <span
                      className="mt-1.5 size-1.5 shrink-0 bg-accent"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </Reveal>

          <div className="flex flex-col gap-10 lg:col-span-5">
            <Reveal delay={0.06}>
              <h2 className="font-display text-lg text-ink">Wanneer nodig?</h2>
              <ul className="mt-4 space-y-3">
                {service.whenNeeded.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-muted before:mt-[0.55em] before:size-1 before:shrink-0 before:bg-accent before:content-['']"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-display text-lg text-ink">Waarom bij ons?</h2>
              <ul className="mt-4 space-y-3">
                {service.whyUs.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-muted before:mt-[0.55em] before:size-1 before:shrink-0 before:bg-accent before:content-['']"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      {service.faq.length > 0 ? (
        <Section tone="paper">
          <Reveal>
            <SectionHeading
              eyebrow="Veelgestelde vragen"
              title={`FAQ over ${service.name}`}
              description="Antwoorden op de vragen die we het vaakst horen."
            />
          </Reveal>
          <Reveal delay={0.06} className="mt-10 max-w-3xl md:mt-12">
            <ServiceFaqAccordion items={service.faq} />
          </Reveal>
        </Section>
      ) : null}

      <ServiceCta service={service} />

      {related.length > 0 ? (
        <Section tone="surface">
          <Reveal>
            <SectionHeading
              eyebrow="Gerelateerd"
              title="Andere diensten"
              description="Combineer of bekijk wat verder past bij uw auto."
            />
          </Reveal>
          <div className="mt-10 md:mt-12">
            <ServiceList services={related} />
          </div>
          <div className="mt-10">
            <Link
              href="/diensten"
              className={cn(buttonVariants({ variant: "outline", size: "md" }))}
            >
              Alle diensten
            </Link>
          </div>
        </Section>
      ) : null}
    </>
  );
}
