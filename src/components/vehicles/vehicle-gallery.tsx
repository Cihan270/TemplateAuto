"use client";

import * as React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

type VehicleGalleryProps = {
  images: string[];
  alt: string;
  className?: string;
};

export function VehicleGallery({
  images,
  alt,
  className,
}: VehicleGalleryProps) {
  const [selected, setSelected] = React.useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [mobileIndex, setMobileIndex] = React.useState(0);

  React.useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setMobileIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  if (images.length === 0) {
    return (
      <div
        className={cn(
          "aspect-[16/10] border border-line bg-line/40",
          className,
        )}
        aria-label="Geen foto's beschikbaar"
      />
    );
  }

  const safeIndex = Math.min(selected, images.length - 1);
  const mainSrc = images[safeIndex]!;

  return (
    <div className={cn("space-y-3", className)}>
      {/* Mobile: Embla swipe */}
      <div className="md:hidden">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {images.map((src, index) => (
              <div
                key={src}
                className="relative min-w-0 shrink-0 grow-0 basis-full"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-line">
                  <Image
                    src={src}
                    alt={`${alt} — foto ${index + 1}`}
                    fill
                    sizes="100vw"
                    priority={index === 0}
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {images.length > 1 ? (
          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex gap-1.5">
              {images.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  aria-label={`Ga naar foto ${index + 1}`}
                  aria-current={index === mobileIndex}
                  className={cn(
                    "h-1.5 w-6 transition-colors",
                    index === mobileIndex ? "bg-accent" : "bg-line",
                  )}
                  onClick={() => emblaApi?.scrollTo(index)}
                />
              ))}
            </div>
            <p className="text-xs text-muted tabular-nums">
              {mobileIndex + 1} / {images.length}
            </p>
          </div>
        ) : null}
      </div>

      {/* Desktop: main + thumbs */}
      <div className="hidden md:block">
        <div className="relative aspect-[16/10] overflow-hidden bg-line">
          <Image
            src={mainSrc}
            alt={`${alt} — foto ${safeIndex + 1}`}
            fill
            sizes="(max-width: 1200px) 60vw, 720px"
            priority
            className="object-cover transition-opacity duration-300"
          />

          {images.length > 1 ? (
            <>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute top-1/2 left-3 -translate-y-1/2 border-line/80 bg-surface/95 shadow-[0_4px_16px_rgba(16,18,20,0.12)]"
                aria-label="Vorige foto"
                onClick={() =>
                  setSelected((prev) =>
                    prev === 0 ? images.length - 1 : prev - 1,
                  )
                }
              >
                <ChevronLeft className="size-5" aria-hidden />
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute top-1/2 right-3 -translate-y-1/2 border-line/80 bg-surface/95 shadow-[0_4px_16px_rgba(16,18,20,0.12)]"
                aria-label="Volgende foto"
                onClick={() =>
                  setSelected((prev) =>
                    prev === images.length - 1 ? 0 : prev + 1,
                  )
                }
              >
                <ChevronRight className="size-5" aria-hidden />
              </Button>
            </>
          ) : null}
        </div>

        {images.length > 1 ? (
          <ul className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5 lg:grid-cols-6">
            {images.map((src, index) => {
              const active = index === safeIndex;
              return (
                <li key={src}>
                  <button
                    type="button"
                    onClick={() => setSelected(index)}
                    aria-label={`Toon foto ${index + 1}`}
                    aria-current={active}
                    className={cn(
                      "relative aspect-[16/10] w-full overflow-hidden border transition-colors",
                      active
                        ? "border-accent"
                        : "border-transparent hover:border-ink/30",
                    )}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
