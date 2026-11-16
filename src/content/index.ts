import snapshot from "./profile.json";
import { profileSchema } from "./schema";

export const profile = profileSchema.parse(snapshot);

export { siteConfig } from "./site.config";
export { findProject, testimonialsForProject } from "./queries";
export type * from "./schema";
