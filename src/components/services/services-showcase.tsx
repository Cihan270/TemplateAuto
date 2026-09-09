import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/types/service";
import { formatPrice } from "@/lib/format";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/shared/reveal";

type ServicesShowcaseProps = {
  services: Service[];
};

export function ServicesShowcase({ services }: ServicesShowcaseProps) {
  if (services.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[#1a1410] text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><path fill='none' stroke='#fff' stroke-width='1.2' d='M60 12 L88 28 V68 L60 108 L32 68 V28 Z'/><path fill='none' stroke='#fff' stroke-width='1' d='M60 28 L76 38 V62 L60 88 L44 62 V38 Z'/></svg>`,
          )}")`,
          backgroundSize: "120px 120px",
        }}
        aria-hidden
      />

      <Container className="relative z-10 py-16 md:py-20 lg:py-24">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
            <h2 className="shrink-0 font-display text-[clamp(2rem,3vw+1rem,3rem)] leading-tight tracking-[-0.02em] text-white">
              Alles onder één dak
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-white/75 md:text-right md:text-base">
              Van keuring tot diagnose — heldere uitleg, eerlijke prijsafspraken
              en vakkundig uitgevoerd werk.
            </p>
          </div>
        </Reveal>
      </Container>

      <ul className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <li key={service.id}>
            <Reveal delay={0.05 * index} className="h-full">
              <Link
                href={`/diensten/${service.slug}`}
                className="group relative flex h-full min-h-[400px] flex-col overflow-hidden outline-offset-[-4px] md:min-h-[460px]"
              >
                <div className="absolute inset-0">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index < 2}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </div>

                <div
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,20,16,0.15)_0%,rgba(26,20,16,0.4)_45%,rgba(26,20,16,0.9)_100%)] transition-opacity duration-500 group-hover:opacity-95"
                  aria-hidden
                />

                <div className="relative z-10 mt-auto flex flex-col px-6 pb-8 pt-24 md:px-8 md:pb-10">
                  <h3 className="font-display text-[clamp(1.75rem,1.5vw+0.75rem,2.25rem)] leading-tight text-white">
                    {service.name}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">
                    {service.shortDescription}
                  </p>

                  <div className="mt-6 flex items-end justify-between gap-3">
                    {service.priceFrom != null ? (
                      <p className="font-display text-xl tracking-tight text-white md:text-2xl">
                        <span className="mr-1.5 text-sm text-white/55">
                          {service.priceLabel ?? "vanaf"}
                        </span>
                        {formatPrice(service.priceFrom)}
                      </p>
                    ) : (
                      <span />
                    )}
                    <span className="inline-flex rounded-full bg-white px-5 py-2 text-sm font-medium text-ink transition-transform duration-300 group-hover:scale-[1.03]">
                      Lees meer
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
