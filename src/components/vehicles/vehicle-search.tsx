"use client";

import * as React from "react";
import { Search } from "lucide-react";
import type { VehicleQuery } from "@/types/vehicle";
import { applyQueryPatch } from "@/lib/vehicles/labels";
import { useVehicleQueryNavigate } from "@/hooks/use-vehicle-query-navigate";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";

type VehicleSearchProps = {
  query: VehicleQuery;
  className?: string;
};

export function VehicleSearch({ query, className }: VehicleSearchProps) {
  const navigate = useVehicleQueryNavigate();
  const qFromUrl = query.q ?? "";
  const [value, setValue] = React.useState(qFromUrl);
  const [prevQ, setPrevQ] = React.useState(qFromUrl);

  if (qFromUrl !== prevQ) {
    setPrevQ(qFromUrl);
    setValue(qFromUrl);
  }

  React.useEffect(() => {
    const trimmed = value.trim();
    if (trimmed === qFromUrl) return;

    const timer = window.setTimeout(() => {
      navigate(
        applyQueryPatch(query, {
          q: trimmed || undefined,
        }),
      );
    }, 300);

    return () => window.clearTimeout(timer);
  }, [value, qFromUrl, query, navigate]);

  return (
    <div className={cn("relative", className)}>
      <Search
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
        aria-hidden
      />
      <Input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Zoek op merk, model of uitvoering…"
        aria-label="Zoek occasions"
        className="pl-10"
      />
    </div>
  );
}
