export const websiteRoutes = {
  home: "/",
  projects: "/projects",
  gallery: "/gallery",
  about: "/about",
  contact: "/contact",
  privacyPolicy: "/privacy-policy",
  terms: "/terms",
} as const;

export const adminRoutes = {
  login: "/admin/login",
  dashboard: "/admin/dashboard",
  hero: "/admin/hero",
  homeVideo: "/admin/home-video",
  projects: "/admin/projects",
  gallery: "/admin/gallery",
  pages: "/admin/pages",
  settings: "/admin/settings",
  messages: "/admin/messages",
} as const;
