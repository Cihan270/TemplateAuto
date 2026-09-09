import type {
  BodyType,
  FuelType,
  TransmissionType,
  VehicleQuery,
  VehicleSortKey,
} from "@/types/vehicle";

type SearchParamsLike = Record<string, string | string[] | undefined>;

const SORT_KEYS: VehicleSortKey[] = [
  "newest",
  "price-asc",
  "price-desc",
  "year-desc",
  "mileage-asc",
];

function firstValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

function parseList(value: string | string[] | undefined): string[] | undefined {
  const raw = firstValue(value);
  if (!raw?.trim()) return undefined;
  const items = raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  return items.length ? items : undefined;
}

function parseNumber(value: string | string[] | undefined): number | undefined {
  const raw = firstValue(value);
  if (raw == null || raw === "") return undefined;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function parseSort(value: string | string[] | undefined): VehicleSortKey {
  const raw = firstValue(value) as VehicleSortKey | undefined;
  if (raw && SORT_KEYS.includes(raw)) return raw;
  return "newest";
}

export function parseVehicleQuery(searchParams: SearchParamsLike): VehicleQuery {
  return {
    q: firstValue(searchParams.q)?.trim() || undefined,
    brand: parseList(searchParams.brand),
    model: parseList(searchParams.model),
    priceMin: parseNumber(searchParams.priceMin),
    priceMax: parseNumber(searchParams.priceMax),
    yearMin: parseNumber(searchParams.yearMin),
    yearMax: parseNumber(searchParams.yearMax),
    mileageMin: parseNumber(searchParams.mileageMin),
    mileageMax: parseNumber(searchParams.mileageMax),
    fuel: parseList(searchParams.fuel) as FuelType[] | undefined,
    transmission: parseList(searchParams.transmission) as
      | TransmissionType[]
      | undefined,
    body: parseList(searchParams.body) as BodyType[] | undefined,
    sort: parseSort(searchParams.sort),
  };
}

export function serializeVehicleQuery(
  query: Partial<VehicleQuery>,
): URLSearchParams {
  const params = new URLSearchParams();

  if (query.q?.trim()) params.set("q", query.q.trim());
  if (query.brand?.length) params.set("brand", query.brand.join(","));
  if (query.model?.length) params.set("model", query.model.join(","));
  if (query.priceMin != null) params.set("priceMin", String(query.priceMin));
  if (query.priceMax != null) params.set("priceMax", String(query.priceMax));
  if (query.yearMin != null) params.set("yearMin", String(query.yearMin));
  if (query.yearMax != null) params.set("yearMax", String(query.yearMax));
  if (query.mileageMin != null) {
    params.set("mileageMin", String(query.mileageMin));
  }
  if (query.mileageMax != null) {
    params.set("mileageMax", String(query.mileageMax));
  }
  if (query.fuel?.length) params.set("fuel", query.fuel.join(","));
  if (query.transmission?.length) {
    params.set("transmission", query.transmission.join(","));
  }
  if (query.body?.length) params.set("body", query.body.join(","));
  if (query.sort && query.sort !== "newest") params.set("sort", query.sort);

  return params;
}

export function countActiveFilters(query: VehicleQuery): number {
  let count = 0;
  if (query.q) count += 1;
  if (query.brand?.length) count += query.brand.length;
  if (query.model?.length) count += query.model.length;
  if (query.priceMin != null) count += 1;
  if (query.priceMax != null) count += 1;
  if (query.yearMin != null) count += 1;
  if (query.yearMax != null) count += 1;
  if (query.mileageMin != null) count += 1;
  if (query.mileageMax != null) count += 1;
  if (query.fuel?.length) count += query.fuel.length;
  if (query.transmission?.length) count += query.transmission.length;
  if (query.body?.length) count += query.body.length;
  return count;
}
