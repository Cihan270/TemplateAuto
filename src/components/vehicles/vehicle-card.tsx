import Image from "next/image";
import Link from "next/link";
import type { Vehicle } from "@/types/vehicle";
import { formatMileage, formatPrice, vehicleTitle } from "@/lib/format";
import { cn } from "@/lib/cn";

const labelCopy: Record<Vehicle["labels"][number], string> = {
  "nieuw-binnen": "Nieuw binnen",
  "btw-auto": "BTW-auto",
};

const statusCopy: Partial<Record<Vehicle["status"], string>> = {
  reserved: "Gereserveerd",
  sold: "Verkocht",
};

type VehicleCardProps = {
  vehicle: Vehicle;
  className?: string;
  priority?: boolean;
  /** Shorter title (brand + model) for homepage highlights */
  compactTitle?: boolean;
};

export function VehicleCard({
  vehicle,
  className,
  priority = false,
  compactTitle = false,
}: VehicleCardProps) {
  const title = compactTitle
    ? `${vehicle.brand} ${vehicle.model}`
    : vehicleTitle(vehicle);
  const image = vehicle.images[0];
  const statusLabel = statusCopy[vehicle.status];
  const doors = vehicle.specifications.doors;

  return (
    <article className={cn("group h-full", className)}>
      <Link
        href={`/occasions/${vehicle.slug}`}
        className="flex h-full flex-col outline-offset-4"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-[#ebe8e4]">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
              className="object-contain object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : null}

          {(vehicle.labels.length > 0 || statusLabel) && (
            <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
              {vehicle.labels.map((label) => (
                <span
                  key={label}
                  className="rounded-full bg-white/95 px-3 py-1 text-xs font-medium tracking-wide text-ink shadow-sm"
                >
                  {labelCopy[label]}
                </span>
              ))}
              {statusLabel ? (
                <span className="rounded-full bg-ink/80 px-3 py-1 text-xs font-medium tracking-wide text-white">
                  {statusLabel}
                </span>
              ) : null}
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col pt-4 md:pt-5">
          <h3 className="font-display text-[clamp(1.2rem,0.9vw+0.85rem,1.55rem)] leading-snug text-ink">
            {title}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-muted">
            {vehicle.year}
            <span className="mx-1.5 text-line" aria-hidden>
              ·
            </span>
            {formatMileage(vehicle.mileage)}
            <span className="mx-1.5 text-line" aria-hidden>
              ·
            </span>
            {vehicle.power} pk
            {doors ? (
              <>
                <span className="mx-1.5 text-line" aria-hidden>
                  ·
                </span>
                {doors} deurs
              </>
            ) : null}
          </p>

          <div className="mt-4 flex items-end justify-between gap-3">
            <p className="font-display text-xl tracking-tight text-ink md:text-2xl">
              {formatPrice(vehicle.price)}
            </p>
            <span className="inline-flex rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition-transform duration-300 group-hover:scale-[1.03]">
              Bekijk
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
