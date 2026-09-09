export type ServiceFaq = {
  question: string;
  answer: string;
};

export type Service = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  featured: boolean;
  priceFrom?: number;
  priceLabel?: string;
  highlights: string[];
  whenNeeded: string[];
  whyUs: string[];
  faq: ServiceFaq[];
  relatedSlugs: string[];
};
