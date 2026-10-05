import { WhatsAppLink } from "@/components/ui/ButtonLink";
import { CLAIMS, COPY } from "@/content/copy";
import { HeroStar } from "./HeroStar";
import { LogoSequence } from "./LogoSequence";

/**
 * Full-viewport opening: the logo sequence top left, the claim bottom left, and the giant gold
 * star cropped by the right edge. The claim is plain text in the first paint (it is the LCP
 * element), so it has no entrance animation; the logo sequence is the section's one moment.
 */
export function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-clip bg-ground text-ink">
      <HeroStar />
      <div className="shell flex min-h-svh flex-col justify-between gap-8 pt-[calc(var(--nav-height)+clamp(20px,3.5svh,48px))] pb-[clamp(28px,5svh,56px)]">
        <LogoSequence />
        <div>
          <h1 lang="en" translate="no" className="font-display text-claim uppercase">
            {CLAIMS.hero}
          </h1>
          <p className="mt-5 max-w-measure text-lead text-ink-muted lg:mt-7">{COPY.hero.line}</p>
          <WhatsAppLink message={COPY.hero.message} className="mt-7 lg:mt-9">
            {COPY.hero.cta}
          </WhatsAppLink>
        </div>
      </div>
    </section>
  );
}
