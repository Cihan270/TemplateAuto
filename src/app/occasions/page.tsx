import type { Metadata } from "next";
import { garage } from "@/config/garage";
import { createPageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import {
  getVehicleFilterFacets,
  queryVehicles,
} from "@/lib/repositories/vehicles";
import {
  countActiveFilters,
  parseVehicleQuery,
} from "@/lib/vehicles/query";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/shared/reveal";
import { PageHero } from "@/components/shared/page-hero";
import { CtaBand } from "@/components/home/cta-band";
import { VehicleGrid } from "@/components/vehicles/vehicle-grid";
import { VehicleSearch } from "@/components/vehicles/vehicle-search";
import { SortSelect } from "@/components/vehicles/sort-select";
import { VehicleFilters } from "@/components/vehicles/vehicle-filters";
import { VehicleFiltersSheet } from "@/components/vehicles/vehicle-filters-sheet";
import { ActiveFilterChips } from "@/components/vehicles/active-filter-chips";
import { EmptyState } from "@/components/vehicles/empty-state";

export const metadata: Metadata = createPageMetadata({
  title: "Occasions",
  description: `Bekijk het actuele occasionaanbod van ${garage.name} in ${garage.address.city}. Filter op merk, prijs, brandstof en meer.`,
  path: "/occasions",
  image: "/images/garage/showroom-cars.jpg",
});

type OccasionsPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function OccasionsPage({
  searchParams,
}: OccasionsPageProps) {
  const params = await searchParams;
  const query = parseVehicleQuery(params);
  const { items, total } = queryVehicles(query);
  const facets = getVehicleFilterFacets();
  const activeFilterCount = countActiveFilters(query);
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Occasions", path: "/occasions" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <PageHero
        title="Occasions"
        description={`Zorgvuldig geselecteerd, grondig gecontroleerd en klaar voor een proefrit bij ${garage.shortName} in ${garage.address.city}.`}
        imageSrc="/images/garage/showroom-cars.jpg"
        imageAlt={`Occasionaanbod in de showroom van ${garage.name}`}
      />

      <section className="bg-paper">
        <Container className="py-14 md:py-16 lg:py-20">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
              <h2 className="shrink-0 font-display text-[clamp(1.75rem,2.5vw+0.75rem,2.5rem)] leading-tight tracking-[-0.02em] text-ink">
                Ons aanbod
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-muted md:text-right md:text-base">
                Zoek, filter en sorteer — deelbare URLs houden je selectie
                bewaard.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12">
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <p className="mb-5 font-display text-sm tracking-wide text-ink uppercase">
                  Filters
                </p>
                <VehicleFilters
                  query={query}
                  facets={facets}
                  idPrefix="desktop-filter"
                />
              </div>
            </aside>

            <div className="min-w-0 space-y-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <VehicleSearch query={query} className="flex-1" />
                <div className="flex flex-wrap items-center gap-3">
                  <VehicleFiltersSheet
                    query={query}
                    facets={facets}
                    resultCount={total}
                  />
                  <SortSelect
                    query={query}
                    className="min-w-[14rem] flex-1 sm:flex-none"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
                <p className="text-sm text-muted" aria-live="polite">
                  <span className="font-medium text-ink">{total}</span>
                  {total === 1 ? " occasion" : " occasions"}
                  {activeFilterCount > 0
                    ? ` · ${activeFilterCount} filter${activeFilterCount === 1 ? "" : "s"} actief`
                    : null}
                </p>
              </div>

              <ActiveFilterChips query={query} />

              {total === 0 ? (
                <EmptyState hasFilters={activeFilterCount > 0} />
              ) : (
                <VehicleGrid vehicles={items} priorityCount={2} />
              )}
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
