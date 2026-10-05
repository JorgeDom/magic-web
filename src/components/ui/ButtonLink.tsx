import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { whatsappUrl } from "@/lib/site";
import { WhatsAppIcon } from "./Icons";

type Variant = "primary" | "quiet";
type Size = "regular" | "compact";

const BASE =
  "inline-flex items-center justify-center gap-2.5 rounded-pill font-sans text-body leading-none font-medium " +
  "whitespace-nowrap select-none transition-[transform,background-color,color] duration-(--duration-micro) " +
  "ease-out active:scale-[0.97]";

// Ink and on-ink invert by themselves on chocolate sections, so there is no "on dark" variant.
const VARIANTS: Record<Variant, string> = {
  primary: "bg-ink text-on-ink hover:bg-ink/88",
  quiet: "border-[1.5px] border-ink text-ink hover:bg-ink hover:text-on-ink",
};

const SIZES: Record<Size, string> = {
  regular: "min-h-[52px] px-7",
  compact: "min-h-11 px-5",
};

interface ButtonLinkProps extends Omit<ComponentPropsWithoutRef<"a">, "className"> {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({
  variant = "primary",
  size = "regular",
  className = "",
  children,
  ...anchor
}: ButtonLinkProps) {
  const external = anchor.href?.startsWith("http");
  return (
    <a
      {...anchor}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    >
      {children}
    </a>
  );
}

interface WhatsAppLinkProps extends Omit<ButtonLinkProps, "href"> {
  /** Prefilled chat message. */
  message: string;
}

/** The booking action. Every "Reservá" on the page opens WhatsApp with a prefilled message. */
export function WhatsAppLink({ message, children, ...rest }: WhatsAppLinkProps) {
  return (
    <ButtonLink href={whatsappUrl(message)} {...rest}>
      <WhatsAppIcon />
      {children}
      <span className="sr-only"> (se abre WhatsApp)</span>
    </ButtonLink>
  );
}
