"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { garage } from "@/config/garage";
import { mainNav } from "@/config/navigation";
import { cn } from "@/lib/cn";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { PhoneLink } from "@/components/shared/phone-link";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { OpeningHours } from "@/components/shared/opening-hours";

type MobileNavProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        id="mobile-nav"
        side="right"
        className="w-full max-w-sm gap-0 p-0"
      >
        <SheetHeader>
          <SheetTitle>{garage.shortName}</SheetTitle>
          <SheetDescription>{garage.tagline}</SheetDescription>
        </SheetHeader>

        <nav
          className="flex flex-1 flex-col px-2 py-2"
          aria-label="Mobiele navigatie"
        >
          {mainNav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onOpenChange(false)}
                className={cn(
                  "border-b border-line px-3 py-4 font-display text-lg font-semibold transition-colors",
                  active ? "text-accent" : "text-ink hover:text-accent",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/afspraak"
            onClick={() => onOpenChange(false)}
            className="border-b border-line px-3 py-4 font-display text-lg font-semibold text-ink transition-colors hover:text-accent"
          >
            Afspraak maken
          </Link>
        </nav>

        <div className="space-y-4 border-t border-line px-5 py-5">
          <div className="flex flex-col gap-2">
            <PhoneLink asButton variant="secondary" className="w-full" />
            <WhatsAppButton className="w-full" />
            <Link
              href="/afspraak"
              onClick={() => onOpenChange(false)}
              className={cn(
                buttonVariants({ variant: "primary", size: "md" }),
                "w-full",
              )}
            >
              Afspraak maken
            </Link>
          </div>
          <OpeningHours compact />
        </div>
      </SheetContent>
    </Sheet>
  );
}
