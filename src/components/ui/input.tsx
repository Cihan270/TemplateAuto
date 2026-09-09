import * as React from "react";
import { cn } from "@/lib/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "flex h-11 w-full border border-line bg-surface px-3 text-base text-ink",
          "rounded-[var(--radius-input)]",
          "placeholder:text-muted/80",
          "transition-colors duration-150",
          "hover:border-ink/30",
          "focus-visible:border-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink",
          "disabled:cursor-not-allowed disabled:bg-paper disabled:opacity-60",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
