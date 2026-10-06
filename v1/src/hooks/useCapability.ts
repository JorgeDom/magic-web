"use client";

import { useSyncExternalStore } from "react";

interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: string;
}

function connection(): NetworkInformation | undefined {
  return (navigator as Navigator & { connection?: NetworkInformation }).connection;
}

function onSlowConnection(): boolean {
  const info = connection();
  return Boolean(info?.saveData) || /(^|-)2g$/.test(info?.effectiveType ?? "");
}

/** Whether moving images (looping film, Rive) should load at all on this visit. */
function canLoadFilm(): boolean {
  return !onSlowConnection() && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Whether the device should get the WebGL star. Phones, low-power machines, data-saver
 * connections and reduced-motion visitors keep the static star, which is the designed default.
 */
function canRenderWebGL(): boolean {
  if (!canLoadFilm()) return false;
  if (!window.matchMedia("(min-width: 64rem) and (hover: hover) and (pointer: fine)").matches) {
    return false;
  }
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (memory !== undefined && memory < 4) return false;
  return (navigator.hardwareConcurrency ?? 4) >= 4;
}

const subscribe = () => () => {};

export function useCanRenderWebGL(): boolean {
  return useSyncExternalStore(subscribe, canRenderWebGL, () => false);
}

export function useCanLoadFilm(): boolean {
  return useSyncExternalStore(subscribe, canLoadFilm, () => false);
}
