# Pitch-prompt

Plak de prompt hieronder in een nieuwe chat en vervang `{{WEBSITE_URL}}`
door de site van het bedrijf. Meer hoef je niet te typen.

---

Ik bouw pitch-websites voor autobedrijven op basis van een eigen template.
Ik pitch morgen bij een bedrijf en wil dat jij de template omzet naar hun
versie.

**Het bedrijf:** {{WEBSITE_URL}}

## De template

Repo: https://github.com/Cihan270/TemplateAuto
Branch: `claude/autogarage-localhost-setup-gejfmu` (werk altijd op deze branch,
push nooit naar main)

Next.js 16 met App Router, Tailwind 4, TypeScript. Draaien met
`npm install && npm run dev -- -p 3001`. Er zijn geen environment variables
nodig.

De template is data-gedreven: `src/config/garage.ts` is de enige bron van
waarheid voor alle bedrijfsgegevens. Er staat vrijwel niets hardcoded in de
componenten.

## Wat ik van je wil

1. Analyseer de website van het bedrijf volledig.
2. Haal eruit: bedrijfsnaam, statutaire naam, slogan, telefoon, e-mail,
   adres, postcode, plaats, openingstijden per dag, KvK-nummer, btw-nummer,
   sociale media, diensten, team, reviews en het logo.
3. Vul daarmee `src/config/garage.ts` en de datafiles.
4. Neem de huisstijlkleuren over uit hun logo en site.
5. Draai `npm run build` en `npm run lint`, start de dev-server op poort 3001
   en controleer dat de pagina's echt renderen (niet alleen dat de server start).
6. Commit en push naar de branch hierboven.
7. Zeg me precies welke velden je niet hebt kunnen vinden en wat ik moet
   aanleveren.

## Gebruik de importer

Er staat een script klaar dat dit grotendeels automatisch doet:

```bash
node scripts/import-company.mjs {{WEBSITE_URL}} --also /contact,/over-ons
```

Het leest eerst JSON-LD en valt daarna terug op tekstpatronen. Het schrijft
naar `src/config/garage.generated.ts` en raakt `garage.ts` niet aan, zodat we
het eerst nakijken. Het werkt ook op een lokaal opgeslagen pagina:
`node scripts/import-company.mjs --html pagina.html`

## Regels

**Verzin nooit gegevens.** Geen geraden KvK-nummer, telefoonnummer, adres of
openingstijden. Wat je niet vindt, laat je leeg met een TODO en meld je aan
mij. Een fout nummer op het scherm tijdens een pitch kost me de klant.

**Kleuren horen in `garage.colors`**, niet in `globals.css`. Die config wordt
via `src/lib/theme.ts` als CSS-variabelen op `<html>` gezet. De hexwaarden
staan bewust niet meer in de stylesheet.

**Als je de website niet kunt bereiken** (egress proxy blokkeert vaak alles
behalve GitHub): test dat meteen aan het begin, en zeg het direct in plaats
van eromheen te werken. Vraag mij dan om de pagina op te slaan en de HTML te
sturen, of om de gegevens over te tikken. Ga niet gokken.

## Bestanden die per bedrijf wijzigen

| Bestand | Inhoud |
|---|---|
| `src/config/garage.ts` | NAW, KvK, btw, socials, kleuren, USP's, statistieken |
| `src/data/services.ts` | diensten |
| `src/data/team.ts` | medewerkers |
| `src/data/reviews.ts` | reviews |
| `src/data/faq.ts` | veelgestelde vragen |
| `src/data/gallery.ts` | foto's van pand en werkplaats |
| `src/data/vehicles.ts` | occasions |
| `public/images/brand/logo.svg` | logo |
| `public/images/garage/` | 15 foto's: hero, showroom-cars, workshop, workshop-detail, team, 4x team-*, apk, maintenance, diagnostics, brakes, tires, airco |
| `public/images/cars/` | 3 foto's per occasion |

## Wat je moet weten

De contact- en afspraakformulieren zijn stubs: ze valideren netjes maar
versturen geen mail, want er is geen e-mailprovider gekoppeld. Noem dat als ik
erover begin, maar bouw het niet uit tenzij ik erom vraag.

De 51 occasions in `vehicles.ts` zijn van een andere dealer. Als dit bedrijf
auto's verkoopt, wijs me daarop: bij doorklikken vallen vreemde auto's op.
`scripts/import-goedhart.mjs` haalt occasions inclusief foto's op, maar werkt
alleen op de HTML-structuur van die ene dealer en moet per site aangepast
worden.

Vraag me om wat je nodig hebt en waar je twijfelt. Liever een vraag vooraf dan
een verkeerde aanname in de pitch.
