import { garage } from "@/config/garage";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/shared/reveal";

export function WhyUs() {
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
              Waarom {garage.shortName}
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-white/75 md:text-right md:text-base">
              Rustig kiezen. Goed geholpen. Showroom en werkplaats onder één
              dak.
            </p>
          </div>
        </Reveal>

        <ul className="mt-14 grid gap-10 border-t border-white/15 pt-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8 lg:pt-16">
          {garage.uspItems.map((item, index) => (
            <li key={item.title}>
              <Reveal delay={0.05 * index}>
                <p className="font-display text-sm tracking-[0.16em] text-white/45">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-display text-xl tracking-tight text-white md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {item.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
