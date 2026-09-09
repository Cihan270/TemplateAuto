import type { Metadata } from "next";
import Link from "next/link";
import { garage } from "@/config/garage";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy",
  description: `Privacyverklaring van ${garage.name} in ${garage.address.city}.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Privacy", path: "/privacy" },
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
          title="Privacyverklaring"
          description={`Deze pagina beschrijft beknopt hoe ${garage.name} omgaat met persoonsgegevens. Dit is een demo-stub en geen volledig juridisch advies.`}
        />

        <div className="mt-10 max-w-3xl space-y-8 text-base leading-relaxed text-muted">
          <section className="space-y-3">
            <h3 className="font-display text-ink">Verantwoordelijke</h3>
            <p>
              {garage.legalName}
              <br />
              {garage.address.street}
              <br />
              {garage.address.postalCode} {garage.address.city}
              <br />
              E-mail:{" "}
              <a
                href={`mailto:${garage.email}`}
                className="text-ink underline-offset-2 hover:underline"
              >
                {garage.email}
              </a>
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-display text-ink">Welke gegevens</h3>
            <p>
              Via contact- en afspraakformulieren kunnen wij naam, telefoonnummer,
              e-mailadres en uw bericht verwerken om vragen te beantwoorden of een
              afspraak te plannen.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-display text-ink">Bewaartermijn</h3>
            <p>
              Gegevens worden niet langer bewaard dan nodig voor het doel waarvoor
              ze zijn verzameld, of zolang wettelijke bewaarplichten dat vereisen.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-display text-ink">Uw rechten</h3>
            <p>
              U kunt inzage, correctie of verwijdering van uw gegevens verzoeken
              via{" "}
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
            Zie ook onze{" "}
            <Link
              href="/voorwaarden"
              className="text-ink underline-offset-2 hover:underline"
            >
              voorwaarden
            </Link>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
