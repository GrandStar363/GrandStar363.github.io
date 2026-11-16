import type { Language, Person, Rating, Skill } from "@/content/schema";
import { languageLevel } from "./language-level";
import { mediaPaths } from "./media-paths";
import type { RawUser } from "./raw-schema";
import { cleanText } from "./text";

export function mapPerson(user: RawUser, now: Date): Person {
  const avatar = user.avatars.images["380"];
  return {
    name: cleanText(user.displayname),
    roles: user.featured_roles.map(cleanText),
    location: cleanText(user.location.text),
    available: Date.parse(user.available_at) <= now.getTime(),
    verified: user.verified,
    bio: cleanText(user.bio),
    avatar: {
      src: mediaPaths.avatar,
      width: avatar.width,
      height: avatar.height,
    },
  };
}

export function mapRating(user: RawUser): Rating {
  return { average: user.rating.avg, count: user.rating.count };
}

/** Strongest skills first; ties broken alphabetically so output is stable. */
export function mapSkills(user: RawUser): Skill[] {
  return user.skills
    .map((skill) => ({ name: cleanText(skill.name), level: skill.experience }))
    .sort((a, b) => b.level - a.level || a.name.localeCompare(b.name));
}

export function mapLanguages(user: RawUser): Language[] {
  return user.language.map((entry) => ({
    name: cleanText(entry.language),
    level: languageLevel(entry.experience),
  }));
}

export function mapSectors(user: RawUser): string[] {
  return user.sectors.map((sector) => cleanText(sector.name));
}
