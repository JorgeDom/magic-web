"use client";

import { useState, type FormEvent } from "react";
import { COPY } from "@/content/copy";
import { FORM_ENDPOINT } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

const FIELD =
  "mt-2 w-full rounded-md border border-ink-muted bg-transparent px-4 py-3 text-body text-ink " +
  "placeholder:text-ink-muted focus-visible:border-ink";

/**
 * Optional contact form, shown only when NEXT_PUBLIC_ENABLE_CONTACT_FORM is "true" and a form
 * service endpoint is configured. There is no backend: it posts JSON to that third-party
 * endpoint. WhatsApp remains the primary way to book.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!response.ok) throw new Error(`Form service responded ${response.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={submit} className="mx-auto mt-16 w-full max-w-measure text-left">
      <h3 className="text-title">{COPY.form.heading}</h3>
      <label className="mt-6 block text-label">
        {COPY.form.name}
        <input name="name" type="text" autoComplete="name" required className={FIELD} />
      </label>
      <label className="mt-5 block text-label">
        {COPY.form.contact}
        <input
          name="contact"
          type="text"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          required
          className={FIELD}
        />
      </label>
      <label className="mt-5 block text-label">
        {COPY.form.message}
        <textarea name="message" rows={4} required className={FIELD} />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-7 inline-flex min-h-[52px] items-center justify-center rounded-pill bg-ink px-7 font-sans text-body leading-none font-medium text-on-ink transition-transform duration-(--duration-micro) active:scale-[0.97] disabled:opacity-60"
      >
        {status === "sending" ? COPY.form.sending : COPY.form.submit}
      </button>
      <p role="status" aria-live="polite" className="mt-4 min-h-6 text-label">
        {status === "sent" && COPY.form.sent}
        {status === "error" && COPY.form.error}
      </p>
    </form>
  );
}
