export type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  source?: "google" | "website";
  featured?: boolean;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
};

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  category: "workshop" | "showroom" | "team" | "detail";
  featured?: boolean;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category?: string;
};
