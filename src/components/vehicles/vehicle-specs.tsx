import type { Vehicle } from "@/types/vehicle";
import { formatMileage } from "@/lib/format";
import {
  bodyLabel,
  fuelLabel,
  transmissionLabel,
} from "@/lib/vehicles/labels";
import { cn } from "@/lib/cn";

type SpecRow = {
  label: string;
  value: string;
};

type VehicleSpecsProps = {
  vehicle: Vehicle;
  className?: string;
};

function buildSpecRows(vehicle: Vehicle): SpecRow[] {
  const { specifications } = vehicle;
  const rows: SpecRow[] = [
    { label: "Bouwjaar", value: String(vehicle.year) },
    { label: "Kilometerstand", value: formatMileage(vehicle.mileage) },
    { label: "Brandstof", value: fuelLabel(vehicle.fuel) },
    { label: "Transmissie", value: transmissionLabel(vehicle.transmission) },
    { label: "Vermogen", value: `${vehicle.power} pk` },
    { label: "Carrosserie", value: bodyLabel(vehicle.bodyType) },
    { label: "Kleur", value: vehicle.color },
  ];

  if (specifications.doors != null) {
    rows.push({ label: "Deuren", value: String(specifications.doors) });
  }
  if (specifications.seats != null) {
    rows.push({ label: "Zitplaatsen", value: String(specifications.seats) });
  }
  if (specifications.engineSize) {
    rows.push({ label: "Motorinhoud", value: `${specifications.engineSize} L` });
  }
  if (specifications.emissionClass) {
    rows.push({
      label: "Emissieklasse",
      value: specifications.emissionClass,
    });
  }
  if (specifications.colorInterior) {
    rows.push({
      label: "Interieur",
      value: specifications.colorInterior,
    });
  }
  if (specifications.consumption) {
    rows.push({
      label: "Verbruik",
      value: specifications.consumption,
    });
  }
  if (specifications.acceleration) {
    rows.push({
      label: "0–100 km/u",
      value: specifications.acceleration,
    });
  }
  if (specifications.topSpeed) {
    rows.push({ label: "Topsnelheid", value: specifications.topSpeed });
  }
  if (specifications.weight) {
    rows.push({ label: "Gewicht", value: specifications.weight });
  }

  return rows;
}

export function VehicleSpecs({ vehicle, className }: VehicleSpecsProps) {
  const rows = buildSpecRows(vehicle);

  return (
    <div className={cn(className)}>
      <h2 className="font-display text-xl text-ink md:text-2xl">
        Specificaties
      </h2>
      <dl className="mt-6 grid grid-cols-1 border-t border-line sm:grid-cols-2">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-4 border-b border-line py-3.5 pr-4 sm:odd:pr-8 sm:even:pl-8"
          >
            <dt className="text-sm text-muted">{row.label}</dt>
            <dd className="text-sm font-semibold text-ink text-right">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
