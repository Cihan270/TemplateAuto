import { garage } from "@/config/garage";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/shared/reveal";

export function StatsBand() {
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
              Cijfers die tellen
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-white/75 md:text-right md:text-base">
              Al {garage.stats[0]?.value} jaar een begrip in{" "}
              {garage.address.city} — voor occasions, onderhoud en eerlijk
              advies.
            </p>
          </div>
        </Reveal>

        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-white/15 pt-14 md:mt-16 md:grid-cols-4 md:gap-8 md:pt-16">
          {garage.stats.map((stat, index) => (
            <Reveal key={stat.label} delay={0.06 * index}>
              <div className="text-center md:text-left">
                <dd className="font-display text-[clamp(2.5rem,3.5vw+1rem,3.75rem)] leading-none tracking-tight text-white">
                  {stat.value}
                </dd>
                <dt className="mt-4 text-sm tracking-wide text-white/55">
                  {stat.label}
                </dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
