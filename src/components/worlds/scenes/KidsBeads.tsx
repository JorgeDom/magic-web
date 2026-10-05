"use client";

import { m, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { MotionScope } from "@/components/providers/MotionScope";
import { useFinePointer, useReducedMotion } from "@/hooks/useMediaQuery";
import styles from "./KidsBeads.module.css";

// Kids is the one world that unlocks the full palette, and it does so through objects.
// Gold is absent on purpose: gold belongs to the star.
const BEADS = [
  { color: "bg-lavender", size: 17, top: -5, left: -6, depth: 22, period: 9, delay: 0 },
  { color: "bg-rosa", size: 10, top: 16, left: 99, depth: 38, period: 7.5, delay: -2 },
  { color: "bg-peach", size: 19, top: 93, left: 74, depth: 18, period: 11, delay: -4 },
  { color: "bg-sage", size: 13, top: 76, left: -4, depth: 30, period: 10, delay: -1 },
  { color: "bg-blue", size: 8, top: 55, left: 103, depth: 44, period: 8, delay: -5 },
  { color: "bg-blue", size: 12, top: -4, left: 66, depth: 26, period: 8.5, delay: -3 },
  { color: "bg-rosa", size: 7, top: 102, left: 22, depth: 40, period: 7, delay: -6 },
] as const;

const DRIFT = { stiffness: 38, damping: 14, mass: 1.2 };

type BeadSpec = (typeof BEADS)[number];

function Bead({
  bead,
  px,
  py,
}: {
  bead: BeadSpec;
  px: MotionValue<number>;
  py: MotionValue<number>;
}) {
  const x = useSpring(
    useTransform(px, (value) => value * bead.depth),
    DRIFT,
  );
  const y = useSpring(
    useTransform(py, (value) => value * bead.depth),
    DRIFT,
  );
  return (
    <m.span
      style={{ x, y, top: `${bead.top}%`, left: `${bead.left}%`, width: `${bead.size}%` }}
      whileTap={{ scale: 1.2 }}
      transition={{ type: "spring", stiffness: 260, damping: 11 }}
      className="pointer-events-auto absolute block aspect-square -translate-1/2"
    >
      <span
        className={styles.float}
        style={
          {
            "--float-duration": `${bead.period}s`,
            "--float-delay": `${bead.delay}s`,
          } as CSSProperties
        }
      >
        <span className={styles.shadow}>
          <span className={`${styles.bead} ${bead.color}`} />
        </span>
      </span>
    </m.span>
  );
}

/**
 * Kids signature: beads float around the photograph and drift toward the pointer. Touch one and
 * it bobs. With reduced motion they sit still.
 */
export default function KidsBeads() {
  const host = useRef<HTMLDivElement>(null);
  const finePointer = useFinePointer();
  const reduced = useReducedMotion();
  const [onScreen, setOnScreen] = useState(false);
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) =>
      setOnScreen(Boolean(entry?.isIntersecting)),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!finePointer || reduced || !onScreen) return;
    const onMove = (event: PointerEvent) => {
      const box = host.current?.getBoundingClientRect();
      if (!box) return;
      const clamp = (value: number) => Math.max(-1, Math.min(1, value));
      px.set(clamp((event.clientX - (box.left + box.width / 2)) / (window.innerWidth / 2)));
      py.set(clamp((event.clientY - (box.top + box.height / 2)) / (window.innerHeight / 2)));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [finePointer, reduced, onScreen, px, py]);

  return (
    <MotionScope>
      <div ref={host} className={`absolute inset-0 ${onScreen ? "" : styles.paused}`}>
        {BEADS.map((bead, index) => (
          <Bead key={index} bead={bead} px={px} py={py} />
        ))}
      </div>
    </MotionScope>
  );
}
