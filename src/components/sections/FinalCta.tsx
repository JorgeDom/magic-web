import { Star } from "@/components/star/Star";
import { ButtonLink, WhatsAppLink } from "@/components/ui/ButtonLink";
import { ClaimLines } from "@/components/ui/ClaimLines";
import { InstagramIcon } from "@/components/ui/Icons";
import { CLAIMS, COPY } from "@/content/copy";
import { FLAGS, SITE } from "@/lib/site";
import { ContactForm } from "./ContactForm";

/**
 * The close. The only place on the page that uses Fraunces: one phrase, once. Centred, like
 * the intro, so the page ends the way it began to breathe.
 */
export function FinalCta() {
  return (
    <section
      id="reservar"
      aria-labelledby="reservar-titulo"
      className="bg-ground text-ink deferred"
    >
      <div className="shell flex min-h-[86svh] flex-col items-center justify-center py-(--section) text-center">
        <Star className="h-9 lg:h-12" />
        <h2
          id="reservar-titulo"
          lang="en"
          translate="no"
          className="mt-8 font-closing text-closing italic lg:mt-10"
        >
          <ClaimLines claim={CLAIMS.closing} />
        </h2>
        <p className="mt-6 max-w-[28rem] text-lead text-ink-muted">{COPY.final.line}</p>
        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <WhatsAppLink message={COPY.final.message}>{COPY.final.cta}</WhatsAppLink>
          <ButtonLink href={SITE.instagram.url} variant="quiet">
            <InstagramIcon />
            {COPY.final.instagram}
          </ButtonLink>
        </div>
        {FLAGS.contactForm && <ContactForm />}
      </div>
    </section>
  );
}
