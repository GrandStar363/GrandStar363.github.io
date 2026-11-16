"use client";

import { useEffect, useRef, useState } from "react";
import { counterDigits } from "./dial-geometry";
import styles from "./loader.module.css";

const GIVE_UP_MS = 6000;

/** Mirrors the loader's animated --progress custom property as text, so number and arc stay in sync. */
export function ProgressCounter() {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element || !element.checkVisibility()) return;
    const started = performance.now();
    let frame = 0;
    const read = () => {
      const progress =
        Number.parseFloat(
          getComputedStyle(element).getPropertyValue("--progress"),
        ) || 0;
      setValue(progress);
      if (progress < 100 && performance.now() - started < GIVE_UP_MS)
        frame = requestAnimationFrame(read);
    };
    frame = requestAnimationFrame(read);
    return () => cancelAnimationFrame(frame);
  }, []);

  const [lead, significant] = counterDigits(value);
  return (
    <span ref={ref}>
      <span className={styles.lead}>{lead}</span>
      {significant}
    </span>
  );
}
