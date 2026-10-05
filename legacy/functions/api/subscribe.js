const NOTIFY_TO = "Makethingsmagic@gmail.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return new Response("Invalid email", { status: 400 });
  }

  if (!env.RESEND_API_KEY || !env.RESEND_FROM) {
    return new Response("Email service not configured", { status: 500 });
  }

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.RESEND_FROM,
      to: NOTIFY_TO,
      reply_to: email,
      subject: "MAgic! — nueva suscripción",
      text: `Nueva suscripción desde la landing de MAgic!\n\nEmail: ${email}`,
    }),
  });

  if (!resendRes.ok) {
    return new Response("Failed to send", { status: 502 });
  }

  return new Response(null, { status: 204 });
}
