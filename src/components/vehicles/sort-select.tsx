"use client";

import type { VehicleQuery, VehicleSortKey } from "@/types/vehicle";
import { applyQueryPatch, sortLabel } from "@/lib/vehicles/labels";
import { useVehicleQueryNavigate } from "@/hooks/use-vehicle-query-navigate";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/cn";

const SORT_OPTIONS: VehicleSortKey[] = [
  "newest",
  "price-asc",
  "price-desc",
  "year-desc",
  "mileage-asc",
];

type SortSelectProps = {
  query: VehicleQuery;
  className?: string;
};

export function SortSelect({ query, className }: SortSelectProps) {
  const navigate = useVehicleQueryNavigate();

  return (
    <div className={cn("min-w-[12rem]", className)}>
      <label className="sr-only" htmlFor="vehicle-sort">
        Sorteer
      </label>
      <Select
        value={query.sort}
        onValueChange={(value) =>
          navigate(
            applyQueryPatch(query, {
              sort: value as VehicleSortKey,
            }),
          )
        }
      >
        <SelectTrigger id="vehicle-sort" aria-label="Sorteer occasions">
          <SelectValue placeholder="Sorteer" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option} value={option}>
              {sortLabel(option)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
