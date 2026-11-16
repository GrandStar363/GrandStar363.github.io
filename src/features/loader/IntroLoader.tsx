import { Dial } from "./Dial";
import styles from "./loader.module.css";
import { ProgressCounter } from "./ProgressCounter";

interface IntroLoaderProps {
  name: string;
  location: string;
  tagline: readonly string[];
}

/**
 * First-visit intro. Its whole timeline (progress, exit) is CSS-driven, so it always finishes,
 * even before or without JavaScript. Decorative: hidden from assistive technology.
 */
export function IntroLoader({ name, location, tagline }: IntroLoaderProps) {
  return (
    <div aria-hidden="true" data-intro-loader="" className={styles.root}>
      <div className={styles.stage}>
        <Dial location={location} />
        <p className={styles.counter}>
          <ProgressCounter />
          <sup>%</sup>
        </p>
        <p className={styles.name}>{name}</p>
        <p className={styles.tagline}>{tagline.join(" · ")}</p>
      </div>
    </div>
  );
}
