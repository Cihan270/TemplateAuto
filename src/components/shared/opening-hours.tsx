import { garage } from "@/config/garage";
import { cn } from "@/lib/cn";

type OpeningHoursProps = {
  className?: string;
  compact?: boolean;
  tone?: "light" | "dark";
};

function formatHours(open: string | null, close: string | null, closed?: boolean) {
  if (closed || !open || !close) return "Gesloten";
  return `${open} – ${close}`;
}

export function OpeningHours({
  className,
  compact = false,
  tone = "light",
}: OpeningHoursProps) {
  const isDark = tone === "dark";

  return (
    <div className={cn("w-full", className)}>
      {!compact ? (
        <h3
          className={cn(
            "mb-3 font-display text-sm font-semibold tracking-wide uppercase",
            isDark ? "text-white/70" : "text-muted",
          )}
        >
          Openingstijden
        </h3>
      ) : null}
      <ul className="space-y-1.5">
        {garage.openingHours.map((entry) => (
          <li
            key={entry.day}
            className={cn(
              "flex items-baseline justify-between gap-6 text-sm",
              isDark ? "text-white/80" : "text-ink",
            )}
          >
            <span className={isDark ? "text-white/55" : "text-muted"}>
              {entry.label}
            </span>
            <span
              className={cn(
                "tabular-nums",
                entry.closed && (isDark ? "text-white/45" : "text-muted"),
              )}
            >
              {formatHours(entry.open, entry.close, entry.closed)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
