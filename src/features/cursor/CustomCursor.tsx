"use client";

import { useEffect, useRef } from "react";
import { createCursorController } from "./cursor-controller";
import { supportsCustomCursor } from "./cursor-support";
import styles from "./cursor.module.css";

export function CustomCursor() {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!layer.current || !supportsCustomCursor(window)) return;
    return createCursorController(layer.current);
  }, []);

  return (
    <div ref={layer} aria-hidden="true" className={styles.layer}>
      <div data-cursor-ring className={styles.ring} />
      <div data-cursor-dot className={styles.dot} />
    </div>
  );
}
