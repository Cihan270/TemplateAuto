import * as React from "react";
import { cn } from "@/lib/cn";

export type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "section" | "article" | "main" | "header" | "footer" | "nav";
};

function Container({
  as: Comp = "div",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Comp
      className={cn(
        "mx-auto w-full max-w-[1400px] px-4 md:px-6 lg:px-8",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export { Container };
