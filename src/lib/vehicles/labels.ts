import type {
  BodyType,
  FuelType,
  TransmissionType,
  VehicleQuery,
  VehicleSortKey,
} from "@/types/vehicle";
import { formatMileage, formatPrice } from "@/lib/format";

const fuelLabels: Record<FuelType, string> = {
  benzine: "Benzine",
  diesel: "Diesel",
  elektrisch: "Elektrisch",
  hybride: "Hybride",
  lpg: "LPG",
};

const transmissionLabels: Record<TransmissionType, string> = {
  handgeschakeld: "Handgeschakeld",
  automaat: "Automaat",
};

const bodyLabels: Record<BodyType, string> = {
  hatchback: "Hatchback",
  sedan: "Sedan",
  stationwagen: "Stationwagen",
  suv: "SUV",
  coupe: "Coupé",
  cabriolet: "Cabriolet",
  mpv: "MPV",
  bestelwagen: "Bestelwagen",
};

const sortLabels: Record<VehicleSortKey, string> = {
  newest: "Nieuwste eerst",
  "price-asc": "Prijs: laag → hoog",
  "price-desc": "Prijs: hoog → laag",
  "year-desc": "Bouwjaar: nieuw → oud",
  "mileage-asc": "Kilometerstand: laag → hoog",
};

export function fuelLabel(value: FuelType): string {
  return fuelLabels[value] ?? value;
}

export function transmissionLabel(value: TransmissionType): string {
  return transmissionLabels[value] ?? value;
}

export function bodyLabel(value: BodyType): string {
  return bodyLabels[value] ?? value;
}

export function sortLabel(value: VehicleSortKey): string {
  return sortLabels[value] ?? value;
}

export type FilterChip = {
  id: string;
  label: string;
  clear: Partial<VehicleQuery>;
};

export function getActiveFilterChips(query: VehicleQuery): FilterChip[] {
  const chips: FilterChip[] = [];

  if (query.q) {
    chips.push({
      id: "q",
      label: `Zoek: ${query.q}`,
      clear: { q: undefined },
    });
  }

  query.brand?.forEach((brand) => {
    chips.push({
      id: `brand:${brand}`,
      label: brand,
      clear: {
        brand: query.brand?.filter((item) => item !== brand),
        model: undefined,
      },
    });
  });

  query.model?.forEach((model) => {
    chips.push({
      id: `model:${model}`,
      label: model,
      clear: { model: query.model?.filter((item) => item !== model) },
    });
  });

  if (query.priceMin != null) {
    chips.push({
      id: "priceMin",
      label: `Vanaf ${formatPrice(query.priceMin)}`,
      clear: { priceMin: undefined },
    });
  }

  if (query.priceMax != null) {
    chips.push({
      id: "priceMax",
      label: `Tot ${formatPrice(query.priceMax)}`,
      clear: { priceMax: undefined },
    });
  }

  if (query.yearMin != null) {
    chips.push({
      id: "yearMin",
      label: `Vanaf ${query.yearMin}`,
      clear: { yearMin: undefined },
    });
  }

  if (query.yearMax != null) {
    chips.push({
      id: "yearMax",
      label: `Tot ${query.yearMax}`,
      clear: { yearMax: undefined },
    });
  }

  if (query.mileageMin != null) {
    chips.push({
      id: "mileageMin",
      label: `Vanaf ${formatMileage(query.mileageMin)}`,
      clear: { mileageMin: undefined },
    });
  }

  if (query.mileageMax != null) {
    chips.push({
      id: "mileageMax",
      label: `Tot ${formatMileage(query.mileageMax)}`,
      clear: { mileageMax: undefined },
    });
  }

  query.fuel?.forEach((fuel) => {
    chips.push({
      id: `fuel:${fuel}`,
      label: fuelLabel(fuel),
      clear: { fuel: query.fuel?.filter((item) => item !== fuel) },
    });
  });

  query.transmission?.forEach((transmission) => {
    chips.push({
      id: `transmission:${transmission}`,
      label: transmissionLabel(transmission),
      clear: {
        transmission: query.transmission?.filter(
          (item) => item !== transmission,
        ),
      },
    });
  });

  query.body?.forEach((body) => {
    chips.push({
      id: `body:${body}`,
      label: bodyLabel(body),
      clear: { body: query.body?.filter((item) => item !== body) },
    });
  });

  return chips;
}

export function clearFiltersQuery(query: VehicleQuery): VehicleQuery {
  return {
    sort: query.sort,
  };
}

export function applyQueryPatch(
  query: VehicleQuery,
  patch: Partial<VehicleQuery>,
): VehicleQuery {
  const next: VehicleQuery = { ...query, ...patch };

  (["brand", "model", "fuel", "transmission", "body"] as const).forEach(
    (key) => {
      const value = next[key];
      if (Array.isArray(value) && value.length === 0) {
        next[key] = undefined;
      }
    },
  );

  return next;
}
