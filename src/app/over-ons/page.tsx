import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { garage } from "@/config/garage";
import {
  getFeaturedGallery,
  getFeaturedReviews,
  getTeam,
} from "@/lib/repositories/reviews";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/shared/reveal";
import { PageHero } from "@/components/shared/page-hero";
import { TeamGrid } from "@/components/shared/team-grid";
import { StatsBand } from "@/components/home/stats-band";
import { WhyUs } from "@/components/home/why-us";
import { WorkshopGallery } from "@/components/home/workshop-gallery";
import { Reviews } from "@/components/home/reviews";
import { CtaBand } from "@/components/home/cta-band";

export const metadata: Metadata = createPageMetadata({
  title: "Over ons",
  description: `Leer ${garage.name} in ${garage.address.city} kennen: familiebedrijf met eigen werkplaats, geselecteerde occasions en persoonlijk advies.`,
  path: "/over-ons",
  image: "/images/garage/team.jpg",
});

export default function OverOnsPage() {
  const team = getTeam();
  const gallery = getFeaturedGallery(6);
  const reviews = getFeaturedReviews(3);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Over ons", path: "/over-ons" },
  ];
  const breadcrumbLd = breadcrumbJsonLd(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PageHero
        title="Over ons"
        description={`Familiebedrijf in ${garage.address.city} met showroom en werkplaats onder één dak — eerlijk advies, geselecteerde occasions.`}
        imageSrc="/images/garage/team.jpg"
        imageAlt={`Het team van ${garage.name}`}
      />

      <section className="bg-paper">
        <div className="grid lg:grid-cols-2">
          <Reveal className="relative min-h-[420px] overflow-hidden lg:min-h-[680px]">
            <Image
              src="/images/garage/workshop.jpg"
              alt={`Werkplaats van ${garage.name}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
            />
            <div
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,20,16,0.1)_0%,rgba(26,20,16,0.35)_100%)] lg:bg-[linear-gradient(90deg,rgba(26,20,16,0)_60%,rgba(245,243,241,0.15)_100%)]"
              aria-hidden
            />
          </Reveal>

          <div className="flex flex-col justify-center px-4 py-16 md:px-10 md:py-20 lg:px-16 lg:py-24">
            <Reveal>
              <div className="max-w-lg">
                <h2 className="font-display text-[clamp(2rem,3vw+1rem,3rem)] leading-tight tracking-[-0.02em] text-ink">
                  Al generaties thuis in {garage.address.city}
                </h2>
                <p className="mt-6 text-sm leading-relaxed text-muted md:text-base">
                  Wat begon als een bescheiden werkplaats, groeide uit tot een
                  autobedrijf waar showroom en onderhoud onder één dak zitten.
                  Bij {garage.shortName} koopt u geen auto van een anonieme
                  voorraad — u krijgt advies van mensen die de techniek én de
                  weg kennen.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
                  We selecteren occasions kritisch, keuren ze in eigen huis en
                  blijven beschikbaar na aankoop. Of u nu komt voor een
                  proefrit, APK of periodiek onderhoud: u heeft één
                  aanspreekpunt.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/afspraak"
                    className="inline-flex rounded-full bg-ink px-7 py-2.5 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.03]"
                  >
                    Plan een bezoek
                  </Link>
                  <Link
                    href="/occasions"
                    className="inline-flex rounded-full border border-ink/20 bg-transparent px-7 py-2.5 text-sm font-medium text-ink transition-transform duration-300 hover:scale-[1.03]"
                  >
                    Bekijk occasions
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <StatsBand />

      <section className="bg-paper">
        <Container className="pt-16 md:pt-20 lg:pt-24">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
              <h2 className="shrink-0 font-display text-[clamp(2rem,3vw+1rem,3rem)] leading-tight tracking-[-0.02em] text-ink">
                De mensen achter {garage.shortName}
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-muted md:text-right md:text-base">
                Verkoop, werkplaats en service — een compact team dat u herkent
                bij naam.
              </p>
            </div>
          </Reveal>
        </Container>
        <div className="mt-10 md:mt-14">
          <TeamGrid members={team} />
        </div>
      </section>

      <WhyUs />

      <WorkshopGallery images={gallery} />

      <Reviews reviews={reviews} />

      <CtaBand />
    </>
  );
}
