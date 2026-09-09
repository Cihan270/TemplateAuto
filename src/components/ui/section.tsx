import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";

const sectionVariants = cva("w-full py-16 md:py-24 lg:py-28", {
  variants: {
    tone: {
      paper: "bg-paper text-ink",
      surface: "bg-surface text-ink",
      ink: "bg-ink text-paper",
      transparent: "bg-transparent",
    },
  },
  defaultVariants: {
    tone: "paper",
  },
});

export type SectionProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof sectionVariants> & {
    as?: "section" | "div" | "aside";
    containerClassName?: string;
    contained?: boolean;
  };

function Section({
  as: Comp = "section",
  tone,
  className,
  containerClassName,
  contained = true,
  children,
  ...props
}: SectionProps) {
  return (
    <Comp className={cn(sectionVariants({ tone }), className)} {...props}>
      {contained ? (
        <Container className={containerClassName}>{children}</Container>
      ) : (
        children
      )}
    </Comp>
  );
}

export { Section, sectionVariants };
