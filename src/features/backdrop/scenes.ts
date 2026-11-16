export type SceneId =
  | "city"
  | "gis"
  | "mobile"
  | "booking"
  | "ar"
  | "delivery"
  | "ai"
  | "commerce"
  | "platform";

export interface SceneDefinition {
  id: SceneId;
  /** One-word name for the topic index ("3D", "GIS", …). */
  topic: string;
  label: string;
  /** Portfolio project the scene illustrates. */
  projectSlug: string;
  /** Preferred tags to show; only those the project really lists are displayed. */
  stack: readonly string[];
  /** Must be one of the industries on the profile to be shown. */
  industry: string;
}

export const SCENES: readonly SceneDefinition[] = [
  {
    id: "city",
    topic: "3D",
    label: "3D configurators",
    projectSlug: "3d-modular-house-configurator",
    stack: ["Three.js", "WebGL", "React", "AR & VR"],
    industry: "Real Estate & Construction",
  },
  {
    id: "gis",
    topic: "GIS",
    label: "GIS & mapping",
    projectSlug: "aerialgis-real-estate-gis-portal-react-django-postgis-mapbox",
    stack: ["Mapbox", "PostGIS", "Django", "React"],
    industry: "Real Estate & Construction",
  },
  {
    id: "mobile",
    topic: "Mobile",
    label: "Mobile apps",
    projectSlug: "restaurant-discount-loyalty-platform-mobile-app-website",
    stack: ["React Native", "Ecommerce", "Mobile App"],
    industry: "Travel & Hospitality",
  },
  {
    id: "booking",
    topic: "Booking",
    label: "Booking & payments",
    projectSlug: "gtplux-boat-booking-platform-multi-language",
    stack: ["FullCalendar", "Stripe", "React", "Laravel"],
    industry: "Travel & Hospitality",
  },
  {
    id: "ar",
    topic: "AR",
    label: "AR product try-on",
    projectSlug: "ar-try-on-8thwall-3d-models-threejs-product-visualization",
    stack: ["Three.js", "WebXR", "Unity", "Next.js"],
    industry: "Consumer Goods",
  },
  {
    id: "delivery",
    topic: "Delivery",
    label: "Healthcare delivery",
    projectSlug:
      "medigo-online-pharmacy-medicine-delivery-mobile-app-development",
    stack: ["Flutter", "UX & UI Design", "Mobile App"],
    industry: "Healthcare",
  },
  {
    id: "ai",
    topic: "AI",
    label: "AI-powered apps",
    projectSlug: "nur-ai-powered-islamic-app-flutter",
    stack: ["OpenAI API", "Flutter", "Laravel"],
    industry: "Education",
  },
  {
    id: "commerce",
    topic: "Commerce",
    label: "E-commerce & IoT",
    projectSlug: "smart-e-commerce-website-modern-for-security-iot-products",
    stack: ["Responsive Design", "UI/UX Prototyping", "Front-End Development"],
    industry: "Computers & Electronics",
  },
  {
    id: "platform",
    topic: "APIs",
    label: "Platforms & APIs",
    projectSlug: "testpriser-ai-hospital-finder",
    stack: ["Node.js", "MongoDB", "Next.js", "TypeScript"],
    industry: "Healthcare",
  },
];
