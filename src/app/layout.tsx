import type { Metadata } from "next";
import { Instrument_Serif, Lexend } from "next/font/google";
import { rootMetadata } from "@/lib/seo";
import { localBusinessJsonLd } from "@/lib/structured-data";
import { SiteShell } from "@/components/layout/site-shell";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = rootMetadata();

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = localBusinessJsonLd();

  return (
    <html
      lang="nl"
      className={`${instrument.variable} ${lexend.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteShell>{children}</SiteShell>
        <Toaster />
      </body>
    </html>
  );
}
