import Image from "next/image";
import Link from "next/link";
import { garage } from "@/config/garage";
import { Reveal } from "@/components/shared/reveal";

const pillars = garage.uspItems.slice(0, 3);

export function AboutPreview() {
  return (
    <section className="bg-paper">
      <div className="grid lg:grid-cols-2">
        <Reveal className="relative min-h-[420px] overflow-hidden lg:min-h-[640px]">
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
                Met {garage.stats[0]?.value} jaar ervaring en{" "}
                {garage.stats[2]?.value} tevreden klanten
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-muted md:text-base">
                Wij zijn trots op wat we hebben opgebouwd: een garage waar u
                rustig kunt kiezen, eerlijk advies krijgt en altijd welkom bent —
                voor verkoop én werkplaats.
              </p>
              <Link
                href="/over-ons"
                className="mt-8 inline-flex rounded-full bg-ink px-7 py-2.5 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.03]"
              >
                Ons verhaal
              </Link>
            </div>
          </Reveal>

          <ul className="mt-14 grid max-w-2xl gap-8 border-t border-line pt-12 sm:grid-cols-3 sm:gap-6">
            {pillars.map((item, index) => (
              <li key={item.title}>
                <Reveal delay={0.08 * (index + 1)}>
                  <p className="font-display text-sm tracking-[0.16em] text-muted uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-lg tracking-tight text-ink md:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
