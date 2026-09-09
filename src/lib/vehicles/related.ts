import type { Vehicle } from "@/types/vehicle";

export function getRelatedVehicles(
  vehicle: Vehicle,
  all: Vehicle[],
  limit = 3,
): Vehicle[] {
  const others = all.filter(
    (item) => item.id !== vehicle.id && item.status !== "sold",
  );

  const sameBrand = others.filter((item) => item.brand === vehicle.brand);
  const sameBody = others.filter((item) => item.bodyType === vehicle.bodyType);

  const byPrice = [...others].sort(
    (a, b) =>
      Math.abs(a.price - vehicle.price) - Math.abs(b.price - vehicle.price),
  );

  const selected: Vehicle[] = [];
  const seen = new Set<string>();

  for (const candidate of [...sameBrand, ...sameBody, ...byPrice]) {
    if (seen.has(candidate.id)) continue;
    seen.add(candidate.id);
    selected.push(candidate);
    if (selected.length >= limit) break;
  }

  return selected;
}
