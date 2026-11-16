export type SceneId = "city" | "gis" | "mobile" | "platform";

export interface SceneDefinition {
  id: SceneId;
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
    label: "3D configurators",
    projectSlug: "3d-modular-house-configurator",
    stack: ["Three.js", "WebGL", "React", "AR & VR"],
    industry: "Real Estate & Construction",
  },
  {
    id: "gis",
    label: "GIS & mapping",
    projectSlug: "aerialgis-real-estate-gis-portal-react-django-postgis-mapbox",
    stack: ["Mapbox", "PostGIS", "Django", "React"],
    industry: "Real Estate & Construction",
  },
  {
    id: "mobile",
    label: "Mobile apps",
    projectSlug: "restaurant-discount-loyalty-platform-mobile-app-website",
    stack: ["React Native", "Ecommerce", "Mobile App"],
    industry: "Travel & Hospitality",
  },
  {
    id: "platform",
    label: "Platforms & APIs",
    projectSlug: "testpriser-ai-hospital-finder",
    stack: ["TypeScript", "Next.js", "Node.js", "MongoDB"],
    industry: "Healthcare",
  },
];
