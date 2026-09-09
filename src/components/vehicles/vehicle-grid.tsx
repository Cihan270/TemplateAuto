import type { Vehicle } from "@/types/vehicle";
import { cn } from "@/lib/cn";
import { VehicleCard } from "@/components/vehicles/vehicle-card";
import { Reveal } from "@/components/shared/reveal";

type VehicleGridProps = {
  vehicles: Vehicle[];
  className?: string;
  priorityCount?: number;
  compactTitle?: boolean;
};

export function VehicleGrid({
  vehicles,
  className,
  priorityCount = 0,
  compactTitle = false,
}: VehicleGridProps) {
  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-x-7 sm:gap-y-12 xl:grid-cols-3",
        className,
      )}
    >
      {vehicles.map((vehicle, index) => (
        <li key={vehicle.id}>
          <Reveal delay={0.04 * Math.min(index, 8)} className="h-full">
            <VehicleCard
              vehicle={vehicle}
              priority={index < priorityCount}
              compactTitle={compactTitle}
            />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
