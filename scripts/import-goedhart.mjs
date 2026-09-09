/**
 * Importer: Auto Goedhart aanbod → src/data/vehicles.ts + local images.
 * Source: https://www.autogoedhart.nl/aanbod
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BASE = "https://www.autogoedhart.nl";
const LISTING = `${BASE}/aanbod`;
const IMAGES_ROOT = path.join(ROOT, "public", "images", "cars");
const OUT_FILE = path.join(ROOT, "src", "data", "vehicles.ts");
const MAX_IMAGES = 3;
const CONCURRENCY = 5;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; AutogarageImporter/1.0; +local-dev)",
      Accept: "text/html",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&euro;/g, "€")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\s+/g, " ")
    .trim();
}

function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&euro;/g, "€")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function slugify(input) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/š/gi, "s")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 88);
}

function parseListingCards(html) {
  // Anchor wraps each card; href sits BEFORE class="each-product".
  const re =
    /<a href="(\/occasions-kopen\/(\d+)-([^"]+))"[\s\S]*?class="each-product"([\s\S]*?)<\/a>/gi;
  const cars = [];
  let m;
  while ((m = re.exec(html))) {
    const [, href, id, listingSlug, block] = m;

    const h3 = block.match(/<h3>\s*([\s\S]*?)\s*<\/h3>/i);
    const h5 = block.match(/<h5>\s*([\s\S]*?)\s*<\/h5>/i);
    const brandModel = h3 ? decode(stripTags(h3[1])) : "";
    const variant = h5 ? decode(stripTags(h5[1])) : "";

    const fuelM = block.match(/Brandstof\s*<span>\s*([^<]+)\s*<\/span>/i);
    const kmM = block.match(/Tellerstand\s*<span>\s*([^<]+)\s*<\/span>/i);
    const yearM = block.match(/Bouwjaar\s*<span>\s*([^<]+)\s*<\/span>/i);

    // Prefer the purchase price in h4, not lease € p.m.
    const h4 = block.match(/<h4>([\s\S]*?)<\/h4>/i);
    let price = 0;
    if (h4) {
      const priceM = decode(h4[1]).match(/€\s*([\d.]+)\s*,-/);
      if (priceM) price = Number(priceM[1].replace(/\./g, ""));
    }

    const imgM = block.match(
      /src="(\/webservices\/feed_images\/\d+\/[^"?]+)/i,
    );

    cars.push({
      id,
      href: `${BASE}${href}`,
      listingSlug,
      brandModel,
      variant,
      fuelRaw: fuelM ? decode(fuelM[1]) : "Benzine",
      mileage: Number((kmM?.[1] || "0").replace(/[^\d]/g, "")) || 0,
      year: Number(yearM?.[1]) || new Date().getFullYear(),
      price,
      thumb: imgM ? `${BASE}${imgM[1]}` : null,
    });
  }

  const seen = new Set();
  return cars.filter((c) => {
    if (seen.has(c.id)) return false;
    seen.add(c.id);
    return true;
  });
}

function splitBrandModel(brandModel) {
  const map = [
    ["Mercedes-Benz", "Mercedes-Benz"],
    ["Mercedes", "Mercedes-Benz"],
    ["Volkswagen", "Volkswagen"],
    ["Škoda", "Škoda"],
    ["Skoda", "Škoda"],
    ["CUPRA", "CUPRA"],
    ["Audi", "Audi"],
    ["BMW", "BMW"],
    ["MINI", "MINI"],
    ["Mini", "MINI"],
    ["Lexus", "Lexus"],
    ["Mazda", "Mazda"],
    ["SEAT", "SEAT"],
    ["Seat", "SEAT"],
    ["Suzuki", "Suzuki"],
    ["Toyota", "Toyota"],
  ];

  for (const [prefix, brand] of map) {
    if (brandModel.toLowerCase().startsWith(prefix.toLowerCase())) {
      const model = brandModel.slice(prefix.length).trim() || brand;
      return { brand, model };
    }
  }
  const [first, ...rest] = brandModel.split(/\s+/);
  return { brand: first || "Onbekend", model: rest.join(" ") || first };
}

function mapFuel(raw) {
  const v = raw.toLowerCase();
  if (v.includes("elektr")) return "elektrisch";
  if (v.includes("hybride") || v.includes("hybrid")) return "hybride";
  if (v.includes("diesel")) return "diesel";
  if (v.includes("lpg")) return "lpg";
  return "benzine";
}

function mapTransmission(raw) {
  return String(raw).toLowerCase().includes("hand")
    ? "handgeschakeld"
    : "automaat";
}

function mapBody(raw, title) {
  const v = `${raw} ${title}`.toLowerCase();
  if (
    /station|avant|touring|variant|combi|sportbreak|sportstourer|shooting|gran turismo/.test(
      v,
    )
  )
    return "stationwagen";
  if (
    /suv|q3|q4|q5|q7|x1|x3|x4|x5|cx-|kamiq|karoq|kodiaq|formentor|enyaq|e-tron|nx |vitara|tiguan|tucson/.test(
      v,
    )
  )
    return "suv";
  if (/coupe|coup|gran coupe|i4|cla/.test(v)) return "coupe";
  if (/cabrio/.test(v)) return "cabriolet";
  if (/mpv|touran/.test(v)) return "mpv";
  if (/bestel|\bvan\b/.test(v)) return "bestelwagen";
  if (/sedan|limousine/.test(v)) return "sedan";
  return "hatchback";
}

function capitalizeColor(raw) {
  const c = String(raw || "")
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .slice(0, 3)
    .join(" ");
  if (!c || c.length > 40 || /interesse|upload|verstuur|cookie/.test(c)) {
    return "Onbekend";
  }
  return c.replace(/\b\w/g, (ch) => ch.toUpperCase());
}

function fieldNear(text, label) {
  // Match "Label value" with short value only
  const re = new RegExp(
    `${label}\\s+([A-Za-z0-9./%+\\- ]{1,40}?)(?=\\s+(?:Brandstof|Transmissie|Bouwjaar|Tellerstand|BTW|Kleur|Prijs|Kenteken|Emissieklasse|Cilinderinhoud|Vermogen|Topsnelheid|Carrosserie|Tankinhoud|Gewicht|Max\\.|Interieur|Veiligheid|Exterieur|Overige|€|Merk|Model|Type)|$)`,
    "i",
  );
  const m = text.match(re);
  return m ? m[1].trim() : "";
}

function estimatePower({ fuel, title, powerRaw }) {
  const n = Number(String(powerRaw).replace(/[^\d]/g, ""));
  if (n > 20) return n;
  const t = title.toLowerCase();
  const table = [
    [/m40i/, 360],
    [/xdrive45e|45e/, 394],
    [/530e/, 299],
    [/330e/, 292],
    [/55 tfsi/, 367],
    [/q7/, 381],
    [/e-tron 55|95 kwh/, 408],
    [/q4.*45/, 286],
    [/q4.*40|sportback e-tron 40/, 204],
    [/i4/, 340],
    [/enyaq.*80/, 204],
    [/enyaq.*60/, 180],
    [/250 e|250e/, 218],
    [/218i/, 136],
    [/320i/, 184],
    [/520i/, 184],
    [/sdrive18i|\b18i\b/, 140],
    [/300h/, 197],
    [/1\.5 tsi e-hybrid|e-hybrid/, 204],
    [/1\.4 tsi (iv|gte)|gte/, 218],
    [/cla.*200|\b200\b.*amg/, 163],
  ];
  for (const [re, pk] of table) {
    if (re.test(t)) return pk;
  }
  if (fuel === "elektrisch") return 200;
  if (fuel === "hybride") return 150;
  return 110;
}

function extractImages(html, stockId) {
  const re = new RegExp(
    `/webservices/feed_images/${stockId}/${stockId}-(\\d+)\\.jpg`,
    "gi",
  );
  const nums = new Set();
  let m;
  while ((m = re.exec(html))) nums.add(Number(m[1]));
  return [...nums]
    .sort((a, b) => a - b)
    .slice(0, MAX_IMAGES)
    .map((n) => `${BASE}/webservices/feed_images/${stockId}/${stockId}-${n}.jpg`);
}

function extractOptions(html) {
  const noise =
    /^(menu|kenmerken|opties|omschrijving|print|home|aanbod|werkplaats|contact|diensten|over ons|vacatures|financier|inruil|interesse|cookie|merk|model|type|brandstof|tellerstand|bouwjaar)$/i;

  const panel =
    html.match(
      /bullet-panel[\s\S]{0,200}Interieur([\s\S]*?)(?:class="col-|Financier|Inruil|cookie|footer)/i,
    )?.[1] || "";

  const items = [];
  const liRe = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  let m;
  const scope = panel || html;
  while ((m = liRe.exec(scope))) {
    const item = stripTags(m[1]);
    if (
      item &&
      item.length > 2 &&
      item.length < 85 &&
      !noise.test(item) &&
      !/^\+?\d/.test(item) &&
      !/svg$/i.test(item) &&
      !/opening|gesloten|privacy|whatsapp/i.test(item)
    ) {
      items.push(item);
    }
  }

  return [...new Set(items)].slice(0, 12);
}

function highlightOptions(variant) {
  return variant
    .split(/[\s/]+/)
    .map((w) => w.replace(/^\W+|\W+$/g, ""))
    .filter(
      (w) =>
        w.length > 3 &&
        !/^(met|van|and|the|edition|business|line)$/i.test(w),
    )
    .slice(0, 8)
    .map((w) => w.replace(/-/g, " "));
}

async function downloadImage(url, dest) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; AutogarageImporter/1.0)",
    },
  });
  if (!res.ok) throw new Error(`Image ${res.status}`);
  await fs.writeFile(dest, Buffer.from(await res.arrayBuffer()));
}

async function mapPool(items, limit, fn) {
  const out = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await fn(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: limit }, () => worker()));
  return out;
}

function formatTs(vehicles) {
  const serialize = (v, pad = "  ") => {
    const lines = [`${pad}{`];
    const push = (k, val) => {
      if (typeof val === "string") lines.push(`${pad}  ${k}: ${JSON.stringify(val)},`);
      else if (Array.isArray(val) || (val && typeof val === "object"))
        lines.push(`${pad}  ${k}: ${JSON.stringify(val)},`);
      else lines.push(`${pad}  ${k}: ${val},`);
    };
    for (const [k, val] of Object.entries(v)) push(k, val);
    lines.push(`${pad}}`);
    return lines.join("\n");
  };

  return `import type { Vehicle } from "@/types/vehicle";

/** Occasions imported from Auto Goedhart voorraad (https://www.autogoedhart.nl/aanbod). */
export const vehicles: Vehicle[] = [
${vehicles.map((v) => serialize(v)).join(",\n")}
];
`;
}

async function processCar(entry, index) {
  await sleep(80 * (index % CONCURRENCY));
  let html = "";
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      html = await fetchText(entry.href);
      break;
    } catch (err) {
      console.warn(`Detail fail ${entry.id} (${attempt}/3): ${err.message}`);
      await sleep(400 * attempt);
    }
  }

  const text = html ? stripTags(html) : "";
  const { brand, model } = splitBrandModel(entry.brandModel);
  const variant = entry.variant || model;
  const title = `${brand} ${model} ${variant}`.trim();
  const fuel = mapFuel(entry.fuelRaw);
  const transmission = mapTransmission(fieldNear(text, "Transmissie") || "Automaat");
  const color = capitalizeColor(fieldNear(text, "Kleur"));
  const bodyRaw = fieldNear(text, "Carrosserie");
  const powerRaw = fieldNear(text, "Vermogen");
  const engineSizeRaw = fieldNear(text, "Cilinderinhoud");
  const emission = fieldNear(text, "Emissieklasse");
  const topSpeed = fieldNear(text, "Topsnelheid");
  const weight = fieldNear(text, "Gewicht");
  const btwMarge = fieldNear(text, "BTW / Marge") || fieldNear(text, "BTW");

  const bodyType = mapBody(bodyRaw, title);
  const power = estimatePower({ fuel, title, powerRaw });

  const remoteImages = html
    ? extractImages(html, entry.id)
    : entry.thumb
      ? [entry.thumb]
      : [];
  if (!remoteImages.length && entry.thumb) remoteImages.push(entry.thumb);

  const slug = slugify(`${brand}-${model}-${variant}`);
  const dir = path.join(IMAGES_ROOT, slug);
  await fs.mkdir(dir, { recursive: true });

  const localImages = [];
  for (let i = 0; i < remoteImages.length; i++) {
    const file = `${String(i + 1).padStart(2, "0")}.jpg`;
    try {
      await downloadImage(remoteImages[i], path.join(dir, file));
      localImages.push(`/images/cars/${slug}/${file}`);
    } catch (err) {
      console.warn(`  img ${entry.id}#${i}: ${err.message}`);
    }
  }

  const options = [
    ...new Set([
      ...highlightOptions(variant),
      ...(html ? extractOptions(html) : []),
    ]),
  ]
    .filter((o) => !/^(menu|kenmerken|opties|omschrijving|print|financiering)$/i.test(o))
    .slice(0, 10);

  const labels = [];
  if (/btw/i.test(btwMarge)) labels.push("btw-auto");
  if (entry.year >= 2025 || entry.mileage < 15000) labels.push("nieuw-binnen");

  let engineSize;
  if (engineSizeRaw) {
    const cc = Number(engineSizeRaw.replace(/[^\d]/g, ""));
    engineSize = cc >= 1000 ? (cc / 1000).toFixed(1) : engineSizeRaw;
  }

  const specifications = {
    doors: bodyType === "coupe" || bodyType === "sedan" ? 4 : 5,
    seats: 5,
  };
  if (engineSize) specifications.engineSize = engineSize;
  if (emission)
    specifications.emissionClass = emission.startsWith("Euro")
      ? emission
      : `Euro ${emission}`;
  if (topSpeed) specifications.topSpeed = topSpeed;
  if (weight) specifications.weight = weight;

  const fuelPhrase =
    fuel === "elektrisch"
      ? "Elektrische aandrijving"
      : fuel === "hybride"
        ? "Hybride aandrijving"
        : "Benzine-aandrijving";

  return {
    id: `v-${String(index + 1).padStart(3, "0")}`,
    slug,
    brand,
    model,
    variant,
    price: entry.price,
    year: entry.year,
    mileage: entry.mileage,
    fuel,
    transmission,
    power,
    bodyType,
    color,
    images: localImages,
    featured: index < 6,
    status: "available",
    labels,
    description: `${brand} ${model} ${variant} (${entry.year}, ${entry.mileage.toLocaleString("nl-NL")} km). ${fuelPhrase}, ${transmission}, kleur ${color.toLowerCase()}. Geselecteerd voor onze showroom.`,
    specifications,
    options: options.length
      ? options
      : ["Climate control", "Navigatie", "Bluetooth"],
    createdAt: new Date(Date.UTC(2026, 8, 8, 10, index)).toISOString(),
  };
}

async function main() {
  console.log("Fetching listing…");
  const listingHtml = await fetchText(LISTING);
  const entries = parseListingCards(listingHtml);
  console.log(`Found ${entries.length} vehicles`);
  if (!entries.length) throw new Error("No cars parsed from listing");

  await fs.mkdir(IMAGES_ROOT, { recursive: true });
  for (const ent of await fs.readdir(IMAGES_ROOT, { withFileTypes: true })) {
    if (ent.isDirectory()) {
      await fs.rm(path.join(IMAGES_ROOT, ent.name), {
        recursive: true,
        force: true,
      });
    }
  }

  console.log("Scraping details + images…");
  const vehicles = await mapPool(entries, CONCURRENCY, processCar);

  const slugCount = new Map();
  for (const v of vehicles) {
    const n = slugCount.get(v.slug) || 0;
    slugCount.set(v.slug, n + 1);
    if (n > 0) v.slug = `${v.slug}-${n + 1}`;
  }

  await fs.writeFile(OUT_FILE, formatTs(vehicles), "utf8");
  console.log(`Wrote ${vehicles.length} → ${path.relative(ROOT, OUT_FILE)}`);
  console.log(
    "No price:",
    vehicles.filter((v) => !v.price).map((v) => `${v.brand} ${v.model}`).join("; ") ||
      "none",
  );
  console.log(
    "Brands:",
    [...new Set(vehicles.map((v) => v.brand))].sort().join(", "),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
