import type { Vehicle } from "@/types/vehicle";

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .trim();
}

export function searchVehicles(vehicles: Vehicle[], q?: string): Vehicle[] {
  if (!q?.trim()) return vehicles;

  const needle = normalize(q);
  const tokens = needle.split(/\s+/).filter(Boolean);

  return vehicles.filter((vehicle) => {
    const haystack = normalize(
      [
        vehicle.brand,
        vehicle.model,
        vehicle.variant,
        `${vehicle.brand} ${vehicle.model}`,
        `${vehicle.brand} ${vehicle.model} ${vehicle.variant}`,
        vehicle.fuel,
        vehicle.transmission,
        vehicle.bodyType,
        vehicle.color,
      ].join(" "),
    );

    return tokens.every((token) => haystack.includes(token));
  });
}
