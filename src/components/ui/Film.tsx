"use client";

import { useEffect, useRef, useState } from "react";
import { COPY } from "@/content/copy";
import { useCanLoadFilm } from "@/hooks/useCapability";
import { filmSrc, getFilm, type MediaFilm } from "@/lib/media";
import { PauseIcon, PlayIcon } from "./Icons";
import { MediaFrame } from "./MediaFrame";

interface FilmProps {
  /** File name in brand/video (and brand/photos for the still fallback), without extension. */
  mediaKey: string;
  shot: string;
  sizes: string;
  aspect?: string;
  className?: string;
}

/**
 * A silent looping film in a media frame. Nothing but the poster is fetched until the frame is
 * near the viewport; it plays only while visible, never on data-saver connections or with
 * reduced motion, and always has a visible pause control. Until a clip exists in brand/video
 * it falls back to the still photograph (or its placeholder).
 */
export function Film({
  mediaKey,
  shot,
  sizes,
  aspect = "aspect-[4/5]",
  className = "",
}: FilmProps) {
  const film = getFilm(mediaKey);
  if (!film) {
    return (
      <MediaFrame
        mediaKey={mediaKey}
        shot={shot}
        sizes={sizes}
        aspect={aspect}
        className={className}
      />
    );
  }
  return <FilmPlayer film={film} shot={shot} aspect={aspect} className={className} />;
}

function FilmPlayer({
  film,
  shot,
  aspect,
  className,
}: {
  film: MediaFilm;
  shot: string;
  aspect: string;
  className: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const autoplay = useCanLoadFilm();
  const pausedByVisitor = useRef(false);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Attach the sources only when the frame is about to be seen.
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setLoaded(true);
        observer.disconnect();
      },
      { rootMargin: "60% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Play while on screen, pause when not.
  useEffect(() => {
    const element = video.current;
    if (!element || !loaded) return;
    element.load();
    if (!autoplay) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !pausedByVisitor.current) void element.play().catch(() => {});
        else element.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [loaded, autoplay]);

  const toggle = () => {
    const element = video.current;
    if (!element) return;
    if (element.paused) {
      pausedByVisitor.current = false;
      setLoaded(true);
      void element.play().catch(() => {});
    } else {
      pausedByVisitor.current = true;
      element.pause();
    }
  };

  return (
    <div
      className={`relative overflow-clip rounded-(--media-radius) bg-arena ${aspect} ${className}`}
    >
      <video
        ref={video}
        muted
        loop
        playsInline
        preload="none"
        poster={film.poster}
        width={film.width}
        height={film.height}
        aria-label={shot}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="size-full object-cover"
      >
        {loaded &&
          film.sources.map((source) => (
            <source key={source.type} src={filmSrc(source)} type={source.type} />
          ))}
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? COPY.film.pause : COPY.film.play}
        className="absolute right-4 bottom-4 grid size-11 place-items-center rounded-pill bg-cream text-chocolate transition-transform duration-(--duration-micro) active:scale-[0.94]"
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>
    </div>
  );
}
