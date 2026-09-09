import type { Vehicle, VehicleSortKey } from "@/types/vehicle";

export function sortVehicles(
  vehicles: Vehicle[],
  sort: VehicleSortKey = "newest",
): Vehicle[] {
  const sorted = [...vehicles];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "year-desc":
      return sorted.sort((a, b) => b.year - a.year || a.mileage - b.mileage);
    case "mileage-asc":
      return sorted.sort((a, b) => a.mileage - b.mileage);
    case "newest":
    default:
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }
}
