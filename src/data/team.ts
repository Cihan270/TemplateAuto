import type { TeamMember } from "@/types/review";

export const team: TeamMember[] = [
  {
    id: "t-001",
    name: "Erik de Kroon",
    role: "Eigenaar / verkoop",
    bio: "Opgegroeid in de garage, nu verantwoordelijk voor inkoop en klantadvies. Gelooft in eerlijke occasions zonder verkooptrucjes.",
    image: "/images/garage/team-erik.jpg",
  },
  {
    id: "t-002",
    name: "Nadia Vermeer",
    role: "Verkoopadviseur",
    bio: "Helpt klanten de juiste match te vinden tussen budget, gebruik en wensen. Regelt proefritten en financieringsvragen.",
    image: "/images/garage/team-nadia.jpg",
  },
  {
    id: "t-003",
    name: "Marc Bakker",
    role: "Hoofdmonteur",
    bio: "Meer dan 15 jaar ervaring met diagnose en onderhoud. Zorgt dat elke auto de showroom alleen verlaat als hij erachter staat.",
    image: "/images/garage/team-marc.jpg",
  },
  {
    id: "t-004",
    name: "Sofie Linders",
    role: "Serviceadviseur",
    bio: "Het aanspreekpunt voor afspraken, planning en statusupdates. Houdt de werkplaats én de klant in de loop.",
    image: "/images/garage/team-sofie.jpg",
  },
];
