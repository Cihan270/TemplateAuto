import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center border px-2 py-0.5 font-sans text-xs font-semibold tracking-wide uppercase",
  {
    variants: {
      variant: {
        default: "border-line bg-paper text-ink",
        accent: "border-accent/20 bg-accent text-white",
        success: "border-success/25 bg-success/10 text-success",
        outline: "border-ink/25 bg-transparent text-ink",
        muted: "border-transparent bg-ink/5 text-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
