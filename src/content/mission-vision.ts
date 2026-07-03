import { Eye, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type MissionVisionCard = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const missionVisionCards: MissionVisionCard[] = [
  {
    id: "mission",
    title: "Our Mission",
    description:
      "To serve communities with compassion and integrity by delivering humanitarian aid, education, and sustainable development programs that uplift the most vulnerable and create lasting positive change.",
    icon: Target,
  },
  {
    id: "vision",
    title: "Our Vision",
    description:
      "A society where every person has access to dignity, opportunity, and hope — supported by transparent charity work, accountable partnerships, and a culture of verifiable impact.",
    icon: Eye,
  },
];

export const missionVisionSection = {
  eyebrow: "Who We Are",
  heading: "Guided by purpose, driven by impact",
  description:
    "Al-Misbah Center is committed to humanitarian work rooted in trust, transparency, and service to those who need it most.",
} as const;
