import Link from "next/link";
import { cn } from "@/lib/cn";

type EmptyStateProps = {
  className?: string;
  hasFilters?: boolean;
};

export function EmptyState({ className, hasFilters = false }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-5 bg-[#1a1410] px-8 py-14 text-white md:px-12 md:py-16",
        className,
      )}
    >
      <p className="font-display text-[clamp(1.5rem,2vw+0.5rem,2rem)] text-white">
        Geen occasions gevonden
      </p>
      <p className="max-w-md text-sm leading-relaxed text-white/75 md:text-base">
        {hasFilters
          ? "Er zijn geen auto’s die passen bij je huidige zoekopdracht of filters. Pas de filters aan of wis ze om opnieuw te beginnen."
          : "Momenteel staan er geen occasions in deze selectie. Neem contact op of bekijk later opnieuw."}
      </p>
      {hasFilters ? (
        <Link
          href="/occasions"
          className="inline-flex rounded-full bg-white px-7 py-2.5 text-sm font-medium text-ink transition-transform duration-300 hover:scale-[1.03]"
        >
          Wis alle filters
        </Link>
      ) : (
        <Link
          href="/contact"
          className="inline-flex rounded-full bg-white px-7 py-2.5 text-sm font-medium text-ink transition-transform duration-300 hover:scale-[1.03]"
        >
          Neem contact op
        </Link>
      )}
    </div>
  );
}
