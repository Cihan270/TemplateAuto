import { vehicles } from "@/data/vehicles";
import { filterVehicles } from "@/lib/vehicles/filter";
import { searchVehicles } from "@/lib/vehicles/search";
import { sortVehicles } from "@/lib/vehicles/sort";
import { getRelatedVehicles } from "@/lib/vehicles/related";
import type {
  BodyType,
  FuelType,
  TransmissionType,
  Vehicle,
  VehicleQuery,
  VehicleQueryResult,
} from "@/types/vehicle";

export type VehicleFilterFacets = {
  brands: string[];
  models: string[];
  modelsByBrand: Record<string, string[]>;
  fuels: FuelType[];
  transmissions: TransmissionType[];
  bodies: BodyType[];
  price: { min: number; max: number };
  year: { min: number; max: number };
  mileage: { min: number; max: number };
};

export function getVehicles(): Vehicle[] {
  return vehicles;
}

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return vehicles.find((vehicle) => vehicle.slug === slug);
}

export function getAllVehicleSlugs(): string[] {
  return vehicles.map((vehicle) => vehicle.slug);
}

export function getFeaturedVehicles(limit = 6): Vehicle[] {
  return vehicles
    .filter((vehicle) => vehicle.featured && vehicle.status !== "sold")
    .slice(0, limit);
}

export function queryVehicles(query: VehicleQuery): VehicleQueryResult {
  const filtered = filterVehicles(vehicles, query);
  const searched = searchVehicles(filtered, query.q);
  const items = sortVehicles(searched, query.sort);
  return { items, total: items.length };
}

export function getRelatedVehiclesForSlug(
  slug: string,
  limit = 3,
): Vehicle[] {
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) return [];
  return getRelatedVehicles(vehicle, vehicles, limit);
}

export function getVehicleBrands(): string[] {
  return [...new Set(vehicles.map((vehicle) => vehicle.brand))].sort();
}

export function getVehicleModels(brand?: string): string[] {
  const source = brand
    ? vehicles.filter((vehicle) => vehicle.brand === brand)
    : vehicles;
  return [...new Set(source.map((vehicle) => vehicle.model))].sort();
}

export function getVehicleFilterFacets(): VehicleFilterFacets {
  const brands = getVehicleBrands();
  const prices = vehicles.map((vehicle) => vehicle.price);
  const years = vehicles.map((vehicle) => vehicle.year);
  const mileages = vehicles.map((vehicle) => vehicle.mileage);
  const modelsByBrand = Object.fromEntries(
    brands.map((brand) => [brand, getVehicleModels(brand)]),
  );

  return {
    brands,
    models: getVehicleModels(),
    modelsByBrand,
    fuels: [...new Set(vehicles.map((vehicle) => vehicle.fuel))].sort(),
    transmissions: [
      ...new Set(vehicles.map((vehicle) => vehicle.transmission)),
    ].sort(),
    bodies: [...new Set(vehicles.map((vehicle) => vehicle.bodyType))].sort(),
    price: {
      min: Math.min(...prices),
      max: Math.max(...prices),
    },
    year: {
      min: Math.min(...years),
      max: Math.max(...years),
    },
    mileage: {
      min: Math.min(...mileages),
      max: Math.max(...mileages),
    },
  };
}
