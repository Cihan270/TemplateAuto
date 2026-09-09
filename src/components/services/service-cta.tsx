import Link from "next/link";
import type { Service } from "@/types/service";
import { garage } from "@/config/garage";
import { buildServiceWhatsAppMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { buttonVariants } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/shared/reveal";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";

type ServiceCtaProps = {
  service: Service;
};

export function ServiceCta({ service }: ServiceCtaProps) {
  const appointmentHref = `/afspraak?dienst=${encodeURIComponent(service.slug)}`;
  const whatsappMessage = buildServiceWhatsAppMessage(garage, service);

  return (
    <Section tone="ink">
      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-xs font-semibold tracking-[0.14em] text-white/55 uppercase">
            Afspraak maken
          </p>
          <h2 className="mt-3 font-display text-paper">
            {service.name} inplannen?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70 md:text-lg">
            Plan online een moment bij {garage.shortName} in{" "}
            {garage.address.city}, of neem contact op via WhatsApp. We denken
            graag met u mee over planning en kosten.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={appointmentHref}
              className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
            >
              Online afspraak
            </Link>
            <WhatsAppButton
              message={whatsappMessage}
              variant="inverse"
              size="lg"
              label="WhatsApp ons"
            />
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "inverse", size: "lg" }))}
            >
              Contact
            </Link>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
