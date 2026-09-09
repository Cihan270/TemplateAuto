"use client";

import * as React from "react";
import type {
  BodyType,
  FuelType,
  TransmissionType,
  VehicleQuery,
} from "@/types/vehicle";
import type { VehicleFilterFacets } from "@/lib/repositories/vehicles";
import { formatMileage, formatPrice } from "@/lib/format";
import {
  applyQueryPatch,
  bodyLabel,
  fuelLabel,
  transmissionLabel,
} from "@/lib/vehicles/labels";
import { useVehicleQueryNavigate } from "@/hooks/use-vehicle-query-navigate";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/cn";

type VehicleFiltersProps = {
  query: VehicleQuery;
  facets: VehicleFilterFacets;
  className?: string;
  idPrefix?: string;
};

function modelsForSelectedBrands(
  facets: VehicleFilterFacets,
  brands?: string[],
): string[] {
  if (!brands?.length) return facets.models;
  return [
    ...new Set(brands.flatMap((brand) => facets.modelsByBrand[brand] ?? [])),
  ].sort();
}

function toggleValue<T extends string>(
  current: T[] | undefined,
  value: T,
): T[] | undefined {
  const set = new Set(current ?? []);
  if (set.has(value)) set.delete(value);
  else set.add(value);
  const next = [...set];
  return next.length ? next : undefined;
}

function RangeFilter({
  label,
  min,
  max,
  valueMin,
  valueMax,
  step,
  formatValue,
  onCommit,
}: {
  label: string;
  min: number;
  max: number;
  valueMin?: number;
  valueMax?: number;
  step: number;
  formatValue: (value: number) => string;
  onCommit: (nextMin?: number, nextMax?: number) => void;
}) {
  const [local, setLocal] = React.useState<[number, number]>([
    valueMin ?? min,
    valueMax ?? max,
  ]);

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-display text-sm font-semibold text-ink">{label}</p>
        <p className="text-xs text-muted">
          {formatValue(local[0])} – {formatValue(local[1])}
        </p>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={local}
        onValueChange={(value) => setLocal(value as [number, number])}
        onValueCommit={(value) => {
          const [nextMin, nextMax] = value as [number, number];
          onCommit(
            nextMin <= min ? undefined : nextMin,
            nextMax >= max ? undefined : nextMax,
          );
        }}
        aria-label={label}
      />
    </div>
  );
}

function CheckboxRow({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      htmlFor={id}
      className="flex min-h-10 cursor-pointer items-center gap-3 text-sm text-ink"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={cn(
          "size-4 shrink-0 border border-line accent-accent",
          "rounded-[var(--radius-input)]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        )}
      />
      <span>{label}</span>
    </label>
  );
}

export function VehicleFilters({
  query,
  facets,
  className,
  idPrefix = "filter",
}: VehicleFiltersProps) {
  const navigate = useVehicleQueryNavigate();
  const models = React.useMemo(
    () => modelsForSelectedBrands(facets, query.brand),
    [facets, query.brand],
  );

  const push = React.useCallback(
    (patch: Partial<VehicleQuery>) => {
      navigate(applyQueryPatch(query, patch));
    },
    [navigate, query],
  );

  return (
    <div className={cn("space-y-8", className)}>
      <fieldset className="space-y-2">
        <legend className="font-display text-sm font-semibold text-ink">
          Merk
        </legend>
        <div className="space-y-1">
          {facets.brands.map((brand) => (
            <CheckboxRow
              key={brand}
              id={`${idPrefix}-brand-${brand}`}
              label={brand}
              checked={query.brand?.includes(brand) ?? false}
              onChange={() => {
                const nextBrand = toggleValue(query.brand, brand);
                const allowedModels = new Set(
                  modelsForSelectedBrands(facets, nextBrand),
                );
                push({
                  brand: nextBrand,
                  model: query.model?.filter((model) =>
                    allowedModels.has(model),
                  ),
                });
              }}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="font-display text-sm font-semibold text-ink">
          Model
        </legend>
        <div className="space-y-1">
          {models.map((model) => (
            <CheckboxRow
              key={model}
              id={`${idPrefix}-model-${model}`}
              label={model}
              checked={query.model?.includes(model) ?? false}
              onChange={() =>
                push({ model: toggleValue(query.model, model) })
              }
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="font-display text-sm font-semibold text-ink">
          Brandstof
        </legend>
        <div className="space-y-1">
          {facets.fuels.map((fuel) => (
            <CheckboxRow
              key={fuel}
              id={`${idPrefix}-fuel-${fuel}`}
              label={fuelLabel(fuel)}
              checked={query.fuel?.includes(fuel) ?? false}
              onChange={() =>
                push({
                  fuel: toggleValue(query.fuel, fuel as FuelType),
                })
              }
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="font-display text-sm font-semibold text-ink">
          Transmissie
        </legend>
        <div className="space-y-1">
          {facets.transmissions.map((transmission) => (
            <CheckboxRow
              key={transmission}
              id={`${idPrefix}-transmission-${transmission}`}
              label={transmissionLabel(transmission)}
              checked={query.transmission?.includes(transmission) ?? false}
              onChange={() =>
                push({
                  transmission: toggleValue(
                    query.transmission,
                    transmission as TransmissionType,
                  ),
                })
              }
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="font-display text-sm font-semibold text-ink">
          Carrosserie
        </legend>
        <div className="space-y-1">
          {facets.bodies.map((body) => (
            <CheckboxRow
              key={body}
              id={`${idPrefix}-body-${body}`}
              label={bodyLabel(body)}
              checked={query.body?.includes(body) ?? false}
              onChange={() =>
                push({
                  body: toggleValue(query.body, body as BodyType),
                })
              }
            />
          ))}
        </div>
      </fieldset>

      <RangeFilter
        key={`price-${query.priceMin ?? "min"}-${query.priceMax ?? "max"}`}
        label="Prijs"
        min={facets.price.min}
        max={facets.price.max}
        valueMin={query.priceMin}
        valueMax={query.priceMax}
        step={500}
        formatValue={formatPrice}
        onCommit={(priceMin, priceMax) => push({ priceMin, priceMax })}
      />

      <RangeFilter
        key={`year-${query.yearMin ?? "min"}-${query.yearMax ?? "max"}`}
        label="Bouwjaar"
        min={facets.year.min}
        max={facets.year.max}
        valueMin={query.yearMin}
        valueMax={query.yearMax}
        step={1}
        formatValue={(value) => String(value)}
        onCommit={(yearMin, yearMax) => push({ yearMin, yearMax })}
      />

      <RangeFilter
        key={`mileage-${query.mileageMin ?? "min"}-${query.mileageMax ?? "max"}`}
        label="Kilometerstand"
        min={facets.mileage.min}
        max={facets.mileage.max}
        valueMin={query.mileageMin}
        valueMax={query.mileageMax}
        step={1000}
        formatValue={formatMileage}
        onCommit={(mileageMin, mileageMax) =>
          push({ mileageMin, mileageMax })
        }
      />
    </div>
  );
}
