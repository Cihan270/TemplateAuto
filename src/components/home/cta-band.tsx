import Image from "next/image";
import Link from "next/link";
import { garage } from "@/config/garage";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/shared/reveal";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";

export function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden bg-[#1a1410] py-28 md:py-36 lg:py-44">
      <Image
        src="/images/garage/showroom-cars.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-40"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(26,20,16,0.92)_0%,rgba(26,20,16,0.72)_55%,rgba(26,20,16,0.45)_100%)]"
        aria-hidden
      />

      <Container className="relative z-10">
        <Reveal>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-16">
            <div className="max-w-xl">
              <h2 className="font-display text-[clamp(2.25rem,4vw+1rem,3.75rem)] leading-[1.05] tracking-[-0.03em] text-white">
                Proefrit of onderhoud inplannen?
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/75 md:text-base">
                Bel, appt of plan online een moment bij {garage.shortName}. We
                denken graag met u mee.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 md:shrink-0 md:pb-1">
              <Link
                href="/afspraak"
                className="inline-flex rounded-full bg-white px-7 py-2.5 text-sm font-medium text-ink transition-transform duration-300 hover:scale-[1.03]"
              >
                Online afspraak
              </Link>
              <WhatsAppButton
                variant="inverse"
                size="md"
                label="WhatsApp ons"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
