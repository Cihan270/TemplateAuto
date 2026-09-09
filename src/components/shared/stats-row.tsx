import { cn } from "@/lib/cn";
import type { GarageStat } from "@/types/garage";

type StatsRowProps = {
  stats: GarageStat[];
  tone?: "light" | "dark";
  className?: string;
};

export function StatsRow({
  stats,
  tone = "light",
  className,
}: StatsRowProps) {
  const isDark = tone === "dark";

  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-px md:grid-cols-4",
        isDark ? "bg-white/10" : "bg-line",
        className,
      )}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={cn(
            "flex flex-col gap-2 px-5 py-8 md:px-8 md:py-10",
            isDark ? "bg-ink" : "bg-paper",
          )}
        >
          <dt
            className={cn(
              "order-2 text-sm",
              isDark ? "text-white/55" : "text-muted",
            )}
          >
            {stat.label}
          </dt>
          <dd
            className={cn(
              "order-1 font-display text-3xl tracking-tight md:text-4xl",
              isDark ? "text-paper" : "text-ink",
            )}
          >
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
