// Every word on the page. Brand claims are English; everything functional is Spanish (es-PY,
// voseo). One language per sentence, one claim per section.

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
    message: "Hola MAgic! Vengo de su página web y quiero hacerles una consulta.",
    rights: "Todos los derechos reservados.",
    legal: "Aviso legal y privacidad",
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

/**
 * Alt text for each photo in src/assets/photos, by file name: what the photo shows, in Spanish.
 * Add a line when you add a photo; without one, the frame's brief is used instead.
 */
export const PHOTO_ALT: Record<string, string> = {
  kids: "Dos chicos con delantales de MAgic! armando osos de peluche en una mesa al aire libre",
  "kids-2": "Una nena elige cuentas de colores de una caja organizadora",
  "kids-3":
    "Una nena con delantal de MAgic! pinta de rosa una alcancía de cerámica en forma de chanchito",
  "kids-4":
    "Nenas pintando figuras de cerámica en mesas bajas, sentadas en almohadones, en un estudio luminoso de MAgic!",
  teens: "Chicas eligiendo charms en una mesa con luces cálidas y arcos lilas",
  "teens-2":
    "Cinco chicas arman pulseras alrededor de una mesa lila con cajas de cuentas y bolsas de MAgic!",
  "teens-3": "Manos enganchan un bag charm de cuentas de colores a una cartera crema",
  "teens-4":
    "Fundas transparentes de celular, correas trenzadas, phone charms de cuentas y stickers sobre fondo lila",
  "grown-ups-3": "Bodies de bebé pintados con flores y un sol, colgados de una cuerda con broches",
  "grown-ups-4":
    "Caja de regalo de MAgic! con papel rosa, aros y anillos dorados, abanico, tarjetas y cintas",
  "grown-ups":
    "Un grupo armando piezas en una mesa larga junto a la ventana, con una instructora de MAgic!",
  "grown-ups-2":
    "Mesa preparada para un taller privado, con kits de cuentas y bolsas de MAgic! en cada lugar",
  brands:
    "Dos anfitrionas de MAgic! atienden a clientas en una estación de charms en un evento de marca",
  "brands-2": "Una clienta engancha un charm de flor al cierre de un neceser de MAgic!",
  "brands-3":
    "En el mostrador de una tienda, una anfitriona de MAgic! le pone un charm con la letra A y un moño a la cartera de una clienta",
  "brands-4": "Manos atan un moño verde sobre cajas de regalo de MAgic! listas para entregar",
  making:
    "Manos enhebrando un collar de perlas sobre una mesa rosa con cuentas y bolsitas de MAgic!",
  details: "Mesa con mantel rosa, perlas, cadenas doradas, pinzas y bolsitas de tela de MAgic!",
  experience: "Amigas armando charms alrededor de una mesa lila con bolsas de MAgic!",
  result: "Una muñeca con pulseras doradas y charms de colores",
};

/** The in-page anchor of a world's opening card. */
export const worldAnchor = (id: WorldId) => `mundo-${id}`;
