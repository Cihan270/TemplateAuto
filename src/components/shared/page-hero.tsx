"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { garage } from "@/config/garage";
import { Container } from "@/components/ui/container";

type PageHeroProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  eyebrow?: string;
};

export function PageHero({
  title,
  description,
  imageSrc,
  imageAlt,
  eyebrow = garage.name,
}: PageHeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[70svh] items-end overflow-hidden bg-[#1a1410] text-paper md:min-h-[75svh]">
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,20,16,0.45)_0%,rgba(26,20,16,0.28)_35%,rgba(26,20,16,0.82)_100%)]"
        aria-hidden
      />

      <Container className="relative z-10 w-full px-6 pb-16 pt-32 md:pb-20 md:pt-40 lg:pb-24">
        <motion.div
          className="max-w-3xl"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-display text-[clamp(1.35rem,2vw+0.5rem,2rem)] leading-tight text-white">
            {eyebrow}
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.5rem,5vw+0.5rem,4.5rem)] leading-[1.05] tracking-[-0.03em] text-white">
            {title}
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/75 md:text-base">
            {description}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
