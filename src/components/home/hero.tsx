"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { garage } from "@/config/garage";
import { Container } from "@/components/ui/container";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#1a1410] text-paper">
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : { scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/images/garage/hero.jpg"
          alt={`Showroom van ${garage.name} in ${garage.address.city}`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,20,16,0.5)_0%,rgba(26,20,16,0.35)_40%,rgba(26,20,16,0.78)_100%)]"
        aria-hidden
      />

      <Container className="relative z-10 flex w-full flex-col items-center px-6 py-32 text-center md:py-40">
        <motion.div
          className="max-w-3xl"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-display text-[clamp(1.75rem,3vw+0.75rem,2.75rem)] leading-tight text-white">
            Welkom bij {garage.name}
          </p>

          <h1 className="mt-4 font-display text-[clamp(2.25rem,5vw+0.5rem,4.2rem)] leading-[1.05] text-white">
            {garage.tagline}
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-white/75 md:text-base">
            Scherp geselecteerde occasions, vakkundig onderhoud en persoonlijk
            advies in {garage.address.city}.
          </p>

          <div className="mt-10">
            <Link
              href="/occasions"
              className="inline-flex rounded-full bg-white px-8 py-3 text-sm font-medium text-ink transition-transform duration-300 hover:scale-[1.03]"
            >
              Bekijk ons aanbod
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
