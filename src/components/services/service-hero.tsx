import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import type { Service } from "@/types/service";
import { garage } from "@/config/garage";
import { formatPrice } from "@/lib/format";
import { buildServiceWhatsAppMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { buttonVariants } from "@/components/ui/button";
import { PhoneLink } from "@/components/shared/phone-link";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";

type ServiceHeroProps = {
  service: Service;
  className?: string;
};

export function ServiceHero({ service, className }: ServiceHeroProps) {
  const appointmentHref = `/afspraak?dienst=${encodeURIComponent(service.slug)}`;
  const whatsappMessage = buildServiceWhatsAppMessage(garage, service);

  return (
    <div
      className={cn(
        "grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14 lg:items-end",
        className,
      )}
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-ink md:aspect-[16/10]">
        <Image
          src={service.image}
          alt={service.name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col">
        <p className="font-display text-xs font-semibold tracking-[0.14em] text-muted uppercase">
          Dienst
        </p>
        <h1 className="mt-3 font-display text-[clamp(1.75rem,2vw+1rem,2.75rem)] leading-tight text-ink">
          {service.name}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
          {service.shortDescription}
        </p>

        {service.priceFrom != null ? (
          <p className="mt-6 font-display text-2xl font-semibold text-ink">
            <span className="mr-2 text-sm font-sans font-normal tracking-normal text-muted">
              {service.priceLabel ?? "vanaf"}
            </span>
            {formatPrice(service.priceFrom)}
          </p>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href={appointmentHref}
            className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
          >
            <Calendar className="size-4" aria-hidden />
            Afspraak maken
          </Link>
          <PhoneLink asButton variant="secondary" size="lg" label="Bellen" />
          <WhatsAppButton
            message={whatsappMessage}
            label="WhatsApp"
            variant="secondary"
            size="lg"
          />
        </div>
      </div>
    </div>
  );
}
