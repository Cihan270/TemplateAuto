"use client";

import * as React from "react";
import { SlidersHorizontal } from "lucide-react";
import type { VehicleQuery } from "@/types/vehicle";
import type { VehicleFilterFacets } from "@/lib/repositories/vehicles";
import { countActiveFilters } from "@/lib/vehicles/query";
import { clearFiltersQuery } from "@/lib/vehicles/labels";
import { useVehicleQueryNavigate } from "@/hooks/use-vehicle-query-navigate";
import { VehicleFilters } from "@/components/vehicles/vehicle-filters";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type VehicleFiltersSheetProps = {
  query: VehicleQuery;
  facets: VehicleFilterFacets;
  resultCount: number;
};

export function VehicleFiltersSheet({
  query,
  facets,
  resultCount,
}: VehicleFiltersSheetProps) {
  const [open, setOpen] = React.useState(false);
  const navigate = useVehicleQueryNavigate();
  const activeCount = countActiveFilters(query);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="secondary"
          size="md"
          className="lg:hidden"
          aria-label={
            activeCount > 0
              ? `Filters openen, ${activeCount} actief`
              : "Filters openen"
          }
        >
          <SlidersHorizontal className="size-4" aria-hidden />
          Filters{activeCount > 0 ? ` (${activeCount})` : ""}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-full max-w-md gap-0 p-0"
        showClose
      >
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Verfijn de occasionlijst op merk, prijs en specificaties.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-5 py-5">
          <VehicleFilters
            query={query}
            facets={facets}
            idPrefix="mobile-filter"
          />
        </div>
        <SheetFooter>
          <Button
            type="button"
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => setOpen(false)}
          >
            Toon {resultCount} {resultCount === 1 ? "auto" : "auto’s"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="md"
            className="w-full"
            disabled={activeCount === 0}
            onClick={() => {
              navigate(clearFiltersQuery(query));
            }}
          >
            Filters wissen
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
