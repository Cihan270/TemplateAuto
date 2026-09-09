"use client";

import { X } from "lucide-react";
import type { VehicleQuery } from "@/types/vehicle";
import {
  applyQueryPatch,
  clearFiltersQuery,
  getActiveFilterChips,
} from "@/lib/vehicles/labels";
import { useVehicleQueryNavigate } from "@/hooks/use-vehicle-query-navigate";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type ActiveFilterChipsProps = {
  query: VehicleQuery;
  className?: string;
};

export function ActiveFilterChips({
  query,
  className,
}: ActiveFilterChipsProps) {
  const navigate = useVehicleQueryNavigate();
  const chips = getActiveFilterChips(query);

  if (chips.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {chips.map((chip) => (
        <button
          key={chip.id}
          type="button"
          onClick={() => navigate(applyQueryPatch(query, chip.clear))}
          className={cn(
            "inline-flex h-9 items-center gap-1.5 border border-line bg-surface px-3 text-sm text-ink",
            "rounded-[var(--radius-input)]",
            "transition-colors hover:border-ink/40 hover:bg-paper",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          )}
        >
          <span>{chip.label}</span>
          <X className="size-3.5 text-muted" aria-hidden />
          <span className="sr-only">Verwijder filter {chip.label}</span>
        </button>
      ))}
      <Button
        type="button"
        variant="link"
        size="sm"
        className="h-9 px-2"
        onClick={() => navigate(clearFiltersQuery(query))}
      >
        Wis alle filters
      </Button>
    </div>
  );
}
