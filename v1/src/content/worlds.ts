// The four worlds. Service names come from the project brief; the full service menu has not
// been supplied yet, so there are no descriptions or prices here. Do not add any without it.

export type WorldId = "kids" | "teens" | "grown-ups" | "brands";

export interface World {
  id: WorldId;
  /** World names are brand terms and stay in English. */
  name: string;
  /** One line, in Spanish. */
  line: string;
  services: readonly string[];
  cta: { label: string; message: string };
  /** Key in the media manifest (brand/photos/<key>.jpg) and what the shot should show. */
  media: { key: string; shot: string };
}

export const WORLDS: readonly World[] = [
  {
    id: "kids",
    name: "Kids",
    line: "Manos ocupadas, colores por todos lados y una pieza propia para llevarse a casa.",
    services: ["Cumpleaños", "Talleres"],
    cta: {
      label: "Reservá un cumpleaños",
      message: "Hola MAgic! Quiero consultar por un cumpleaños o taller para chicos.",
    },
    media: { key: "kids", shot: "The Experience: chicos armando charms en la mesa" },
  },
  {
    id: "teens",
    name: "Teens",
    line: "Elegí, combiná y salí con tu pieza puesta.",
    services: ["Bag charms", "Llaveros", "Gorras", "Phone charms"],
    cta: {
      label: "Reservá un taller",
      message: "Hola MAgic! Quiero consultar por un taller de charms para teens.",
    },
    media: { key: "teens", shot: "The Details: bag charms colgando, primer plano" },
  },
  {
    id: "grown-ups",
    name: "Grown Ups",
    line: "Una mesa linda, buena compañía y algo hecho por vos para llevarte.",
    services: ["Girls night", "Bridal shower", "Baby shower", "Talleres privados"],
    cta: {
      label: "Reservá tu evento",
      message: "Hola MAgic! Quiero consultar por un evento privado.",
    },
    media: { key: "grown-ups", shot: "The Experience: mesa armada, luz cálida" },
  },
  {
    id: "brands",
    name: "Brands",
    line: "Llevamos la experiencia a tu evento. Tu marca adelante, nuestras manos detrás.",
    services: ["Eventos corporativos", "Pop-ups", "PR gifting", "Activaciones"],
    cta: {
      label: "Cotizá una activación",
      message: "Hola MAgic! Quiero cotizar una activación para mi marca.",
    },
    media: { key: "brands", shot: "The Making: manos trabajando, mesa limpia, marca anfitriona" },
  },
];

/** The in-page anchor of a world's section. */
export const worldAnchor = (id: WorldId) => `mundo-${id}`;

/**
 * Tempo per world, for JavaScript-driven scenes. Mirrors the `--world-*` tokens in globals.css
 * and the World Modes table in DESIGN.md: change all three together.
 */
export const WORLD_TEMPO: Record<WorldId, { duration: number; scrub: number; ease: string }> = {
  kids: { duration: 1.2, scrub: 1.2, ease: "sine.inOut" },
  teens: { duration: 0.36, scrub: 0.3, ease: "back.out(2)" },
  "grown-ups": { duration: 0.9, scrub: 0.8, ease: "expo.out" },
  brands: { duration: 1.4, scrub: 1.5, ease: "power1.inOut" },
};
