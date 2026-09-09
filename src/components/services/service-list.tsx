import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/types/service";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/shared/reveal";

type ServiceListProps = {
  services: Service[];
  className?: string;
};

export function ServiceList({ services, className }: ServiceListProps) {
  if (services.length === 0) return null;

  return (
    <ul className={cn("divide-y divide-line border-y border-line", className)}>
      {services.map((service, index) => (
        <li key={service.id}>
          <Reveal delay={0.04 * index}>
            <Link
              href={`/diensten/${service.slug}`}
              className="group grid gap-6 py-8 transition-colors md:grid-cols-[minmax(0,220px)_minmax(0,1fr)_auto] md:items-center md:gap-10 md:py-10"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-line">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 220px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <div className="min-w-0">
                <h3 className="font-display text-xl text-ink transition-colors group-hover:text-accent md:text-2xl">
                  {service.name}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                  {service.shortDescription}
                </p>
                {service.highlights.length > 0 ? (
                  <p className="mt-3 text-xs tracking-wide text-muted uppercase">
                    {service.highlights.slice(0, 3).join(" · ")}
                  </p>
                ) : null}
              </div>

              <div className="flex items-center justify-between gap-4 md:flex-col md:items-end md:justify-center">
                {service.priceFrom != null ? (
                  <p className="text-sm font-semibold text-ink">
                    <span className="mr-1 font-normal text-muted">
                      {service.priceLabel ?? "vanaf"}
                    </span>
                    {formatPrice(service.priceFrom)}
                  </p>
                ) : (
                  <span className="sr-only">Meer informatie</span>
                )}
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                  Bekijken
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </div>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
