"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { garage } from "@/config/garage";
import { mainNav } from "@/config/navigation";
import { cn } from "@/lib/cn";
import { hasFullBleedHero } from "@/lib/full-bleed-hero";
import { Container } from "@/components/ui/container";
import { Button, buttonVariants } from "@/components/ui/button";
import { PhoneLink } from "@/components/shared/phone-link";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { MobileNav } from "@/components/layout/mobile-nav";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const overHero = hasFullBleedHero(pathname) && !scrolled && !mobileOpen;

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-40 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300",
        overHero
          ? "border-b border-transparent bg-transparent"
          : "border-b border-line bg-surface/95 shadow-[0_1px_0_rgba(35,25,19,0.06)] backdrop-blur-md",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-[4.75rem]">
        <Link
          href="/"
          className="relative inline-flex shrink-0 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label={`${garage.name} – naar home`}
        >
          <Image
            src={garage.logo}
            alt={garage.name}
            width={160}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Hoofdnavigatie"
        >
          {mainNav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium tracking-wide transition-colors",
                  overHero
                    ? active
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                    : active
                      ? "text-accent"
                      : "text-ink/75 hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <PhoneLink
            asButton
            variant="ghost"
            size="sm"
            className={cn(
              "px-2",
              overHero && "text-white hover:bg-white/10 hover:text-white",
            )}
          />
          <Link
            href="/afspraak"
            className={cn(
              buttonVariants({
                variant: overHero ? "inverse" : "primary",
                size: "sm",
              }),
            )}
          >
            Afspraak maken
          </Link>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <PhoneLink
            asButton
            variant="ghost"
            size="icon"
            label=""
            className={cn(overHero && "text-white hover:bg-white/10")}
          />
          <WhatsAppButton
            variant="ghost"
            size="icon"
            label=""
            className={cn(overHero && "text-white hover:bg-white/10")}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Menu openen"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen(true)}
            className={cn(overHero && "text-white hover:bg-white/10")}
          >
            <Menu className="size-5" aria-hidden />
          </Button>
        </div>
      </Container>

      <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} />
    </header>
  );
}
