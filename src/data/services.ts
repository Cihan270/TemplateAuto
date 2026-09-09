import type { Service } from "@/types/service";

export const services: Service[] = [
  {
    id: "s-001",
    slug: "apk-keuring",
    name: "APK-keuring",
    shortDescription:
      "Snelle APK inclusief herkeuring wanneer nodig — zonder verrassingen.",
    description:
      "Laat uw auto keuren door onze RDW-erkende keurmeesters. Wij controleren grondig, leggen bevindingen helder uit en kunnen kleine gebreken vaak direct meenemen in de werkplaats.",
    image: "/images/garage/apk.jpg",
    featured: true,
    priceFrom: 49.95,
    priceLabel: "vanaf",
    highlights: [
      "RDW-erkende keuring",
      "Duidelijke rapportage",
      "Vaak dezelfde dag klaar",
      "Combinatie met onderhoud mogelijk",
    ],
    whenNeeded: [
      "Uw APK-vervaldatum nadert",
      "U wilt zekerheid vóór verkoop of aankoop",
      "Na grotere reparaties of schadeherstel",
    ],
    whyUs: [
      "Keurmeesters met jarenlange ervaring",
      "Geen verkooppraatjes — alleen wat nodig is",
      "Afspraak online of telefonisch",
    ],
    faq: [
      {
        question: "Hoe lang duurt een APK?",
        answer:
          "Reken op ongeveer 45–60 minuten. Combineert u APK met onderhoud, dan plannen we voldoende tijd in.",
      },
      {
        question: "Mag ik wachten tijdens de keuring?",
        answer:
          "Ja, u bent welkom in onze wachtruimte met koffie. We houden u op de hoogte van de voortgang.",
      },
    ],
    relatedSlugs: ["onderhoudsbeurt", "diagnose"],
  },
  {
    id: "s-002",
    slug: "onderhoudsbeurt",
    name: "Onderhoudsbeurt",
    shortDescription:
      "Periodiek onderhoud volgens fabrieksvoorschrift, met originele of A-kwaliteit onderdelen.",
    description:
      "Van grote tot kleine beurt: olie, filters, remmen en slijtageonderdelen. We werken merkoverstijgend en volgen de onderhoudsintervallen van de fabrikant.",
    image: "/images/garage/maintenance.jpg",
    featured: true,
    priceFrom: 149,
    priceLabel: "vanaf",
    highlights: [
      "Grote & kleine beurt",
      "Onderhoudsboekje digitaal bijgewerkt",
      "Transparante prijsopgave vooraf",
      "Vervangingsauto op aanvraag",
    ],
    whenNeeded: [
      "Bij het bereiken van het onderhoudsinterval",
      "Wanneer een storingslampje brandt",
      "Vóór een lange vakantierit",
    ],
    whyUs: [
      "Vakkundige diagnose vóór onnodige onderdelen",
      "Scherp geprijsde onderhoudspakketten",
      "Nazorg en garantie op uitgevoerd werk",
    ],
    faq: [
      {
        question: "Gebruiken jullie originele onderdelen?",
        answer:
          "We bieden OEM en A-kwaliteit equivalenten. U kiest zelf; wij adviseren op basis van leeftijd en gebruik van de auto.",
      },
    ],
    relatedSlugs: ["apk-keuring", "airco-service"],
  },
  {
    id: "s-003",
    slug: "diagnose",
    name: "Diagnose & storingen",
    shortDescription:
      "Uitlezen en gericht zoeken naar de oorzaak van storingen en lampjes.",
    description:
      "Met moderne diagnoseapparatuur lezen we merkspecifieke systemen uit. U krijgt een heldere uitleg van de oorzaak en een offerte vóór we repareren.",
    image: "/images/garage/diagnostics.jpg",
    featured: true,
    priceFrom: 69,
    priceLabel: "vanaf",
    highlights: [
      "Merkspecifieke uitleesapparatuur",
      "Proefrit indien nodig",
      "Duidelijke diagnose vóór reparatie",
    ],
    whenNeeded: [
      "Motor-, ABS- of airbaglampje brandt",
      "Onverklaarbaar verbruik of vermogensverlies",
      "Startproblemen of waarschuwingen in het display",
    ],
    whyUs: [
      "Ervaring met Duitse én Japanse merken",
      "Geen giswerk — meten is weten",
      "Snelle doorlooptijd",
    ],
    faq: [
      {
        question: "Is diagnose altijd nodig bij een lampje?",
        answer:
          "Vaak wel. Een lampje kan meerdere oorzaken hebben; uitlezen voorkomt onnodige onderdelenwissel.",
      },
    ],
    relatedSlugs: ["onderhoudsbeurt", "apk-keuring"],
  },
  {
    id: "s-004",
    slug: "banden-wissel",
    name: "Banden & wielen",
    shortDescription:
      "Seizoenswissel, balanceren, uitlijnen en advies over bandenmaten.",
    description:
      "Winter- en zomerbanden wisselen, opslaan of nieuw aanschaffen. We controleren profieldiepte, spanning en slijtagepatroon.",
    image: "/images/garage/tires.jpg",
    featured: true,
    priceFrom: 25,
    priceLabel: "wissel vanaf",
    highlights: [
      "Seizoenswissel",
      "Balanceren & uitlijnen",
      "Bandenadvies op maat",
      "Optionele bandenopslag",
    ],
    whenNeeded: [
      "Bij seizoenswisseling",
      "Bij ongelijkmatige slijtage",
      "Wanneer het profiel onder de 1,6 mm komt",
    ],
    whyUs: [
      "Scherpe bandenprijzen",
      "Correcte montage en moment",
      "Advies zonder upsell-druk",
    ],
    faq: [
      {
        question: "Kunnen jullie banden opslaan?",
        answer:
          "Ja, vraagt u naar onze opslagmogelijkheden bij het maken van een wisselafspraak.",
      },
    ],
    relatedSlugs: ["onderhoudsbeurt", "apk-keuring"],
  },
  {
    id: "s-005",
    slug: "airco-service",
    name: "Airco-service",
    shortDescription:
      "Vullen, reinigen en controleren van het aircosysteem voor optimale koeling.",
    description:
      "Een goed werkende airco is comfortabel én veilig (ontwaseming). Wij controleren lekken, vullen koudemiddel bij en reinigen het systeem waar nodig.",
    image: "/images/garage/airco.jpg",
    featured: false,
    priceFrom: 89,
    priceLabel: "vanaf",
    highlights: [
      "Aircocheck",
      "Bijvullen koudemiddel",
      "Desinfectie op verzoek",
    ],
    whenNeeded: [
      "Koeling is onvoldoende",
      "Ongeveer elke 2 jaar preventief",
      "Bij onaangename geur uit de ventilatie",
    ],
    whyUs: [
      "Gespecialiseerde aircostations",
      "Duidelijke prijs vooraf",
      "Combinatie met onderhoud mogelijk",
    ],
    faq: [
      {
        question: "Hoe vaak moet airco onderhouden worden?",
        answer:
          "Wij adviseren een check elke twee jaar, of eerder bij verminderde werking.",
      },
    ],
    relatedSlugs: ["onderhoudsbeurt", "diagnose"],
  },
  {
    id: "s-006",
    slug: "remmen-onderhoud",
    name: "Remmen",
    shortDescription:
      "Controle en vervanging van remblokken, schijven en remvloeistof.",
    description:
      "Veilig remmen begint bij goed onderhoud. We meten slijtage, controleren de remvloeistof en vervangen onderdelen met A-kwaliteit materialen.",
    image: "/images/garage/brakes.jpg",
    featured: false,
    priceFrom: 119,
    priceLabel: "vanaf",
    highlights: [
      "Gratis remcheck bij APK/onderhoud",
      "A-kwaliteit onderdelen",
      "Proefrit na reparatie",
    ],
    whenNeeded: [
      "Piepende of vibrerende remmen",
      "Langere remweg",
      "Remvloeistof ouder dan 2 jaar",
    ],
    whyUs: [
      "Veiligheid eerst",
      "Transparante offerte",
      "Ervaren monteurs",
    ],
    faq: [
      {
        question: "Moeten blokken en schijven altijd samen?",
        answer:
          "Niet altijd. We meten de schijven en adviseren alleen wat technisch nodig is.",
      },
    ],
    relatedSlugs: ["apk-keuring", "onderhoudsbeurt"],
  },
];
