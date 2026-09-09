import { garage } from "@/config/garage";
import { cn } from "@/lib/cn";

type MapEmbedProps = {
  className?: string;
  title?: string;
};

export function MapEmbed({
  className,
  title = `Kaart van ${garage.name}`,
}: MapEmbedProps) {
  const { lat, lng } = garage.coordinates;
  const src = `https://maps.google.com/maps?q=${lat},${lng}&hl=nl&z=15&output=embed`;

  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden bg-line/40 md:aspect-[16/10]",
        className,
      )}
    >
      <iframe
        title={title}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0 grayscale-[20%]"
        allowFullScreen
      />
    </div>
  );
}
