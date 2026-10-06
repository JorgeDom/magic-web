const base = {
  viewBox: "0 0 24 24",
  width: 20,
  height: 20,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
} as const;

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d="M3.6 20.4l1.2-4.2a8.4 8.4 0 1 1 3.2 3.1l-4.4 1.1z" />
      <path
        d="M9.3 8.4c-.4 1.1.3 2.7 1.7 4.1s3 2.1 4.1 1.7l.7-1.5-1.8-1-.8.7c-.7-.3-1.6-1.2-1.9-1.9l.7-.8-1-1.8-1.7.5z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SoundIcon({ on, className }: { on: boolean; className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d="M4 9.5v5h3.5L12 18V6L7.5 9.5H4z" />
      {on ? (
        <path d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a7.8 7.8 0 0 1 0 11" />
      ) : (
        <path d="M16 9.5l5 5m0-5l-5 5" />
      )}
    </svg>
  );
}

export function PlayIcon({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d="M8 5.5v13l10.5-6.5L8 5.5z" fill="currentColor" />
    </svg>
  );
}

export function PauseIcon({ className }: { className?: string }) {
  return (
    <svg {...base} className={className}>
      <path d="M8.5 5.5v13M15.5 5.5v13" strokeWidth={2.6} />
    </svg>
  );
}
