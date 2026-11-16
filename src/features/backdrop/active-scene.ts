type Listener = () => void;

let active = 0;
const listeners = new Set<Listener>();

/**
 * Index of the scene currently showing. The background cycle writes it and the legend reads it,
 * so both stay in step across the page (and across client-side navigation).
 */
export const activeScene = {
  get: (): number => active,
  set(index: number): void {
    if (index === active) return;
    active = index;
    listeners.forEach((listener) => listener());
  },
  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
