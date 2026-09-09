"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SkipLink } from "@/components/shared/skip-link";
import { cn } from "@/lib/cn";
import { hasFullBleedHero } from "@/lib/full-bleed-hero";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();

  return (
    <>
      <SkipLink />
      <Header />
      <main
        id="main"
        className={cn(
          "flex flex-1 flex-col",
          !hasFullBleedHero(pathname) && "pt-16 lg:pt-[4.75rem]",
        )}
        tabIndex={-1}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
