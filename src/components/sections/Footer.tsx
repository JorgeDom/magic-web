import type { ReactNode } from "react";
import { COPY } from "@/content/copy";
import { LOGO } from "@/generated/logo";
import { SITE, todo, whatsappUrl } from "@/lib/site";

const LINK = "inline-flex min-h-11 items-center underline underline-offset-4 hover:decoration-2";

function Column({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div className="border-t border-hairline pt-5">
      <h3 className="font-sans text-label text-ink-muted">{heading}</h3>
      <div className="mt-2 text-body">{children}</div>
    </div>
  );
}

export function Footer() {
  return (
    <footer data-ground="chocolate" className="bg-ground text-ink">
      <div className="shell pt-(--section) pb-10">
        {LOGO.mono && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={LOGO.mono.src}
            alt={SITE.name}
            width={LOGO.mono.width}
            height={LOGO.mono.height}
            loading="lazy"
            decoding="async"
            className="h-auto w-[min(60vw,17rem)]"
          />
        )}
        <div className="mt-14 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          <Column heading={COPY.footer.write}>
            <a
              href={whatsappUrl(COPY.final.message)}
              target="_blank"
              rel="noopener noreferrer"
              className={LINK}
            >
              WhatsApp {SITE.whatsapp.display}
            </a>
          </Column>
          <Column heading={COPY.footer.follow}>
            <a href={SITE.instagram.url} target="_blank" rel="noopener noreferrer" className={LINK}>
              Instagram @{SITE.instagram.handle}
            </a>
          </Column>
          <Column heading={COPY.footer.where}>
            <p className="flex min-h-11 flex-col justify-center">
              <span>
                {SITE.location.city}, {SITE.location.country}
              </span>
              <span className="text-ink-muted">{SITE.location.address ?? todo("Dirección")}</span>
            </p>
          </Column>
          <Column heading={COPY.footer.hours}>
            <p className="flex min-h-11 items-center">
              {SITE.hours ?? todo("Horarios de atención")}
            </p>
          </Column>
        </div>
        <p className="mt-16 text-label font-normal text-ink-muted">
          © {new Date().getFullYear()} {SITE.name}. {COPY.footer.rights}
        </p>
      </div>
    </footer>
  );
}
