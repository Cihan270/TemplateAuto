import Link from "next/link";
import { MessageCircle } from "lucide-react";
import type { VariantProps } from "class-variance-authority";
import { garage } from "@/config/garage";
import {
  buildGeneralWhatsAppMessage,
  buildWhatsAppUrl,
} from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { buttonVariants } from "@/components/ui/button";

type WhatsAppButtonProps = {
  className?: string;
  message?: string;
  label?: string;
  showIcon?: boolean;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
};

export function WhatsAppButton({
  className,
  message,
  label = "WhatsApp",
  showIcon = true,
  variant = "secondary",
  size = "md",
}: WhatsAppButtonProps) {
  const text = message ?? buildGeneralWhatsAppMessage(garage);
  const href = buildWhatsAppUrl(garage.whatsapp, text);
  const ariaLabel = `WhatsApp ${garage.shortName}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(buttonVariants({ variant, size }), className)}
      aria-label={ariaLabel}
    >
      {showIcon ? <MessageCircle className="size-4" aria-hidden /> : null}
      {label.trim().length > 0 ? <span>{label}</span> : null}
    </Link>
  );
}
