export type GoogleReview = {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  rating: number;
  date: string;
  text: string;
};

export const googleReviewsSection = {
  eyebrow: "Community voices",
  heading: "Trusted by donors & volunteers",
  description:
    "Hear from people who have supported Al-Misbah Center and witnessed our work on the ground.",
  aggregateRating: 4.9,
  totalReviews: 128,
  businessName: "Al-Misbah Center",
} as const;

export const googleReviews: GoogleReview[] = [
  {
    id: "review-1",
    name: "Ahmed Hassan",
    initials: "AH",
    avatarColor: "#1a73e8",
    rating: 5,
    date: "2 weeks ago",
    text: "I donated for the clean water project and received clear updates with photos from the field. Very transparent and professional team.",
  },
  {
    id: "review-2",
    name: "Fatima Khan",
    initials: "FK",
    avatarColor: "#34a853",
    rating: 5,
    date: "1 month ago",
    text: "Al-Misbah Center helped our community during Ramadan food distribution. The volunteers were kind, organized, and truly cared.",
  },
  {
    id: "review-3",
    name: "Omar Siddiqui",
    initials: "OS",
    avatarColor: "#ea4335",
    rating: 5,
    date: "1 month ago",
    text: "One of the most trustworthy NGOs I have supported. They explain where every rupee goes and follow up after the project is completed.",
  },
  {
    id: "review-4",
    name: "Ayesha Malik",
    initials: "AM",
    avatarColor: "#fbbc04",
    rating: 5,
    date: "2 months ago",
    text: "We sponsored education kits through their website. The process was simple and we got a thank-you message with impact details.",
  },
  {
    id: "review-5",
    name: "Bilal Raza",
    initials: "BR",
    avatarColor: "#9334e6",
    rating: 4,
    date: "3 months ago",
    text: "Great humanitarian work in flood-affected areas. Would love even more frequent progress updates, but overall excellent experience.",
  },
  {
    id: "review-6",
    name: "Sana Iqbal",
    initials: "SI",
    avatarColor: "#0d9488",
    rating: 5,
    date: "3 months ago",
    text: "My family has donated multiple times. The team is responsive on WhatsApp and always shares proof of completed initiatives.",
  },
];
