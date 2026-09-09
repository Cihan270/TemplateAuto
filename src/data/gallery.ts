import type { GalleryImage } from "@/types/review";
import { garage } from "@/config/garage";

export const gallery: GalleryImage[] = [
  {
    id: "g-001",
    src: "/images/garage/hero.jpg",
    alt: `Showroom ${garage.name} in ${garage.address.city}`,
    category: "showroom",
    featured: true,
  },
  {
    id: "g-002",
    src: "/images/garage/workshop.jpg",
    alt: "Werkplaats met hefbruggen",
    category: "workshop",
    featured: true,
  },
  {
    id: "g-003",
    src: "/images/garage/workshop-detail.jpg",
    alt: "Monteur aan het werk in de werkplaats",
    category: "workshop",
    featured: true,
  },
  {
    id: "g-004",
    src: "/images/garage/diagnostics.jpg",
    alt: "Diagnoseapparatuur in de garage",
    category: "detail",
    featured: true,
  },
  {
    id: "g-005",
    src: "/images/garage/showroom-cars.jpg",
    alt: "Occasions in de showroom",
    category: "showroom",
    featured: true,
  },
  {
    id: "g-006",
    src: "/images/garage/team.jpg",
    alt: `Team van ${garage.name}`,
    category: "team",
    featured: false,
  },
  {
    id: "g-007",
    src: "/images/garage/maintenance.jpg",
    alt: "Onderhoud aan een personenauto",
    category: "workshop",
    featured: false,
  },
  {
    id: "g-008",
    src: "/images/garage/apk.jpg",
    alt: "APK-keuring in uitvoering",
    category: "detail",
    featured: false,
  },
];
