// Every word on the page. Brand claims are English; everything functional is Spanish (es-PY,
// voseo). One language per sentence, one claim per section.
import { todo } from "./site";

export const CLAIMS = {
  hero: "MAKE SOME MAGIC.",
  intro: "Little details. Big magic.",
  closing: "Made by you. Made to remember.",
} as const;

/** Splits a two-sentence claim so each sentence can sit on its own line. */
export const sentences = (claim: string) => claim.split(/(?<=\.)\s+/);

export const COPY = {
  skipLink: "Saltar al contenido",
  newTab: "(se abre en una pestaña nueva)",
  nav: { book: "Reservá", home: "MAgic! Creative Studio, inicio" },
  hero: {
    line: "Un estudio creativo para hacer con tus manos: charms, llaveros, piezas pintadas y accesorios a tu manera.",
    cta: "Reservá por WhatsApp",
    message: "Hola MAgic! Quiero reservar una experiencia.",
    sound: "Sonido",
  },
  intro: {
    line: "Elegís las piezas, las armás con tus manos y te llevás algo que no tiene nadie más.",
  },
  worlds: { label: "Mundos" },
  how: {
    heading: "Cómo funciona",
    steps: [
      { title: "Elegí", text: "Tu mundo y tu formato. Lo definimos juntos por WhatsApp." },
      { title: "Hacé", text: "Armás tu pieza a tu ritmo, con todo listo sobre la mesa." },
      { title: "Recordá", text: "Te la llevás puesta. Hecha por vos." },
    ],
  },
  making: {
    heading: "Así se hace",
    // One frame per shot type in the brand book. `key` is the photo's file name in src/assets/photos.
    shots: [
      { key: "making", caption: "The Making", shot: "Manos trabajando sobre la mesa" },
      { key: "details", caption: "The Details", shot: "Primer plano de charms y materiales" },
      { key: "experience", caption: "The Experience", shot: "Personas creando juntas" },
      { key: "result", caption: "The Result", shot: "La pieza terminada, puesta" },
    ],
  },
  testimonials: {
    heading: "Lo que cuentan",
    // None confirmed yet. Replace with real quotes and attributions before launch.
    quotes: [
      { quote: todo("Testimonio real de un cumpleaños"), by: todo("Nombre, ocasión") },
      { quote: todo("Testimonio real de un evento privado"), by: todo("Nombre, ocasión") },
      { quote: todo("Testimonio real de una marca"), by: todo("Nombre, empresa") },
    ],
  },
  final: {
    line: "Contanos qué querés celebrar y armamos la mesa.",
    cta: "Reservá por WhatsApp",
    message: "Hola MAgic! Quiero reservar una experiencia.",
    instagram: "Seguinos en Instagram",
  },
  form: {
    heading: "O dejanos tus datos",
    name: "Nombre",
    contact: "WhatsApp o email",
    message: "Contanos qué tenés en mente",
    submit: "Enviar consulta",
    sending: "Enviando…",
    sent: "Consulta enviada. Te escribimos pronto.",
    error:
      "No pudimos enviar tu consulta. Revisá tu conexión y probá de nuevo, o escribinos por WhatsApp.",
  },
  footer: {
    write: "Escribinos",
    follow: "Seguinos",
    where: "Dónde estamos",
    hours: "Horarios",
    rights: "Todos los derechos reservados.",
  },
  film: { play: "Reproducir video", pause: "Pausar video" },
  notFound: {
    title: "No encontramos esa página.",
    text: "Puede que el enlace esté roto o que la página ya no exista.",
    cta: "Volver al inicio",
  },
} as const;

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
  /** Photo file name in src/assets/photos, and what the shot should show. */
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

/** The in-page anchor of a world's opening card. */
export const worldAnchor = (id: WorldId) => `mundo-${id}`;
