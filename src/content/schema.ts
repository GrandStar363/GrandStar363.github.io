import { z } from "zod";

const text = z.string().trim().min(1);
const yearMonth = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Expected YYYY-MM");
const mediaPath = z
  .string()
  .regex(/^\/media\/[\w./-]+$/, "Expected a /media/ path");
const slug = z
  .string()
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Expected a kebab-case slug");

const mediaSchema = z.object({
  src: mediaPath,
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

export const personSchema = z.object({
  name: text,
  roles: z.array(text).min(1),
  location: text,
  available: z.boolean(),
  verified: z.boolean(),
  bio: text,
  avatar: mediaSchema,
});

export const ratingSchema = z.object({
  average: z.number().min(0).max(5),
  count: z.number().int().nonnegative(),
});

export const languageLevelSchema = z.enum([
  "Fluent",
  "Advanced",
  "Intermediate",
  "Beginner",
]);

export const languageSchema = z.object({
  name: text,
  level: languageLevelSchema,
});

export const skillSchema = z.object({
  name: text,
  level: z.number().int().min(0).max(100),
});

export const roleSchema = z.object({
  id: text,
  company: text,
  title: text,
  start: yearMonth,
  end: yearMonth.nullable(),
  summary: z.string().trim(),
});

export const highlightSchema = z.object({
  heading: text,
  items: z.array(text).min(1),
});

export const projectSchema = z.object({
  id: text,
  slug,
  title: text,
  role: text.nullable(),
  summary: z.array(text).min(1),
  highlights: z.array(highlightSchema),
  skills: z.array(text),
  cover: mediaSchema,
  video: mediaSchema.nullable(),
});

export const testimonialSchema = z.object({
  id: text,
  author: text,
  project: text,
  projectSlug: slug.nullable(),
  quote: text,
});

export const degreeSchema = z.object({
  qualification: text,
  institution: text,
  startYear: z.number().int(),
  endYear: z.number().int(),
});

export const certificationSchema = z.object({ name: text });

export const profileSchema = z.object({
  person: personSchema,
  rating: ratingSchema,
  languages: z.array(languageSchema),
  skills: z.array(skillSchema),
  sectors: z.array(text),
  experience: z.array(roleSchema),
  projects: z.array(projectSchema),
  testimonials: z.array(testimonialSchema),
  degrees: z.array(degreeSchema),
  certifications: z.array(certificationSchema),
});

export const navItemSchema = z.object({ id: slug, label: text });

export const externalProfileSchema = z.object({
  label: text,
  url: z.url({ protocol: /^https$/ }),
});

export const siteConfigSchema = z.object({
  url: z.url(),
  /** Contact addresses; the first one is primary ("Email me" buttons, structured data). */
  emails: z.tuple([z.email()], z.email()),
  profiles: z.array(externalProfileSchema),
  featuredStack: z.array(text).min(1),
  nav: z.array(navItemSchema).min(1),
});

export type Media = z.infer<typeof mediaSchema>;
export type Person = z.infer<typeof personSchema>;
export type Rating = z.infer<typeof ratingSchema>;
export type LanguageLevel = z.infer<typeof languageLevelSchema>;
export type Language = z.infer<typeof languageSchema>;
export type Skill = z.infer<typeof skillSchema>;
export type Role = z.infer<typeof roleSchema>;
export type Highlight = z.infer<typeof highlightSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type Degree = z.infer<typeof degreeSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type NavItem = z.infer<typeof navItemSchema>;
export type ExternalProfile = z.infer<typeof externalProfileSchema>;
export type SiteConfig = z.infer<typeof siteConfigSchema>;
