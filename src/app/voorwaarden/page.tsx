import type { Metadata } from "next";
import Link from "next/link";
import { garage } from "@/config/garage";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export const metadata: Metadata = createPageMetadata({
  title: "Voorwaarden",
  description: `Algemene voorwaarden van ${garage.name} in ${garage.address.city}.`,
  path: "/voorwaarden",
});

export default function VoorwaardenPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Voorwaarden", path: "/voorwaarden" },
  ];
  const breadcrumbLd = breadcrumbJsonLd(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <Section tone="paper">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />
        <SectionHeading
          eyebrow="Juridisch"
          title="Algemene voorwaarden"
          description={`Korte demo-voorwaarden voor ${garage.name}. Dit is een stub voor het mastertemplate en geen volledige juridische tekst.`}
        />

        <div className="mt-10 max-w-3xl space-y-8 text-base leading-relaxed text-muted">
          <section className="space-y-3">
            <h3 className="font-display text-ink">Toepasselijkheid</h3>
            <p>
              Deze voorwaarden zijn van toepassing op diensten, occasions en
              afspraken via {garage.name}, gevestigd te {garage.address.city}.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-display text-ink">Aanbod & prijzen</h3>
            <p>
              Occasions en diensten op de website zijn vrijblijvend tot schriftelijke
              bevestiging. Kennelijke fouten in prijs of specificaties kunnen worden
              gecorrigeerd.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-display text-ink">Afspraken</h3>
            <p>
              Proefritten en werkplaatsafspraken worden in overleg gepland. Bij
              verhindering vragen wij u tijdig te annuleren via telefoon of e-mail.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-display text-ink">Garantie & klachten</h3>
            <p>
              Op occasions en reparaties gelden de wettelijke rechten en eventuele
              aanvullende garantie zoals bij aankoop of opdracht bevestigd. Klachten
              kunt u melden via{" "}
              <a
                href={`mailto:${garage.email}`}
                className="text-ink underline-offset-2 hover:underline"
              >
                {garage.email}
              </a>
              .
            </p>
          </section>

          <p className="text-sm">
            Lees ook onze{" "}
            <Link
              href="/privacy"
              className="text-ink underline-offset-2 hover:underline"
            >
              privacyverklaring
            </Link>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
