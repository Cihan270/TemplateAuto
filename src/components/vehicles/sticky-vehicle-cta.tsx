"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";
import type { Vehicle } from "@/types/vehicle";
import { garage } from "@/config/garage";
import { buildVehicleWhatsAppMessage } from "@/lib/whatsapp";
import { formatPrice, vehicleTitle } from "@/lib/format";
import { cn } from "@/lib/cn";
import { buttonVariants } from "@/components/ui/button";
import { PhoneLink } from "@/components/shared/phone-link";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";

type StickyVehicleCtaProps = {
  vehicle: Vehicle;
  className?: string;
};

export function StickyVehicleCta({
  vehicle,
  className,
}: StickyVehicleCtaProps) {
  if (vehicle.status === "sold") return null;

  const title = vehicleTitle(vehicle);
  const whatsappMessage = buildVehicleWhatsAppMessage(garage, vehicle);
  const appointmentHref = `/afspraak?occasion=${encodeURIComponent(vehicle.slug)}`;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 shadow-[0_-8px_24px_rgba(16,18,20,0.08)] backdrop-blur-sm md:hidden",
        className,
      )}
    >
      <div className="flex items-center gap-3 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs text-muted">{title}</p>
          <p className="font-display text-base font-semibold text-ink">
            {formatPrice(vehicle.price)}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <PhoneLink
            asButton
            variant="secondary"
            size="icon"
            label=""
          />
          <WhatsAppButton
            message={whatsappMessage}
            label=""
            variant="secondary"
            size="icon"
            className="shrink-0"
          />
          <Link
            href={appointmentHref}
            className={cn(buttonVariants({ variant: "primary", size: "sm" }))}
          >
            <Calendar className="size-4" aria-hidden />
            <span>Proefrit</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
