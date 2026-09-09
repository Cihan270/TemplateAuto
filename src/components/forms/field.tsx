import * as React from "react";
import { cn } from "@/lib/cn";

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: React.ReactNode;
};

export function Field({
  id,
  label,
  error,
  required,
  hint,
  className,
  children,
}: FieldProps) {
  const describedBy = error
    ? `${id}-error`
    : hint
      ? `${id}-hint`
      : undefined;

  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {label}
        {required ? (
          <span className="text-accent" aria-hidden>
            {" "}
            *
          </span>
        ) : null}
      </label>
      {React.isValidElement<{
        id?: string;
        "aria-invalid"?: boolean;
        "aria-describedby"?: string;
      }>(children)
        ? React.cloneElement(children, {
            id,
            "aria-invalid": Boolean(error) || undefined,
            "aria-describedby": describedBy,
          })
        : children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-accent" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
