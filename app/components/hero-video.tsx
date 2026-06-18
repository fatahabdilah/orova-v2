"use client";

import { useEffect, useRef } from "react";

/** Keeps a muted background video playing through stalls / tab switches. */
function useResilientAutoplay(ref: React.RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    // Some browsers only autoplay when muted is set imperatively.
    video.muted = true;

    const tryPlay = () => {
      const p = video.play();
      if (p) p.catch(() => {});
    };
    const onPause = () => {
      if (!video.ended) tryPlay();
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") tryPlay();
    };

    tryPlay();
    video.addEventListener("canplay", tryPlay);
    video.addEventListener("stalled", tryPlay);
    video.addEventListener("waiting", tryPlay);
    video.addEventListener("pause", onPause);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("stalled", tryPlay);
      video.removeEventListener("waiting", tryPlay);
      video.removeEventListener("pause", onPause);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [ref]);
}

const videoProps = {
  autoPlay: true,
  muted: true,
  loop: true,
  playsInline: true,
  preload: "auto" as const,
  "aria-hidden": true,
};

export function HeroVideo({ className }: { className?: string }) {
  const mobileRef = useRef<HTMLVideoElement>(null);
  const desktopRef = useRef<HTMLVideoElement>(null);

  useResilientAutoplay(mobileRef);
  useResilientAutoplay(desktopRef);

  return (
    <>
      {/* Portrait video on mobile */}
      <video
        ref={mobileRef}
        className={`${className ?? ""} object-center sm:hidden`}
        poster="/hero-mobile.jpg"
        {...videoProps}
      >
        <source src="/hero-mobile.webm" type="video/webm" />
      </video>
      {/* Landscape video on larger screens */}
      <video
        ref={desktopRef}
        className={`${className ?? ""} hidden object-right sm:block`}
        poster="/hero.jpg"
        {...videoProps}
      >
        <source src="/hero-desktop.webm" type="video/webm" />
      </video>
    </>
  );
}
