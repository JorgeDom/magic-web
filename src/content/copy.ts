// All visible copy outside the worlds. Brand claims are English; everything functional is
// Spanish (es-PY, voseo). One language per sentence, one claim per section.
import { todo } from "@/lib/site";

export const CLAIMS = {
  hero: "MAKE SOME MAGIC.",
  intro: "Little details. Big magic.",
  closing: "Made by you. Made to remember.",
  descriptor: "Creative Studio",
} as const;

export const COPY = {
  skipLink: "Saltar al contenido",
  nav: {
    book: "Reservá",
    home: "MAgic! Creative Studio, inicio",
  },
  hero: {
    line: "Un estudio creativo para hacer con tus manos: charms, llaveros, piezas pintadas y accesorios a tu manera.",
    cta: "Reservá por WhatsApp",
    message: "Hola MAgic! Quiero reservar una experiencia.",
    sound: "Sonido",
  },
  intro: {
    line: "Elegís las piezas, las armás con tus manos y te llevás algo que no tiene nadie más.",
  },
  worlds: {
    label: "Mundos",
    heading: "Cuatro mundos",
  },
  how: {
    heading: "Cómo funciona",
    steps: [
      {
        title: "Elegí",
        text: "Tu mundo y tu formato. Lo definimos juntos por WhatsApp.",
      },
      {
        title: "Hacé",
        text: "Armás tu pieza a tu ritmo, con todo listo sobre la mesa.",
      },
      {
        title: "Recordá",
        text: "Te la llevás puesta. Hecha por vos.",
      },
    ],
  },
  making: {
    heading: "Así se hace",
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
    required: "Completá este campo.",
  },
  footer: {
    write: "Escribinos",
    follow: "Seguinos",
    where: "Dónde estamos",
    hours: "Horarios",
    rights: "Todos los derechos reservados.",
  },
  film: {
    play: "Reproducir video",
    pause: "Pausar video",
  },
  notFound: {
    title: "No encontramos esa página.",
    text: "Puede que el enlace esté roto o que la página ya no exista.",
    cta: "Volver al inicio",
  },
} as const;
