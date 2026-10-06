// One place that knows how the page scrolls, so components never talk to Lenis directly.
import type Lenis from "lenis";

let lenis: Lenis | null = null;

export function registerLenis(instance: Lenis | null): void {
  lenis = instance;
}

function jump(target: HTMLElement): void {
  if (lenis) lenis.scrollTo(target, { immediate: true, force: true });
  else target.scrollIntoView({ behavior: "instant", block: "start" });
}

/**
 * Jumps to a section. Where the View Transitions API exists (and motion is welcome) the two
 * states cross-fade; otherwise the jump is immediate. Focus then moves to `focusTarget` (the
 * section's heading) so keyboard and screen-reader users land where sighted users do.
 */
export function jumpToSection(target: HTMLElement, focusTarget?: HTMLElement | null): void {
  const finish = () => focusTarget?.focus({ preventScroll: true });
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced || typeof document.startViewTransition !== "function") {
    jump(target);
    finish();
    return;
  }
  document.startViewTransition(() => jump(target)).finished.finally(finish);
}
