export type MissionVisionBlock = {
  id: string;
  label: string;
  title: string;
  body: string;
};

export const missionVisionBlocks: MissionVisionBlock[] = [
  {
    id: "mission",
    label: "Mission",
    title: "Serve first. Prove every step.",
    body: "We put aid, education, and community support where the need is clearest — and we keep the work transparent so donors can see what their support actually does.",
  },
  {
    id: "vision",
    label: "Vision",
    title: "Dignity should not be rare.",
    body: "We work toward communities where families can stand on firmer ground: fed, taught, and treated with respect — not as a favor, but as a standard.",
  },
];
