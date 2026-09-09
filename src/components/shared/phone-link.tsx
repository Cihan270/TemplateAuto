import Link from "next/link";
import { Phone } from "lucide-react";
import type { VariantProps } from "class-variance-authority";
import { garage } from "@/config/garage";
import { formatPhoneHref } from "@/lib/format";
import { cn } from "@/lib/cn";
import { buttonVariants } from "@/components/ui/button";

type PhoneLinkProps = {
  className?: string;
  showIcon?: boolean;
  label?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  asButton?: boolean;
};

export function PhoneLink({
  className,
  showIcon = true,
  label,
  variant = "ghost",
  size = "md",
  asButton = false,
}: PhoneLinkProps) {
  const href = `tel:${formatPhoneHref(garage.phone)}`;
  const text = label === undefined ? garage.phoneDisplay : label;
  const showText = text.trim().length > 0;

  const content = (
    <>
      {showIcon ? <Phone className="size-4 shrink-0" aria-hidden /> : null}
      {showText ? <span>{text}</span> : null}
    </>
  );

  const ariaLabel = `Bel ${garage.name} op ${garage.phoneDisplay}`;

  if (asButton) {
    return (
      <Link
        href={href}
        className={cn(buttonVariants({ variant, size }), className)}
        aria-label={ariaLabel}
      >
        {content}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-accent",
        className,
      )}
      aria-label={ariaLabel}
    >
      {content}
    </Link>
  );
}
