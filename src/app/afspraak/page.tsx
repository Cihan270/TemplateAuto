import type { Metadata } from "next";
import Link from "next/link";
import { garage } from "@/config/garage";
import {
  getServiceBySlug,
  getServices,
} from "@/lib/repositories/services";
import { getVehicleBySlug, getVehicles } from "@/lib/repositories/vehicles";
import { getFaq } from "@/lib/repositories/reviews";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { vehicleTitle } from "@/lib/format";
import { buildAppointmentWhatsAppMessage } from "@/lib/whatsapp";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Reveal } from "@/components/shared/reveal";
import { OpeningHours } from "@/components/shared/opening-hours";
import { PhoneLink } from "@/components/shared/phone-link";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { AppointmentForm } from "@/components/forms/appointment-form";
import { ServiceFaqAccordion } from "@/components/services/service-faq";

type AfspraakPageProps = {
  searchParams: Promise<{
    dienst?: string | string[];
    occasion?: string | string[];
  }>;
};

function firstParam(
  value: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export const metadata: Metadata = createPageMetadata({
  title: "Afspraak maken",
  description: `Plan een proefrit, APK of onderhoud bij ${garage.name} in ${garage.address.city}. Online aanvragen, snelle bevestiging.`,
  path: "/afspraak",
  image: "/images/garage/workshop.jpg",
});

export default async function AfspraakPage({ searchParams }: AfspraakPageProps) {
  const params = await searchParams;
  const dienstSlug = firstParam(params.dienst);
  const occasionSlug = firstParam(params.occasion);

  const selectedService = dienstSlug
    ? getServiceBySlug(dienstSlug)
    : undefined;
  const selectedVehicle = occasionSlug
    ? getVehicleBySlug(occasionSlug)
    : undefined;

  const services = getServices().map((service) => ({
    slug: service.slug,
    name: service.name,
  }));

  const vehicles = getVehicles()
    .filter((vehicle) => vehicle.status !== "sold")
    .map((vehicle) => ({
      slug: vehicle.slug,
      label: vehicleTitle(vehicle),
    }));

  const faqItems = getFaq().slice(0, 4).map((item) => ({
    question: item.question,
    answer: item.answer,
  }));

  const whatsappSubject = selectedVehicle
    ? `een proefrit voor de ${vehicleTitle(selectedVehicle)}`
    : selectedService
      ? `een afspraak voor ${selectedService.name}`
      : undefined;

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Afspraak", path: "/afspraak" },
  ];
  const breadcrumbLd = breadcrumbJsonLd(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <Section tone="paper" className="pt-8 pb-16 md:pt-12 md:pb-24 lg:pt-16">
        <Breadcrumbs items={breadcrumbs} className="mb-8" />

        <Reveal>
          <SectionHeading
            eyebrow="Afspraak"
            title="Plan uw bezoek"
            description={`Proefrit, APK of onderhoud: geef uw voorkeur door en we nemen contact op om het moment vast te leggen bij ${garage.shortName} in ${garage.address.city}.`}
          />
        </Reveal>

        {(selectedVehicle || selectedService) && (
          <Reveal className="mt-8">
            <div className="border border-line bg-surface px-5 py-4 text-sm text-muted md:px-6">
              <p className="font-semibold text-ink">Vooraf geselecteerd</p>
              <p className="mt-1">
                {selectedVehicle ? (
                  <>
                    Occasion:{" "}
                    <Link
                      href={`/occasions/${selectedVehicle.slug}`}
                      className="font-semibold text-ink underline-offset-2 hover:underline"
                    >
                      {vehicleTitle(selectedVehicle)}
                    </Link>
                  </>
                ) : null}
                {selectedVehicle && selectedService ? " · " : null}
                {selectedService ? (
                  <>
                    Dienst:{" "}
                    <Link
                      href={`/diensten/${selectedService.slug}`}
                      className="font-semibold text-ink underline-offset-2 hover:underline"
                    >
                      {selectedService.name}
                    </Link>
                  </>
                ) : null}
              </p>
            </div>
          </Reveal>
        )}

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <div className="border border-line bg-surface p-6 md:p-8">
              <h2 className="font-display text-xl text-ink md:text-2xl">
                Afspraakformulier
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">
                Verplicht velden zijn gemarkeerd. U ontvangt een bevestiging
                zodra we een moment hebben afgestemd.
              </p>
              <div className="mt-8">
                <AppointmentForm
                  services={services}
                  vehicles={vehicles}
                  defaultServiceSlug={selectedService?.slug ?? ""}
                  defaultVehicleSlug={selectedVehicle?.slug ?? ""}
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5">
            <div className="space-y-10">
              <div>
                <h2 className="font-display text-xl text-ink">
                  Liever direct contact?
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  Bel of WhatsApp ons — handig als u snel wilt schakelen over
                  planning of beschikbaarheid.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <PhoneLink asButton variant="outline" size="md" className="w-fit" />
                  <WhatsAppButton
                    size="md"
                    className="w-fit"
                    message={buildAppointmentWhatsAppMessage(
                      garage,
                      whatsappSubject,
                    )}
                  />
                </div>
              </div>

              <div className="border-t border-line pt-8">
                <OpeningHours />
              </div>

              <div className="border-t border-line pt-8">
                <p className="font-display text-sm font-semibold tracking-[0.12em] text-muted uppercase">
                  Adres
                </p>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  {garage.address.street}
                  <br />
                  {garage.address.postalCode} {garage.address.city}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {faqItems.length > 0 ? (
        <Section tone="surface">
          <Reveal>
            <SectionHeading
              eyebrow="Veelgestelde vragen"
              title="Voor u belt of boekt"
              description="Korte antwoorden over proefritten, onderhoud en planning."
            />
          </Reveal>
          <div className="mx-auto mt-10 max-w-3xl">
            <ServiceFaqAccordion items={faqItems} />
          </div>
        </Section>
      ) : null}
    </>
  );
}
