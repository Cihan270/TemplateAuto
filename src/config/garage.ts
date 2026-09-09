import type { GarageConfig } from "@/types/garage";

export const garage: GarageConfig = {
  name: "Autobedrijf De Kroon",
  shortName: "De Kroon",
  legalName: "Autobedrijf De Kroon B.V.",
  tagline: "Eerlijk, betrouwbaar en persoonlijk",
  description:
    "Autobedrijf De Kroon in Amersfoort: scherp geselecteerde occasions, vakkundig onderhoud en persoonlijk advies. Bezoek onze showroom of plan een proefrit.",
  logo: "/images/brand/logo.svg",
  colors: {
    ink: "#231913",
    paper: "#F5F3F1",
    surface: "#FFFFFF",
    muted: "#6B6560",
    line: "#D2CDCA",
    accent: "#2F241E",
    accentHover: "#231913",
    success: "#2F6B4F",
  },
  phone: "+31334567890",
  phoneDisplay: "033 456 7890",
  whatsapp: "+31612345678",
  email: "info@autobedrijfdekroon.nl",
  website: "https://www.autobedrijfdekroon.nl",
  address: {
    street: "Stadsring 142",
    postalCode: "3811 HP",
    city: "Amersfoort",
    region: "Utrecht",
    country: "Nederland",
    countryCode: "NL",
  },
  coordinates: {
    lat: 52.1561,
    lng: 5.3878,
  },
  openingHours: [
    { day: "monday", label: "Maandag", open: "08:30", close: "18:00" },
    { day: "tuesday", label: "Dinsdag", open: "08:30", close: "18:00" },
    { day: "wednesday", label: "Woensdag", open: "08:30", close: "18:00" },
    { day: "thursday", label: "Donderdag", open: "08:30", close: "18:00" },
    { day: "friday", label: "Vrijdag", open: "08:30", close: "18:00" },
    { day: "saturday", label: "Zaterdag", open: "09:00", close: "16:00" },
    { day: "sunday", label: "Zondag", open: null, close: null, closed: true },
  ],
  socials: {
    facebook: "https://www.facebook.com/autobedrijfdekroon",
    instagram: "https://www.instagram.com/autobedrijfdekroon",
  },
  reviewScore: 4.8,
  reviewCount: 186,
  stats: [
    { label: "jaar ervaring", value: "28+" },
    { label: "occasions op voorraad", value: "50+" },
    { label: "tevreden klanten", value: "3.200+" },
    { label: "Google-score", value: "4,8" },
  ],
  uspItems: [
    {
      title: "Uitgebreid aanbod",
      description:
        "Een breed en zorgvuldig geselecteerd aanbod aan jong gebruikte auto’s en occasions in diverse prijsklassen.",
    },
    {
      title: "Kwaliteitsgarantie",
      description:
        "Elke auto wordt grondig geïnspecteerd. U profiteert van duidelijke garantie, transparantie en zorgeloos rijplezier.",
    },
    {
      title: "Deskundig advies",
      description:
        "Persoonlijk advies van oriëntatie tot aflevering — zonder druk, met aandacht voor uw wensen en budget.",
    },
    {
      title: "Eigen werkplaats",
      description:
        "APK, onderhoud en diagnose onder één dak — snel geholpen door ervaren monteurs in Amersfoort.",
    },
  ],
  kvk: "12345678",
  btw: "NL001234567B01",
};
