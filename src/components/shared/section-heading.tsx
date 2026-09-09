import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  children?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
  children,
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 font-display text-xs font-semibold tracking-[0.14em] uppercase",
            isDark ? "text-white/55" : "text-muted",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className={cn("font-display", isDark ? "text-paper" : "text-ink")}>
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            isDark ? "text-white/70" : "text-muted",
          )}
        >
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}
