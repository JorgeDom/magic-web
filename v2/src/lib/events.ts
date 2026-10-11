// Seasonal dates: what MAgic! sets up for companies around each one. Not a calendar, a
// showcase that ends in "write to us". One entry per date drives everything: its door in the
// home page's "Fechas especiales" section, the floating cue that points to that section, and
// its own page at magic.com.py/<slug>.
//
// To add a date: add an entry here, a wash for its page in components/Wash.astro, and its
// photographs in src/assets/photos/events (named as in `photo` below). To take one down:
// `show: false`. A date whose page is not ready is `live: false`: it still shows its door,
// marked "Muy pronto", but the door is not a link and its page is not built.
//
// Each date brings its own colours (the studio's choice: they match its Instagram campaign).
// They apply to its door and its page only; the rest of the site keeps the brand palette.

export interface EventPalette {
  /** The page and the door. */
  ground: string;
  /** Text on the ground. Always passes AA on it. */
  ink: string;
  /** The date's own colour, for large type and graphics only (it need only pass 3:1). */
  accent: string;
  /** A companion colour, for ribbons, cords and shapes. Never for text. */
  soft: string;
  /** A dark ground, where secondary text and hairlines are light. */
  dark?: boolean;
  /**
   * The closing panel on the page: its ground, its text, and its secondary text (which must
   * pass AA on that ground too).
   */
  panel: { ground: string; ink: string; muted: string };
}

export interface Experience {
  title: string;
  text: string;
  /** File name in src/assets/photos/events, without extension, and what the shot should show. */
  photo: string;
  shot: string;
}

export interface SeasonalEvent {
  /** The page's address: magic.com.py/<slug>. */
  slug: string;
  name: string;
  show: boolean;
  /**
   * Whether its page is published. While false the door says "Muy pronto" and the page is not
   * built, so its content can be drafted here without going public.
   */
  live: boolean;
  /** Its charm, hanging in its door on the home page. */
  motif: "bow" | "bat" | "snowflake";
  /** One line under the name, on the door. */
  teaser: string;
  palette: EventPalette;
  page?: {
    /** For search results and link previews. */
    description: string;
    /** The name as set on the page, one line each; `accent` lines take the date's colour. */
    title: { text: string; accent?: boolean }[];
    lead: string;
    cover: { photo: string; shot: string };
    /**
     * The page's own scene (see pages/[event].astro): `ribbon` is a satin ribbon tied in bows;
     * `night` is a night sky with a moon, bats, pumpkins and lightning; `snow` is falling
     * snow, a string of lights and a snow globe.
     */
    scene: "ribbon" | "night" | "snow";
    experiencesHeading: string;
    experiences: Experience[];
    closing: { phrase: string; note: string };
    cta: { label: string; message: string };
  };
}

// Octubre Rosa: copy and colours come from the studio's own Instagram campaign (October 2026).
//
// Halloween and Navidad are FIRST DRAFTS, written here so the pages could be built: the four
// experiences are the Octubre Rosa formats in each date's theme, and the colours are a
// proposal. Replace them with the studio's own campaign when it exists.
export const EVENTS: readonly SeasonalEvent[] = [
  {
    slug: "octubrerosa",
    name: "Octubre Rosa",
    show: true,
    live: true,
    motif: "bow",
    teaser: "Experiencias creativas para tu equipo.",
    palette: {
      ground: "#f6e2e0",
      ink: "#4c4039",
      accent: "#c25767",
      soft: "#e78f96",
      panel: { ground: "#4c4039", ink: "#faf7f1", muted: "rgb(250 247 241 / 0.8)" },
    },
    page: {
      description:
        "Octubre Rosa con MAgic!: experiencias creativas para equipos de trabajo. Remeras, totes y neceseres personalizados, copas pintadas a mano, velas y charm bar. Cotizá tu fecha.",
      title: [{ text: "Octubre" }, { text: "Rosa", accent: true }],
      lead: "Experiencias creativas para tu equipo. Llevamos todo a tu empresa y cada persona se lleva algo hecho por ella.",
      cover: { photo: "octubrerosa", shot: "Mesa armada en rosa: cuentas, dijes y bolsita MAgic!" },
      scene: "ribbon",
      experiencesHeading: "Cuatro experiencias para elegir",
      experiences: [
        {
          title: "Personalizá tu outfit",
          text: "Remeras rosa y blancas con stickers DTF UV: lazos, flores y frases que empoderan.",
          photo: "octubrerosa-remeras",
          shot: "Manos aplicando un sticker de lazo rosa sobre una remera blanca",
        },
        {
          title: "Tu neceser o tote, a tu manera",
          text: "Telas crudas, planchita portátil y parches de lazos y flores. Cada uno se lleva el suyo.",
          photo: "octubrerosa-totes",
          shot: "Neceser y tote de tela cruda con parches de lazos y flores",
        },
        {
          title: "Copas que brindan por ellas",
          text: "Pintamos copas a mano con acrílicos rosa, blanco y dorado. Para el brindis de cierre.",
          photo: "octubrerosa-copas",
          shot: "Una copa pintada a mano con un lazo rosa y flores",
        },
        {
          title: "Velas y charm bar",
          text: "Velas artesanales con lazo rosa y una barra de cuentas, hilos y charms para armar tu pulsera.",
          photo: "octubrerosa-velas",
          shot: "Vela con lazo rosa y manos armando una pulsera de cuentas",
        },
      ],
      closing: {
        phrase: "Llevá esta magia a tu empresa.",
        note: "Escribinos y cotizá tu fecha de octubre.",
      },
      cta: {
        label: "Cotizá por WhatsApp",
        message: "Hola MAgic! Quiero cotizar una experiencia de Octubre Rosa para mi empresa.",
      },
    },
  },
  {
    slug: "halloween",
    name: "Halloween",
    show: true,
    live: false,
    motif: "bat",
    teaser: "Una tarde distinta para tu equipo.",
    // Night: a deep aubergine, with the brand's peach as the pumpkin and its lavender for detail.
    palette: {
      ground: "#33293a",
      ink: "#faf7f1",
      accent: "#f3a172",
      soft: "#9c91ce",
      dark: true,
      panel: { ground: "#faf7f1", ink: "#4c4039", muted: "rgb(76 64 57 / 0.8)" },
    },
    page: {
      description:
        "Halloween con MAgic!: experiencias creativas para equipos de trabajo. Charm bar, totes y neceseres con parches, remeras personalizadas y copas pintadas a mano. Cotizá tu fecha.",
      title: [{ text: "Halloween", accent: true }],
      lead: "Una tarde distinta para tu equipo. Llevamos todo a tu empresa y cada persona se lleva su pieza de Halloween, hecha por ella.",
      cover: {
        photo: "halloween",
        shot: "Mesa armada de Halloween: cuentas, dijes y bolsita MAgic!",
      },
      scene: "night",
      experiencesHeading: "Cuatro experiencias para elegir",
      experiences: [
        {
          title: "Charm bar de Halloween",
          text: "Cuentas, hilos y charms de lunas, fantasmas y calabazas para armar tu pulsera o tu llavero.",
          photo: "halloween-charms",
          shot: "Manos armando una pulsera con charms de luna y calabaza",
        },
        {
          title: "Tu tote o neceser, con parches",
          text: "Telas crudas, planchita portátil y parches de murciélagos, calabazas y estrellas. Cada uno se lleva el suyo.",
          photo: "halloween-totes",
          shot: "Tote de tela cruda con parches de Halloween",
        },
        {
          title: "Personalizá tu remera",
          text: "Remeras negras y blancas con stickers DTF UV de Halloween, para estrenar ese mismo día.",
          photo: "halloween-remeras",
          shot: "Manos aplicando un sticker de Halloween sobre una remera negra",
        },
        {
          title: "Copas para brindar de noche",
          text: "Pintamos copas a mano con acrílicos naranja, violeta y dorado. Para el brindis de cierre.",
          photo: "halloween-copas",
          shot: "Una copa pintada a mano con una luna y estrellas",
        },
      ],
      closing: {
        phrase: "Llevá esta magia a tu empresa.",
        note: "Escribinos y cotizá tu fecha de Halloween.",
      },
      cta: {
        label: "Cotizá por WhatsApp",
        message: "Hola MAgic! Quiero cotizar una experiencia de Halloween para mi empresa.",
      },
    },
  },
  {
    slug: "navidad",
    name: "Navidad",
    show: true,
    live: false,
    motif: "snowflake",
    teaser: "El cierre de año de tu equipo, hecho a mano.",
    // A snowy night: deep pine, the name in the warm gold of the string lights (light enough to
    // stay readable when a snowflake passes behind it), red for the ribbon and the gift box.
    palette: {
      ground: "#1f3a2f",
      ink: "#faf7f1",
      accent: "#f3c969",
      soft: "#d2635d",
      dark: true,
      panel: { ground: "#b4473f", ink: "#faf7f1", muted: "rgb(250 247 241 / 0.94)" },
    },
    page: {
      description:
        "Navidad con MAgic!: experiencias creativas para el cierre de año de tu equipo. Charm bar, copas pintadas a mano, velas, totes y neceseres personalizados. Cotizá tu fecha.",
      title: [{ text: "Navidad", accent: true }],
      lead: "Cerrá el año con tu equipo. Llevamos todo a tu empresa y cada persona se lleva un regalo hecho por ella.",
      cover: { photo: "navidad", shot: "Mesa armada de Navidad: cuentas, dijes y bolsita MAgic!" },
      scene: "snow",
      experiencesHeading: "Cuatro experiencias para elegir",
      experiences: [
        {
          title: "Charm bar navideña",
          text: "Cuentas, hilos y charms de estrellas, árboles y moños para armar tu pulsera o tu llavero.",
          photo: "navidad-charms",
          shot: "Manos armando una pulsera con charms de estrella y árbol",
        },
        {
          title: "Copas para el brindis",
          text: "Pintamos copas a mano con acrílicos rojo, verde y dorado. Listas para el brindis de fin de año.",
          photo: "navidad-copas",
          shot: "Una copa pintada a mano con ramas y estrellas",
        },
        {
          title: "Velas con tu toque",
          text: "Velas artesanales con moño rojo y un dije, para regalar o regalarte.",
          photo: "navidad-velas",
          shot: "Vela artesanal con moño rojo y un dije dorado",
        },
        {
          title: "Tu tote o neceser, a tu manera",
          text: "Telas crudas, planchita portátil y parches de estrellas y moños. Cada uno se lleva el suyo.",
          photo: "navidad-totes",
          shot: "Neceser y tote de tela cruda con parches navideños",
        },
      ],
      closing: {
        phrase: "Llevá esta magia a tu empresa.",
        note: "Escribinos y cotizá tu fecha de fin de año.",
      },
      cta: {
        label: "Cotizá por WhatsApp",
        message: "Hola MAgic! Quiero cotizar una experiencia de Navidad para mi empresa.",
      },
    },
  },
];

/** The dates on show, in the order above. */
export const SHOWN_EVENTS = EVENTS.filter((event) => event.show);

/** Whether a date has a published page to link to. */
export const hasPage = (event: SeasonalEvent) => event.live && Boolean(event.page);

/** The colours of a date's closing panel, as CSS custom properties. */
export function panelStyle({ panel }: EventPalette): string {
  return [
    `--ground:${panel.ground}`,
    `--ink:${panel.ink}`,
    `--on-ink:${panel.ground}`,
    `--ink-muted:${panel.muted}`,
  ].join(";");
}

/** A date's colours as CSS custom properties, for its door and its page. */
export function paletteStyle({ ground, ink, accent, soft, dark }: EventPalette): string {
  const muted = dark ? "rgb(250 247 241 / 0.8)" : "rgb(76 64 57 / 0.8)";
  const hairline = dark ? "rgb(250 247 241 / 0.18)" : "rgb(76 64 57 / 0.14)";
  return [
    `--ground:${ground}`,
    `--ink:${ink}`,
    `--on-ink:${ground}`,
    `--ink-muted:${muted}`,
    `--hairline:${hairline}`,
    `--event:${accent}`,
    `--event-soft:${soft}`,
  ].join(";");
}
