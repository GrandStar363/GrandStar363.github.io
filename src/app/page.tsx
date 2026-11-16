import { profile, siteConfig } from "@/content";
import { WorkLegend } from "@/features/backdrop";
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
        primaryEmail={siteConfig.emails[0]}
        projectsHref="#projects"
        profiles={siteConfig.profiles}
        aside={
          <WorkLegend projects={profile.projects} sectors={profile.sectors} />
        }
      />
      <ProjectsGrid
        id="projects"
        projects={profile.projects}
        hrefFor={routes.project}
      />
      <Experience id="experience" roles={profile.experience} />
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
        emails={siteConfig.emails}
        profiles={siteConfig.profiles}
        available={person.available}
      />
    </main>
  );
}
