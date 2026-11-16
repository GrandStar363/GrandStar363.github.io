import { z } from "zod";

/** Shapes of the Twine data we consume. Unknown keys are stripped; missing keys fail the sync. */

const imageUrl = z.object({ main: z.url() });
const squareImage = z.object({
  width: z.number(),
  height: z.number(),
  square: imageUrl,
});
const wideImage = z.object({
  width: z.number(),
  height: z.number(),
  wide: imageUrl,
});

const rawWork = z.object({
  id: z.number(),
  company_name: z.string(),
  job_title: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  description: z.string(),
});

const rawEducation = z.object({
  qualification: z.string(),
  organization: z.string(),
  started_at: z.string(),
  ended_at: z.string(),
});

export const rawUserSchema = z.object({
  displayname: z.string(),
  bio: z.string(),
  verified: z.boolean(),
  available_at: z.string(),
  featured_roles: z.array(z.string()),
  location: z.object({ text: z.string() }),
  rating: z.object({ avg: z.number(), count: z.number() }),
  skills: z.array(z.object({ name: z.string(), experience: z.number() })),
  language: z.array(z.object({ language: z.string(), experience: z.number() })),
  sectors: z.array(z.object({ name: z.string() })),
  workexperience: z.array(rawWork),
  education: z.array(rawEducation),
  avatars: z.object({ images: z.object({ "380": squareImage }) }),
});

export const rawProjectSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  mediaType: z.string(),
  links: z.object({ main: z.url() }),
  thumbnails: z.object({ images: z.object({ "405": wideImage }) }),
});

export const rawProfileStateSchema = z.object({
  entities: z.object({
    users: z.record(z.string(), rawUserSchema),
    projects: z.record(z.string(), rawProjectSchema),
    credits: z.record(z.string(), z.object({ project_id: z.number() })),
  }),
  portfolio: z.record(z.string(), z.object({ credits: z.array(z.number()) })),
});

export const rawProjectPageSchema = z.object({
  entities: z.object({
    projects: z.record(z.string(), z.object({ stream: z.unknown() })),
  }),
});

const rawTestimonial = z.object({
  id: z.number(),
  name: z.string(),
  project_name: z.string(),
  comment: z.string(),
});

const pagination = z.object({
  current_page: z.number(),
  total_pages: z.number(),
});

export const rawTestimonialPageSchema = z.object({
  testimonials: z.array(rawTestimonial).default([]),
  meta: z.object({
    testimonials: z.array(rawTestimonial).default([]),
    pagination,
  }),
});

export type RawUser = z.infer<typeof rawUserSchema>;
export type RawWork = z.infer<typeof rawWork>;
export type RawEducation = z.infer<typeof rawEducation>;
export type RawProject = z.infer<typeof rawProjectSchema>;
export type RawProfileState = z.infer<typeof rawProfileStateSchema>;
export type RawTestimonial = z.infer<typeof rawTestimonial>;
export type RawTestimonialPage = z.infer<typeof rawTestimonialPageSchema>;
