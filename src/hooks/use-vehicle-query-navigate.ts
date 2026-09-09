"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { serializeVehicleQuery } from "@/lib/vehicles/query";
import type { VehicleQuery } from "@/types/vehicle";

export function useVehicleQueryNavigate() {
  const router = useRouter();
  const pathname = usePathname();

  return React.useCallback(
    (query: VehicleQuery) => {
      const params = serializeVehicleQuery(query);
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router],
  );
}
