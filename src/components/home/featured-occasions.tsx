import Link from "next/link";
import type { Vehicle } from "@/types/vehicle";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/shared/reveal";
import { VehicleGrid } from "@/components/vehicles/vehicle-grid";

type FeaturedOccasionsProps = {
  vehicles: Vehicle[];
};

export function FeaturedOccasions({ vehicles }: FeaturedOccasionsProps) {
  if (vehicles.length === 0) return null;

  return (
    <section id="occasions" className="bg-paper">
      <Container className="py-16 md:py-20 lg:py-24">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
            <h2 className="shrink-0 font-display text-[clamp(2rem,3vw+1rem,3rem)] leading-tight tracking-[-0.02em] text-ink">
              Uitgelichte occasions
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-muted md:text-right md:text-base">
              Zorgvuldig geselecteerd, grondig gecontroleerd en klaar voor een
              proefrit. Persoonlijk advies zonder druk.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 md:mt-14">
          <VehicleGrid
            vehicles={vehicles}
            priorityCount={2}
            compactTitle
            className="xl:grid-cols-4"
          />
        </div>

        <Reveal delay={0.15}>
          <div className="mt-12 flex justify-center md:mt-14">
            <Link
              href="/occasions"
              className="inline-flex rounded-full bg-ink px-8 py-3 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.03]"
            >
              Bekijk volledig aanbod
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
