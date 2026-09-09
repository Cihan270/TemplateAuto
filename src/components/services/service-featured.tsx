import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/types/service";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/shared/reveal";

type ServiceFeaturedProps = {
  services: Service[];
  className?: string;
};

export function ServiceFeatured({ services, className }: ServiceFeaturedProps) {
  if (services.length === 0) return null;

  const [primary, ...rest] = services;

  return (
    <div className={cn("grid gap-6 lg:grid-cols-12 lg:gap-8", className)}>
      <Reveal className="lg:col-span-7">
        <Link
          href={`/diensten/${primary.slug}`}
          className="group relative block overflow-hidden bg-ink"
        >
          <div className="relative aspect-[16/11] md:aspect-[16/10]">
            <Image
              src={primary.image}
              alt={primary.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent"
              aria-hidden
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <p className="font-display text-xs tracking-[0.14em] text-white/55 uppercase">
              Uitgelicht
            </p>
            <h3 className="mt-2 font-display text-2xl text-white md:text-3xl">
              {primary.name}
            </h3>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/75 md:text-base">
              {primary.shortDescription}
            </p>
            {primary.priceFrom != null ? (
              <p className="mt-4 text-sm font-semibold text-white">
                {primary.priceLabel ?? "vanaf"} {formatPrice(primary.priceFrom)}
              </p>
            ) : null}
          </div>
        </Link>
      </Reveal>

      {rest.length > 0 ? (
        <div className="flex flex-col gap-6 lg:col-span-5">
          {rest.map((service, index) => (
            <Reveal key={service.id} delay={0.06 * (index + 1)}>
              <Link
                href={`/diensten/${service.slug}`}
                className="group flex h-full flex-col border border-line bg-surface transition-colors hover:border-ink/30"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 34vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col px-5 py-5">
                  <h3 className="font-display text-xl text-ink transition-colors group-hover:text-accent">
                    {service.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {service.shortDescription}
                  </p>
                  {service.priceFrom != null ? (
                    <p className="mt-4 text-sm font-semibold text-ink">
                      {service.priceLabel ?? "vanaf"}{" "}
                      {formatPrice(service.priceFrom)}
                    </p>
                  ) : null}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      ) : null}
    </div>
  );
}
