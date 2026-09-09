"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/types/service";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/shared/reveal";

type ServicesPreviewProps = {
  services: Service[];
};

export function ServicesPreview({ services }: ServicesPreviewProps) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

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
              Onze diensten
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-white/75 md:text-right md:text-base">
              Wij bieden meer dan alleen autoverkoop. Met ons complete
              dienstenaanbod maken wij het aan- en verkoopproces van jouw auto
              eenvoudig en zorgeloos.
            </p>
          </div>
        </Reveal>
      </Container>

      {/* Mobile: stacked cards */}
      <ul className="relative z-10 md:hidden">
        {services.map((service) => (
          <li key={service.id} className="relative">
            <Link
              href={`/diensten/${service.slug}`}
              className="relative flex min-h-[320px] flex-col items-center justify-center overflow-hidden px-8 py-16 text-center"
            >
              <Image
                src={service.image}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,20,16,0.25)_0%,rgba(26,20,16,0.6)_50%,rgba(26,20,16,0.88)_100%)]"
                aria-hidden
              />
              <div className="relative z-10 flex flex-col items-center">
                <h3 className="font-display text-3xl text-white">
                  {service.name}
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/80">
                  {service.shortDescription}
                </p>
                <span className="mt-6 inline-flex rounded-full bg-white px-6 py-2.5 text-sm font-medium text-ink">
                  Lees meer
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop: expanding hover accordion */}
      <ul
        className="relative z-10 hidden h-[560px] md:flex lg:h-[640px]"
        onMouseLeave={() => setActiveId(null)}
      >
        {services.map((service) => {
          const isActive = activeId === service.id;
          const hasActive = activeId !== null;

          return (
            <li
              key={service.id}
              className={cn(
                "relative h-full min-w-0 overflow-hidden transition-[flex-grow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isActive ? "flex-[2.6]" : hasActive ? "flex-[0.7]" : "flex-1",
              )}
              onMouseEnter={() => setActiveId(service.id)}
              onFocusCapture={() => setActiveId(service.id)}
            >
              <Link
                href={`/diensten/${service.slug}`}
                className="group relative block h-full w-full outline-offset-[-4px]"
                aria-expanded={isActive}
              >
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 50vw, 40vw"
                  className={cn(
                    "object-cover transition-transform duration-700 ease-out",
                    isActive && "scale-105",
                  )}
                />

                <div
                  className={cn(
                    "absolute inset-0 transition-colors duration-500",
                    isActive
                      ? "bg-[linear-gradient(180deg,rgba(26,20,16,0.45)_0%,rgba(26,20,16,0.72)_100%)]"
                      : "bg-[linear-gradient(180deg,rgba(26,20,16,0.15)_0%,rgba(26,20,16,0.55)_100%)]",
                  )}
                  aria-hidden
                />

                {/* Collapsed label */}
                <div
                  className={cn(
                    "absolute inset-x-0 bottom-0 z-10 flex justify-center px-4 pb-10 transition-opacity duration-300",
                    isActive ? "pointer-events-none opacity-0" : "opacity-100",
                  )}
                >
                  <span className="text-center text-sm font-semibold tracking-wide text-white uppercase md:text-base">
                    {service.name}
                  </span>
                </div>

                {/* Expanded content */}
                <div
                  className={cn(
                    "absolute inset-0 z-10 flex flex-col items-center justify-center px-10 text-center transition-all duration-500",
                    isActive
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-3 opacity-0",
                  )}
                >
                  <h3 className="font-display text-[clamp(2rem,2.5vw+0.5rem,3rem)] leading-tight text-white">
                    {service.name}
                  </h3>
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-white/85 md:text-base">
                    {service.shortDescription}
                  </p>
                  <span className="mt-8 inline-flex rounded-full bg-white px-7 py-2.5 text-sm font-medium text-ink transition-transform duration-300 group-hover:scale-[1.03]">
                    Lees meer
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
