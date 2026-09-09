import { faq } from "@/data/faq";
import { gallery } from "@/data/gallery";
import { reviews } from "@/data/reviews";
import { team } from "@/data/team";
import type { FaqItem, GalleryImage, Review, TeamMember } from "@/types/review";

export function getReviews(): Review[] {
  return reviews;
}

export function getFeaturedReviews(limit = 4): Review[] {
  const featured = reviews.filter((review) => review.featured);
  return (featured.length ? featured : reviews).slice(0, limit);
}

export function getTeam(): TeamMember[] {
  return team;
}

export function getGallery(): GalleryImage[] {
  return gallery;
}

export function getFeaturedGallery(limit = 6): GalleryImage[] {
  const featured = gallery.filter((image) => image.featured);
  return (featured.length ? featured : gallery).slice(0, limit);
}

export function getFaq(category?: string): FaqItem[] {
  if (!category) return faq;
  return faq.filter((item) => item.category === category);
}
