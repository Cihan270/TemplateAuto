/**
 * Importer: bedrijfsgegevens van een bestaande website → src/config/garage.ts.
 *
 * Gebruik:
 *   node scripts/import-company.mjs https://voorbeeld.nl
 *   node scripts/import-company.mjs --html opgeslagen-pagina.html
 *
 * Extra pagina's meegeven (contact/over-ons bevatten vaak KvK en openingstijden):
 *   node scripts/import-company.mjs https://voorbeeld.nl --also /contact,/over-ons
 *
 * Het script schrijft NOOIT rechtstreeks over src/config/garage.ts heen. Het
 * resultaat komt in src/config/garage.generated.ts, zodat je het eerst
 * nakijkt. Wat niet gevonden is, blijft als TODO staan: liever een lege plek
 * dan een verzonnen KvK-nummer.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_FILE = path.join(ROOT, "src", "config", "garage.generated.ts");
const BRAND_DIR = path.join(ROOT, "public", "images", "brand");

const DAYS = [
  ["monday", "Maandag", ["monday", "maandag", "ma"]],
  ["tuesday", "Dinsdag", ["tuesday", "dinsdag", "di"]],
  ["wednesday", "Woensdag", ["wednesday", "woensdag", "wo"]],
  ["thursday", "Donderdag", ["thursday", "donderdag", "do"]],
  ["friday", "Vrijdag", ["friday", "vrijdag", "vr"]],
  ["saturday", "Zaterdag", ["saturday", "zaterdag", "za"]],
  ["sunday", "Zondag", ["sunday", "zondag", "zo"]],
];

const missing = [];

function note(field, hint) {
  missing.push({ field, hint });
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; AutogarageImporter/1.0; +local-dev)",
      Accept: "text/html",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} voor ${url}`);
  return res.text();
}

function decode(s) {
  return String(s)
    .replace(/&amp;/g, "&")
    .replace(/&euro;/g, "€")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function stripTags(html) {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Alle JSON-LD blokken, plat geslagen inclusief @graph. */
function jsonLdNodes(html) {
  const nodes = [];
  const re =
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    try {
      const parsed = JSON.parse(m[1].trim());
      const stack = Array.isArray(parsed) ? [...parsed] : [parsed];
      while (stack.length) {
        const node = stack.pop();
        if (!node || typeof node !== "object") continue;
        if (Array.isArray(node["@graph"])) stack.push(...node["@graph"]);
        nodes.push(node);
      }
    } catch {
      // Kapotte JSON-LD komt vaak voor; stilletjes overslaan.
    }
  }
  return nodes;
}

function typeOf(node) {
  const t = node["@type"];
  return (Array.isArray(t) ? t : [t]).filter(Boolean).map(String);
}

function findBusiness(nodes) {
  const wanted = [
    "AutoDealer",
    "AutoRepair",
    "AutomotiveBusiness",
    "LocalBusiness",
    "Store",
    "Organization",
  ];
  for (const want of wanted) {
    const hit = nodes.find((n) => typeOf(n).includes(want));
    if (hit) return hit;
  }
  return null;
}

function meta(html, prop) {
  const re = new RegExp(
    `<meta[^>]+(?:property|name)=["']${prop}["'][^>]+content=["']([^"']+)["']`,
    "i",
  );
  const alt = new RegExp(
    `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${prop}["']`,
    "i",
  );
  const m = html.match(re) || html.match(alt);
  return m ? decode(m[1]) : null;
}

function firstMatch(text, re, group = 1) {
  const m = text.match(re);
  return m ? decode(m[group]) : null;
}

/** +31 33 456 7890 → +31334567890 */
function normalisePhone(raw) {
  if (!raw) return null;
  let digits = String(raw).replace(/[^\d+]/g, "");
  if (digits.startsWith("00")) digits = `+${digits.slice(2)}`;
  if (digits.startsWith("0")) digits = `+31${digits.slice(1)}`;
  if (!digits.startsWith("+")) digits = `+31${digits}`;
  return /^\+\d{9,15}$/.test(digits) ? digits : null;
}

function displayPhone(raw) {
  const cleaned = String(raw || "").replace(/[^\d]/g, "");
  if (cleaned.length < 9) return String(raw || "").trim() || null;
  const local = cleaned.startsWith("31") ? `0${cleaned.slice(2)}` : cleaned;
  if (local.startsWith("06")) return `${local.slice(0, 2)} ${local.slice(2)}`;
  return `${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`;
}

function extractPhone(text, html, biz) {
  const fromLd = biz?.telephone;
  const fromTel = firstMatch(html, /href=["']tel:([^"']+)["']/i);
  const fromText = firstMatch(
    text,
    /(?:tel|telefoon|bel(?:\s+ons)?)[^\d+]{0,12}((?:\+31|0)[\d\s().-]{8,16})/i,
  );
  const raw = fromLd || fromTel || fromText;
  if (!raw) {
    note("phone / phoneDisplay", "geen tel:-link of telefoonnummer gevonden");
    return { phone: null, phoneDisplay: null };
  }
  return { phone: normalisePhone(raw), phoneDisplay: displayPhone(raw) };
}

function extractEmail(text, html, biz) {
  const raw =
    biz?.email ||
    firstMatch(html, /href=["']mailto:([^"'?]+)["']/i) ||
    firstMatch(text, /([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})/i);
  if (!raw) note("email", "geen mailto-link of e-mailadres gevonden");
  return raw ? raw.toLowerCase() : null;
}

function extractAddress(text, biz) {
  const ld = biz?.address;
  const addr = {
    street: null,
    postalCode: null,
    city: null,
    region: "",
    country: "Nederland",
    countryCode: "NL",
  };

  if (ld && typeof ld === "object") {
    addr.street = ld.streetAddress ? decode(ld.streetAddress) : null;
    addr.postalCode = ld.postalCode ? decode(ld.postalCode) : null;
    addr.city = ld.addressLocality ? decode(ld.addressLocality) : null;
    addr.region = ld.addressRegion ? decode(ld.addressRegion) : "";
  }

  // Nederlandse postcode is een sterk anker: "1234 AB Plaatsnaam".
  if (!addr.postalCode || !addr.city) {
    const m = text.match(/(\d{4}\s?[A-Z]{2})\s+([A-Z][A-Za-zäöüéèë'\- ]{2,30})/);
    if (m) {
      addr.postalCode = addr.postalCode || m[1].toUpperCase();
      addr.city = addr.city || m[2].trim();
    }
  }
  if (!addr.street) {
    const m = text.match(
      /([A-Z][A-Za-zäöüéèë'.\- ]{2,40}?\s+\d+\s?[a-zA-Z]?)\s*,?\s*\d{4}\s?[A-Z]{2}/,
    );
    if (m) addr.street = m[1].trim();
  }

  for (const key of ["street", "postalCode", "city"]) {
    if (!addr[key]) note(`address.${key}`, "niet in JSON-LD of paginatekst");
  }
  return addr;
}

function extractOpeningHours(biz) {
  const spec = biz?.openingHoursSpecification;
  const rows = DAYS.map(([day, label]) => ({
    day,
    label,
    open: null,
    close: null,
    closed: true,
  }));

  const entries = Array.isArray(spec) ? spec : spec ? [spec] : [];
  let found = false;

  for (const entry of entries) {
    const days = Array.isArray(entry.dayOfWeek)
      ? entry.dayOfWeek
      : [entry.dayOfWeek];
    for (const d of days.filter(Boolean)) {
      const key = String(d).split("/").pop().toLowerCase();
      const row = rows.find((r) =>
        DAYS.find(([id, , aliases]) => id === r.day && aliases.includes(key)),
      );
      if (!row) continue;
      row.open = entry.opens ? String(entry.opens).slice(0, 5) : null;
      row.close = entry.closes ? String(entry.closes).slice(0, 5) : null;
      row.closed = !row.open;
      found = true;
    }
  }

  if (!found) note("openingHours", "geen openingHoursSpecification gevonden");
  return { rows, found };
}

function extractSocials(html) {
  const socials = {};
  const patterns = {
    facebook: /https?:\/\/(?:www\.)?facebook\.com\/[^\s"'<>)]+/i,
    instagram: /https?:\/\/(?:www\.)?instagram\.com\/[^\s"'<>)]+/i,
    linkedin: /https?:\/\/(?:[a-z]{2}\.)?linkedin\.com\/[^\s"'<>)]+/i,
    youtube: /https?:\/\/(?:www\.)?youtube\.com\/[^\s"'<>)]+/i,
  };
  for (const [key, re] of Object.entries(patterns)) {
    const m = html.match(re);
    if (m) socials[key] = decode(m[0].replace(/["'&].*$/, ""));
  }
  if (!Object.keys(socials).length) note("socials", "geen sociale links gevonden");
  return socials;
}

function extractLogoUrl(html, baseUrl, biz) {
  const candidates = [];
  if (typeof biz?.logo === "string") candidates.push(biz.logo);
  else if (biz?.logo?.url) candidates.push(biz.logo.url);

  const inHeader = html.match(/<header[\s\S]{0,4000}?<\/header>/i)?.[0] || "";
  const logoImg =
    inHeader.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i) ||
    html.match(/<img[^>]+(?:class|alt|id)=["'][^"']*logo[^"']*["'][^>]*>/i);
  if (logoImg) {
    const src = logoImg[1] || logoImg[0].match(/src=["']([^"']+)["']/i)?.[1];
    if (src) candidates.push(src);
  }

  const og = meta(html, "og:image");
  if (og) candidates.push(og);

  const found = candidates.find(Boolean);
  if (!found) {
    note("logo", "geen logo gevonden; zelf aanleveren");
    return null;
  }
  try {
    return baseUrl ? new URL(found, baseUrl).href : found;
  } catch {
    return null;
  }
}

async function downloadLogo(url) {
  if (!url) return null;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const ext = (url.split("?")[0].match(/\.(svg|png|jpe?g|webp)$/i)?.[1] || "png")
      .toLowerCase()
      .replace("jpeg", "jpg");
    await fs.mkdir(BRAND_DIR, { recursive: true });
    const file = path.join(BRAND_DIR, `logo.${ext}`);
    await fs.writeFile(file, buf);
    return `/images/brand/logo.${ext}`;
  } catch (err) {
    note("logo", `download mislukt (${err.message}); zelf aanleveren`);
    return null;
  }
}

function tsString(value) {
  if (value === null || value === undefined) return "null";
  return JSON.stringify(String(value));
}

function todo(value, hint) {
  return value ? tsString(value) : `"" /* TODO: ${hint} */`;
}

function renderConfig(d) {
  const hours = d.openingHours.rows
    .map(
      (r) =>
        `    { day: ${tsString(r.day)}, label: ${tsString(r.label)}, open: ${tsString(
          r.open,
        )}, close: ${tsString(r.close)}${r.closed ? ", closed: true" : ""} },`,
    )
    .join("\n");

  const socialEntries = Object.entries(d.socials);
  const socials = socialEntries.length
    ? `\n${socialEntries
        .map(([k, v]) => `    ${k}: ${tsString(v)},`)
        .join("\n")}\n  `
    : "";

  return `import type { GarageConfig } from "@/types/garage";

/**
 * Automatisch gegenereerd door scripts/import-company.mjs
 * Bron: ${d.source}
 * Gegenereerd op: ${new Date().toISOString().slice(0, 10)}
 *
 * Controleer elk veld voordat je dit als src/config/garage.ts gebruikt.
 * Velden met een TODO zijn niet op de site gevonden.
 */
export const garage: GarageConfig = {
  name: ${todo(d.name, "bedrijfsnaam")},
  shortName: ${todo(d.shortName, "korte naam")},
  legalName: ${todo(d.legalName, "statutaire naam")},
  tagline: ${todo(d.tagline, "slogan")},
  description: ${todo(d.description, "omschrijving voor SEO")},
  logo: ${todo(d.logo, "logo aanleveren in public/images/brand/")},
  colors: {
    // TODO: overnemen uit de huisstijl van het bedrijf.
    ink: "#231913",
    paper: "#F5F3F1",
    surface: "#FFFFFF",
    muted: "#6B6560",
    line: "#D2CDCA",
    accent: "#2F241E",
    accentHover: "#231913",
    success: "#2F6B4F",
  },
  phone: ${todo(d.phone, "telefoonnummer, formaat +31...")},
  phoneDisplay: ${todo(d.phoneDisplay, "telefoonnummer zoals getoond")},
  whatsapp: ${todo(d.whatsapp, "whatsapp-nummer")},
  email: ${todo(d.email, "e-mailadres")},
  website: ${todo(d.website, "website-url")},
  address: {
    street: ${todo(d.address.street, "straat en huisnummer")},
    postalCode: ${todo(d.address.postalCode, "postcode")},
    city: ${todo(d.address.city, "plaats")},
    region: ${tsString(d.address.region || "")},
    country: "Nederland",
    countryCode: "NL",
  },
  coordinates: {
    // TODO: controleren, standaard is het midden van Nederland.
    lat: ${d.coordinates.lat},
    lng: ${d.coordinates.lng},
  },
  openingHours: [
${hours}
  ],
  socials: {${socials}},
  reviewScore: ${d.reviewScore ?? 0} /* TODO: controleren */,
  reviewCount: ${d.reviewCount ?? 0} /* TODO: controleren */,
  stats: [
    // TODO: invullen met echte cijfers van het bedrijf.
  ],
  uspItems: [
    // TODO: invullen met de verkoopargumenten van het bedrijf.
  ],
  kvk: ${todo(d.kvk, "KvK-nummer")},
  btw: ${todo(d.btw, "btw-nummer")},
};
`;
}

async function main() {
  const argv = process.argv.slice(2);
  const htmlFlag = argv.indexOf("--html");
  const alsoFlag = argv.indexOf("--also");
  const extra =
    alsoFlag !== -1 && argv[alsoFlag + 1] ? argv[alsoFlag + 1].split(",") : [];

  let html = "";
  let baseUrl = null;
  let source = "";

  if (htmlFlag !== -1) {
    const file = argv[htmlFlag + 1];
    if (!file) throw new Error("--html verwacht een bestandspad");
    html = await fs.readFile(path.resolve(file), "utf8");
    source = `lokaal bestand: ${file}`;
  } else {
    const url = argv.find((a) => a.startsWith("http"));
    if (!url) {
      console.error(
        "Gebruik: node scripts/import-company.mjs <url> | --html <bestand>",
      );
      process.exit(1);
    }
    baseUrl = url;
    source = url;
    html = await fetchText(url);
    for (const p of extra) {
      try {
        html += `\n${await fetchText(new URL(p, url).href)}`;
      } catch (err) {
        console.warn(`  ! extra pagina ${p} overgeslagen: ${err.message}`);
      }
    }
  }

  const text = stripTags(html);
  const nodes = jsonLdNodes(html);
  const biz = findBusiness(nodes);

  if (!biz) {
    console.warn(
      "  ! Geen JSON-LD bedrijfsgegevens gevonden; terugvallen op tekstpatronen.",
    );
  }

  const name =
    (biz?.name && decode(biz.name)) ||
    meta(html, "og:site_name") ||
    firstMatch(html, /<title>([^<]{2,80})<\/title>/i)?.split(/[|–-]/)[0].trim();
  if (!name) note("name", "geen bedrijfsnaam gevonden");

  const { phone, phoneDisplay } = extractPhone(text, html, biz);
  const kvk = firstMatch(text, /k\.?v\.?k\.?[^\d]{0,20}(\d{8})/i);
  if (!kvk) note("kvk", "geen KvK-nummer op de pagina; check de voettekst");
  const btw = firstMatch(text, /(NL\s?\d{9}\s?B\s?\d{2})/i)?.replace(/\s/g, "");
  if (!btw) note("btw", "geen btw-nummer gevonden");

  const geo = biz?.geo || {};
  const data = {
    source,
    name,
    shortName: name,
    legalName: biz?.legalName ? decode(biz.legalName) : name,
    tagline: meta(html, "og:description")?.slice(0, 70) || null,
    description: meta(html, "description") || meta(html, "og:description"),
    logo: await downloadLogo(extractLogoUrl(html, baseUrl, biz)),
    phone,
    phoneDisplay,
    whatsapp: null,
    email: extractEmail(text, html, biz),
    website: baseUrl ? new URL(baseUrl).origin : biz?.url || null,
    address: extractAddress(text, biz),
    coordinates: {
      lat: Number(geo.latitude) || 52.1326,
      lng: Number(geo.longitude) || 5.2913,
    },
    openingHours: extractOpeningHours(biz),
    socials: extractSocials(html),
    reviewScore: Number(biz?.aggregateRating?.ratingValue) || null,
    reviewCount: Number(biz?.aggregateRating?.reviewCount) || null,
    kvk,
    btw,
  };

  if (!data.tagline) note("tagline", "zelf formuleren");
  if (!data.description) note("description", "zelf formuleren voor SEO");
  if (!data.whatsapp) note("whatsapp", "zelf aanleveren indien gewenst");

  await fs.mkdir(path.dirname(OUT_FILE), { recursive: true });
  await fs.writeFile(OUT_FILE, renderConfig(data), "utf8");

  console.log(`\n✓ Geschreven: ${path.relative(ROOT, OUT_FILE)}`);
  console.log(`  Bron: ${source}`);
  console.log(`  Gevonden: ${[
    data.name && "naam",
    data.phone && "telefoon",
    data.email && "e-mail",
    data.address.city && "adres",
    data.openingHours.found && "openingstijden",
    data.kvk && "kvk",
    data.logo && "logo",
  ].filter(Boolean).join(", ") || "vrijwel niets"}`);

  if (missing.length) {
    console.log(`\n  Nog handmatig invullen (${missing.length}):`);
    for (const m of missing) console.log(`   - ${m.field}: ${m.hint}`);
  }
  console.log(
    `\n  Controleer het bestand en kopieer het daarna over src/config/garage.ts.\n`,
  );
}

main().catch((err) => {
  console.error(`\nFout: ${err.message}\n`);
  process.exit(1);
});
