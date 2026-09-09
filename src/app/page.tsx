import type { Metadata } from "next";
import { garage } from "@/config/garage";
import { createPageMetadata } from "@/lib/seo";
import { getFeaturedVehicles } from "@/lib/repositories/vehicles";
import { getFeaturedServices } from "@/lib/repositories/services";
import {
  getFeaturedGallery,
  getFeaturedReviews,
} from "@/lib/repositories/reviews";
import { Hero } from "@/components/home/hero";
import { FeaturedOccasions } from "@/components/home/featured-occasions";
import { ServicesPreview } from "@/components/home/services-preview";
import { StatsBand } from "@/components/home/stats-band";
import { AboutPreview } from "@/components/home/about-preview";
import { WorkshopGallery } from "@/components/home/workshop-gallery";
import { Reviews } from "@/components/home/reviews";
import { CtaBand } from "@/components/home/cta-band";

export const metadata: Metadata = createPageMetadata({
  title: `Occasions & garage in ${garage.address.city}`,
  description: garage.description,
  path: "/",
  image: "/images/garage/hero.jpg",
});

export default function Home() {
  const vehicles = getFeaturedVehicles(4);
  const services = getFeaturedServices(4);
  const reviews = getFeaturedReviews(3);
  const gallery = getFeaturedGallery(6);

  return (
    <>
      <Hero />
      <FeaturedOccasions vehicles={vehicles} />
      <ServicesPreview services={services} />
      <StatsBand />
      <AboutPreview />
      <WorkshopGallery images={gallery} />
      <Reviews reviews={reviews} />
      <CtaBand />
    </>
  );
}
