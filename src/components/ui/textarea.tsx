import * as React from "react";
import { cn } from "@/lib/cn";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "flex min-h-28 w-full border border-line bg-surface px-3 py-2.5 text-base text-ink",
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
Textarea.displayName = "Textarea";

export { Textarea };
