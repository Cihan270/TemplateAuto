"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import type { GalleryImage } from "@/types/review";
import { garage } from "@/config/garage";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/shared/reveal";

type WorkshopGalleryProps = {
  images: GalleryImage[];
};

export function WorkshopGallery({ images }: WorkshopGalleryProps) {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  if (images.length === 0) return null;

  return (
    <section className="overflow-hidden bg-paper">
      <Container className="pt-16 md:pt-20 lg:pt-24">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16">
            <h2 className="shrink-0 font-display text-[clamp(2rem,3vw+1rem,3rem)] leading-tight tracking-[-0.02em] text-ink">
              Showroom & werkplaats
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-muted md:text-right md:text-base">
              Een indruk van onze ruimte in {garage.address.city} — van
              showroomvloer tot werkplaatsbank.
            </p>
          </div>
        </Reveal>
      </Container>

      <Reveal delay={0.08} className="mt-10 pb-16 md:mt-14 md:pb-24 lg:pb-28">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y gap-3 px-4 md:gap-4 md:px-6 lg:px-8">
            {images.map((image, index) => (
              <div
                key={image.id}
                className={
                  index % 2 === 0
                    ? "relative min-w-0 shrink-0 grow-0 basis-[78%] overflow-hidden sm:basis-[55%] lg:basis-[42%]"
                    : "relative min-w-0 shrink-0 grow-0 basis-[68%] overflow-hidden sm:basis-[48%] lg:basis-[36%]"
                }
              >
                <div
                  className={
                    index % 2 === 0
                      ? "relative aspect-[4/5]"
                      : "relative aspect-[5/6] md:mt-12"
                  }
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1024px) 75vw, 42vw"
                    className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
