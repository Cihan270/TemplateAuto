import type { CSSProperties } from "react";
import { garage } from "@/config/garage";

/**
 * Vertaalt de kleuren uit de garage-config naar de CSS-variabelen die
 * globals.css en het Tailwind-thema uitlezen. Hierdoor is `garage.colors`
 * de enige plek waar de huisstijl van een vestiging wordt vastgelegd.
 */
export function themeVariables(): CSSProperties {
  const { colors } = garage;

  return {
    "--ink": colors.ink,
    "--paper": colors.paper,
    "--surface": colors.surface,
    "--muted": colors.muted,
    "--line": colors.line,
    "--accent": colors.accent,
    "--accent-hover": colors.accentHover,
    "--success": colors.success,
  } as CSSProperties;
}
