"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-center"
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "border border-line bg-surface text-ink shadow-[0_8px_24px_rgba(16,18,20,0.12)] rounded-[2px]",
          title: "font-display text-sm font-semibold",
          description: "text-sm text-muted",
          actionButton: "bg-accent text-white",
          cancelButton: "bg-paper text-ink border border-line",
          closeButton: "border-line bg-surface text-muted",
          success: "border-success/30",
          error: "border-accent/40",
        },
      }}
    />
  );
}
