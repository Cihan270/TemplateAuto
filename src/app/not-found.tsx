import Link from "next/link";
import { garage } from "@/config/garage";
import { createPageMetadata } from "@/lib/seo";
import { cn } from "@/lib/cn";
import { buttonVariants } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/shared/section-heading";

export const metadata = createPageMetadata({
  title: "Pagina niet gevonden",
  description: `De gevraagde pagina bestaat niet of is verplaatst. Ga terug naar ${garage.name}.`,
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <Section tone="paper" className="flex flex-1 flex-col justify-center py-24 md:py-32">
      <SectionHeading
        eyebrow="404"
        title="Pagina niet gevonden"
        description={`Deze pagina bestaat niet (meer). Ga terug naar de homepage van ${garage.shortName} of bekijk ons aanbod.`}
      />
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className={cn(buttonVariants({ variant: "primary", size: "md" }))}>
          Naar home
        </Link>
        <Link
          href="/occasions"
          className={cn(buttonVariants({ variant: "outline", size: "md" }))}
        >
          Occasions
        </Link>
        <Link
          href="/contact"
          className={cn(buttonVariants({ variant: "ghost", size: "md" }))}
        >
          Contact
        </Link>
      </div>
    </Section>
  );
}
