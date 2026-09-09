import type { Vehicle, VehicleQuery } from "@/types/vehicle";

export function filterVehicles(
  vehicles: Vehicle[],
  query: VehicleQuery,
): Vehicle[] {
  return vehicles.filter((vehicle) => {
    if (query.brand?.length && !query.brand.includes(vehicle.brand)) {
      return false;
    }
    if (query.model?.length && !query.model.includes(vehicle.model)) {
      return false;
    }
    if (query.fuel?.length && !query.fuel.includes(vehicle.fuel)) {
      return false;
    }
    if (
      query.transmission?.length &&
      !query.transmission.includes(vehicle.transmission)
    ) {
      return false;
    }
    if (query.body?.length && !query.body.includes(vehicle.bodyType)) {
      return false;
    }
    if (query.priceMin != null && vehicle.price < query.priceMin) {
      return false;
    }
    if (query.priceMax != null && vehicle.price > query.priceMax) {
      return false;
    }
    if (query.yearMin != null && vehicle.year < query.yearMin) {
      return false;
    }
    if (query.yearMax != null && vehicle.year > query.yearMax) {
      return false;
    }
    if (query.mileageMin != null && vehicle.mileage < query.mileageMin) {
      return false;
    }
    if (query.mileageMax != null && vehicle.mileage > query.mileageMax) {
      return false;
    }
    return true;
  });
}
