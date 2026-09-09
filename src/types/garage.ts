export type OpeningDay =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type OpeningHoursEntry = {
  day: OpeningDay;
  label: string;
  open: string | null;
  close: string | null;
  closed?: boolean;
};

export type Address = {
  street: string;
  postalCode: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
};

export type Coordinates = {
  lat: number;
  lng: number;
};

export type SocialLinks = {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
};

export type GarageStat = {
  label: string;
  value: string;
};

export type UspItem = {
  title: string;
  description: string;
};

export type GarageColors = {
  ink: string;
  paper: string;
  surface: string;
  muted: string;
  line: string;
  accent: string;
  accentHover: string;
  success: string;
};

export type GarageConfig = {
  name: string;
  shortName: string;
  legalName: string;
  tagline: string;
  description: string;
  logo: string;
  colors: GarageColors;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  website: string;
  address: Address;
  coordinates: Coordinates;
  openingHours: OpeningHoursEntry[];
  socials: SocialLinks;
  reviewScore: number;
  reviewCount: number;
  stats: GarageStat[];
  uspItems: UspItem[];
  kvk?: string;
  btw?: string;
};
