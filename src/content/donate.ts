export type DonateBankAccount = {
  id: string;
  bankName: string;
  accountTitle: string;
  accountNumber: string;
  iban: string;
  branch?: string;
  swift?: string;
  currency: string;
  /** Optional payment QR image path under /public */
  qrImageUrl?: string;
  qrLabel?: string;
};

export type DonateLocation = {
  id: string;
  name: string;
  address: string;
  city: string;
  phone?: string;
  hours?: string;
  lat: number;
  lng: number;
};

export const donatePageContent = {
  eyebrow: "Support our mission",
  title: "Donate now",
  description:
    "Your contribution helps us deliver clean water, healthcare, education, and emergency relief. Transfer directly to our bank accounts or visit us at the locations below.",
  bankSectionTitle: "Bank transfer details",
  bankSectionDescription:
    "Please use your full name as the transfer reference so our team can confirm your donation.",
  locationsSectionTitle: "Visit our offices",
  locationsSectionDescription:
    "Find us on the map, get directions, or call before you visit.",
  registrationTitle: "FBR registration proof",
  registrationDescription:
    "Al-Misbah Center is registered with the Federal Board of Revenue (FBR). View or download our official registration document below.",
  registrationPdfPath: "/pdf/fbr-registration.pdf",
  registrationPdfLabel: "FBR Registration Certificate",
  projectsCtaTitle: "Prefer to sponsor a project?",
  projectsCtaDescription:
    "Choose a specific initiative and complete checkout online.",
} as const;

/** Editable bank accounts shown on /donate — update these with real details. */
export const donateBankAccounts: DonateBankAccount[] = [
  {
    id: "pkr-main",
    bankName: "Meezan Bank",
    accountTitle: "ALI MURTAZA",
    accountNumber: "11550107194829",
    iban: "PK35MEZN0011550107194829",
    branch: "QAINCHI AMAR SIDHU BR",
    currency: "PKR",
    qrImageUrl: "/QR-code/meezan-bank-qr.jpeg",
    qrLabel: "Scan to pay — Meezan Bank",
  },
];

/** Office / collection locations with map coordinates. */
export const donateLocations: DonateLocation[] = [
  {
    id: "lahore-hq",
    name: "Head Office — Lahore",
    address: "Al-Misbah Center, Main Boulevard, Gulberg",
    city: "Lahore, Punjab",
    phone: "+92 300 0000000",
    hours: "Mon–Sat, 10:00 AM – 6:00 PM",
    lat: 31.5204,
    lng: 74.3587,
  },
  {
    id: "lahore-south",
    name: "South Lahore Desk",
    address: "Near Model Town Link Road",
    city: "Lahore, Punjab",
    phone: "+92 300 0000001",
    hours: "Mon–Fri, 11:00 AM – 5:00 PM",
    lat: 31.4821,
    lng: 74.3172,
  },
];
