import { profile, siteConfig } from "@/content";
import { Contact } from "@/features/contact";
import { Education } from "@/features/education";
import { Experience } from "@/features/experience";
import { Hero } from "@/features/hero";
import { ProjectsGrid } from "@/features/projects";
import { Reviews } from "@/features/reviews";
import { Skills } from "@/features/skills";
import { routes } from "@/shared/lib/routes";

export default function HomePage() {
  const { person, rating } = profile;
  return (
    <main id="main">
      <Hero
        person={person}
        rating={rating}
        featuredStack={siteConfig.featuredStack}
        email={siteConfig.email}
        projectsHref="#projects"
      />
      <Experience id="experience" roles={profile.experience} />
      <ProjectsGrid
        id="projects"
        projects={profile.projects}
        hrefFor={routes.project}
      />
      <Skills
        id="skills"
        skills={profile.skills}
        languages={profile.languages}
        sectors={profile.sectors}
      />
      <Reviews
        id="reviews"
        testimonials={profile.testimonials}
        rating={rating}
        hrefFor={routes.project}
      />
      <Education
        id="education"
        degrees={profile.degrees}
        certifications={profile.certifications}
      />
      <Contact
        id="contact"
        email={siteConfig.email}
        available={person.available}
      />
    </main>
  );
}
