"use client";

import type { ServiceFaq } from "@/types/service";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/cn";

type ServiceFaqProps = {
  items: ServiceFaq[];
  className?: string;
};

export function ServiceFaqAccordion({ items, className }: ServiceFaqProps) {
  if (items.length === 0) return null;

  return (
    <Accordion
      type="single"
      collapsible
      className={cn("w-full", className)}
      defaultValue="faq-0"
    >
      {items.map((item, index) => (
        <AccordionItem key={item.question} value={`faq-${index}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
