import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-full font-sans text-sm font-medium tracking-wide",
    "transition-colors duration-150",
    "disabled:pointer-events-none disabled:opacity-45",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-white hover:bg-accent-hover active:bg-accent-hover",
        secondary:
          "border border-ink/30 bg-surface text-ink hover:border-ink/50 hover:bg-paper",
        outline:
          "border border-ink/30 bg-transparent text-ink hover:bg-ink hover:text-paper",
        ghost: "bg-transparent text-ink hover:bg-ink/5",
        inverse:
          "border border-white/40 bg-white/10 text-white backdrop-blur-sm hover:border-white hover:bg-white hover:text-ink",
        link: "h-auto min-h-0 rounded-none bg-transparent p-0 text-accent underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 min-h-9 px-4 text-xs",
        md: "h-11 min-h-11 px-6",
        lg: "h-12 min-h-12 px-8 text-[0.9375rem]",
        icon: "h-11 w-11 min-h-11 min-w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
