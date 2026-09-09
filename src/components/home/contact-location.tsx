import Link from "next/link";
import { garage } from "@/config/garage";
import { cn } from "@/lib/cn";
import { buttonVariants } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/shared/reveal";
import { OpeningHours } from "@/components/shared/opening-hours";
import { PhoneLink } from "@/components/shared/phone-link";
import { MapEmbed } from "@/components/shared/map-embed";

export function ContactLocation() {
  const { address } = garage;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${address.street}, ${address.postalCode} ${address.city}`,
  )}`;

  return (
    <Section tone="paper" id="contact">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          <p className="font-display text-[0.7rem] font-medium tracking-[0.24em] text-muted uppercase">
            Bezoek
          </p>
          <h2 className="mt-4 font-display text-[clamp(2rem,3vw+1rem,3.25rem)] leading-[1.05] tracking-[-0.03em]">
            {address.city}
          </h2>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-muted md:text-lg">
            Showroom en werkplaats op één locatie. Parkeren voor de deur.
          </p>

          <address className="mt-10 not-italic">
            <p className="font-display text-lg tracking-tight text-ink">
              {garage.name}
            </p>
            <p className="mt-2 text-base leading-relaxed text-muted">
              {address.street}
              <br />
              {address.postalCode} {address.city}
            </p>
          </address>

          <div className="mt-8 flex flex-col gap-4">
            <PhoneLink asButton variant="outline" size="md" className="w-fit" />
            <a
              href={`mailto:${garage.email}`}
              className="text-sm font-semibold text-ink underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              {garage.email}
            </a>
          </div>

          <div className="mt-12 border-t border-line pt-10">
            <OpeningHours />
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "primary", size: "md" }))}
            >
              Contact
            </Link>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "md" }))}
            >
              Route plannen
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="overflow-hidden">
            <MapEmbed />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
