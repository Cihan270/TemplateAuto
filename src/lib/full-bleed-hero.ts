/** Routes with a full-bleed page hero under the fixed header. */
export const FULL_BLEED_HERO_PATHS = [
  "/",
  "/occasions",
  "/diensten",
  "/over-ons",
  "/contact",
] as const;

export function hasFullBleedHero(pathname: string): boolean {
  return (FULL_BLEED_HERO_PATHS as readonly string[]).includes(pathname);
}
