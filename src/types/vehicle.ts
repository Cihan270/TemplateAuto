export type FuelType = "benzine" | "diesel" | "elektrisch" | "hybride" | "lpg";

export type TransmissionType = "handgeschakeld" | "automaat";

export type BodyType =
  | "hatchback"
  | "sedan"
  | "stationwagen"
  | "suv"
  | "coupe"
  | "cabriolet"
  | "mpv"
  | "bestelwagen";

export type VehicleStatus = "available" | "reserved" | "sold";

export type VehicleLabel = "nieuw-binnen" | "btw-auto";

export type VehicleSpecifications = {
  doors?: number;
  seats?: number;
  engineSize?: string;
  emissionClass?: string;
  colorInterior?: string;
  weight?: string;
  consumption?: string;
  acceleration?: string;
  topSpeed?: string;
};

export type Vehicle = {
  id: string;
  slug: string;
  brand: string;
  model: string;
  variant: string;
  price: number;
  year: number;
  mileage: number;
  fuel: FuelType;
  transmission: TransmissionType;
  power: number;
  bodyType: BodyType;
  color: string;
  images: string[];
  featured: boolean;
  status: VehicleStatus;
  labels: VehicleLabel[];
  description: string;
  specifications: VehicleSpecifications;
  options: string[];
  createdAt: string;
};

export type VehicleSortKey =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "year-desc"
  | "mileage-asc";

export type VehicleQuery = {
  q?: string;
  brand?: string[];
  model?: string[];
  priceMin?: number;
  priceMax?: number;
  yearMin?: number;
  yearMax?: number;
  mileageMin?: number;
  mileageMax?: number;
  fuel?: FuelType[];
  transmission?: TransmissionType[];
  body?: BodyType[];
  sort: VehicleSortKey;
};

export type VehicleQueryResult = {
  items: Vehicle[];
  total: number;
};
