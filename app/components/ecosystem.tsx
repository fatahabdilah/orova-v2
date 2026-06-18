import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "./motion/reveal";

/**
 * Rounded pill with a 1px gradient border. The gradient lives on a masked
 * overlay layer so only the 1px edge shows and it follows the rounded corners
 * (a plain border-image can't). `fade` picks which corner fades to transparent.
 */
function pillBorderStyle(fade: "bottom-left" | "top-right"): CSSProperties {
  // Direction points toward the FADED corner, so the solid end is opposite it.
  const direction = fade === "bottom-left" ? "to bottom left" : "to top right";
  return {
    background: `linear-gradient(${direction}, rgba(255,255,255,1), rgba(255,255,255,0.1))`,
    padding: 1,
    WebkitMask:
      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
    WebkitMaskComposite: "xor",
    mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
    maskComposite: "exclude",
  };
}

/**
 * A burst of blue rays fanning out to the right, emerging from a single point
 * on the left edge (where it meets the pill). Pure SVG with a soft blue glow.
 */
/** Total seconds for one orange→white→blue flow cycle across the whole row. */
const FLOW_CYCLE = 3.6;

function RayBurst({
  className,
  color = "#3b82f6",
  id = "ray",
  spread = [-150, -75, 0, 75, 150],
  /** When in the cycle this burst lights up: 0 = first (orange), 0.66 = last. */
  flowPhase = 0,
  /** Direction the light travels: "out" = away from pill, "in" = toward pill. */
  flowDir = "out",
  /** Stroke width of the streaming light. Thicker = a brighter, more visible
      flow (used on mobile, where the thin default reads as a blink). */
  flowWidth = 6,
}: {
  className?: string;
  color?: string;
  /** Unique key so the filter/gradient ids don't clash between instances. */
  id?: string;
  /** Vertical offset of each pipe's endpoint from center — wider = more flare. */
  spread?: number[];
  flowPhase?: number;
  flowDir?: "in" | "out";
  flowWidth?: number;
}) {
  // 5 pipes leaving the pill at the left-center and diverging. The viewBox is
  // sized to the widest endpoint so no pipe runs off the edge — every pipe then
  // fades out via the gradient at x=240, giving a clean, even row of tips
  // (rather than some fading and some getting clipped).
  const maxEnd = Math.max(...spread.map((d) => Math.abs(d) * 1.3));
  const cx = maxEnd + 20; // center y, with a little padding
  const vh = cx * 2; // viewBox height
  const glowId = `${id}-glow`;
  const fadeId = `${id}-fade`;
  return (
    <svg
      aria-hidden
      viewBox={`0 0 240 ${vh}`}
      fill="none"
      preserveAspectRatio="none"
      className={className}
    >
      <defs>
        {/* SVG-scoped keyframe so it can't be tree-shaken by the CSS pipeline.
            Drives the flowing light along each pipe. */}
        <style>{`
          @keyframes ray-flow-${id} {
            /* A single bright dash sweeps the whole pipe (pathLength=1) during
               the first ~30% of the cycle, then waits dark for its next turn.
               The dash + gap sum to 2 so only one dash is ever on the path. */
            0%   { stroke-dashoffset: ${flowDir === "out" ? 1 : -1}; opacity: 0; }
            2%   { opacity: 1; }
            28%  { opacity: 1; }
            30%  { stroke-dashoffset: ${flowDir === "out" ? -1 : 1}; opacity: 0; }
            100% { stroke-dashoffset: ${flowDir === "out" ? -1 : 1}; opacity: 0; }
          }
          .flow-${id} {
            stroke-dasharray: 0.28 2;
            animation: ray-flow-${id} ${FLOW_CYCLE}s linear infinite;
            animation-delay: ${flowPhase * FLOW_CYCLE}s;
          }
          @media (prefers-reduced-motion: reduce) {
            .flow-${id} { animation: none; opacity: 0; }
          }
        `}</style>
        {/* Fixed region (userSpaceOnUse) so a perfectly horizontal centre pipe
            — whose bounding box has zero height — still gets blurred instead of
            collapsing the filter region and vanishing. */}
        <filter
          id={glowId}
          filterUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="240"
          height={vh}
        >
          {/* Two-tier coloured bloom: a wide soft halo + a tighter glow, then
              the crisp pipe on top. */}
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="wide" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="tight" />
          <feFlood floodColor={color} floodOpacity="0.9" result="col" />
          <feComposite in="col" in2="wide" operator="in" result="haloWide" />
          <feComposite in="col" in2="tight" operator="in" result="haloTight" />
          <feMerge>
            <feMergeNode in="haloWide" />
            <feMergeNode in="haloTight" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* userSpaceOnUse — an objectBoundingBox gradient collapses on a
            zero-height path (the perfectly horizontal centre pipe), making it
            disappear. Fixed coords keep every pipe painted. */}
        <linearGradient
          id={fadeId}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1={cx}
          x2="240"
          y2={cx}
        >
          {/* Stay solid most of the way, then fade out quickly near the tip. */}
          <stop offset="0%" stopColor={color} stopOpacity="0.9" />
          <stop offset="70%" stopColor={color} stopOpacity="0.85" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        {/* Taper gradient: transparent at the pill, opaque toward the tip — used
            on a thicker stroke so the pipe appears to widen as it flares out. */}
        <linearGradient
          id={`${id}-taper`}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1={cx}
          x2="240"
          y2={cx}
        >
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="50%" stopColor={color} stopOpacity="0" />
          <stop offset="88%" stopColor={color} stopOpacity="0.85" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <g filter={`url(#${glowId})`} strokeLinecap="round">
        {spread.map((dy, i) => {
          // Start each pipe at a slightly different y at the pill (spread the
          // roots vertically), then sweep out as one smooth circular arc — no
          // sharp bend followed by a flat run.
          const startY = cx + dy * 0.07;
          const endY = cx + dy * 1.3;
          // Scale the arc radius with how far the pipe travels so the outer
          // pipes curve as gently as the inner ones (no sharp bend at the tip).
          const r = 360 + Math.abs(dy) * 1.6;
          const sweep = dy > 0 ? 1 : 0;
          const d =
            dy === 0
              ? `M0 ${startY} L 240 ${endY}`
              : `M0 ${startY} A ${r} ${r} 0 0 ${sweep} 240 ${endY}`;
          return (
            <g key={i}>
              {/* Base pipe */}
              <path
                d={d}
                stroke={`url(#${fadeId})`}
                strokeWidth="4"
                vectorEffect="non-scaling-stroke"
              />
              {/* Thicker overlay, only visible toward the tip → flares wider */}
              <path
                d={d}
                fill="none"
                stroke={`url(#${id}-taper)`}
                strokeWidth="9"
                vectorEffect="non-scaling-stroke"
              />
              {/* Light streaming along the pipe — lit only during this burst's
                  phase of the global cycle. Coloured to match the pipe.
                  pathLength=1 normalises dash maths across pipes/screens. */}
              <path
                d={d}
                fill="none"
                stroke={color}
                strokeWidth={flowWidth}
                pathLength={1}
                className={`flow-${id}`}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

function Pill({
  children,
  fade,
}: {
  children: ReactNode;
  fade: "bottom-left" | "top-right";
}) {
  return (
    <div className="relative z-10 flex w-full items-center justify-center gap-5 rounded-full bg-black/30 px-7 py-3.5 backdrop-blur-md sm:w-auto">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full"
        style={pillBorderStyle(fade)}
      />
      {children}
    </div>
  );
}

export function Ecosystem() {
  return (
    <section className="flex flex-col items-center gap-12 overflow-hidden bg-black px-6 py-24 sm:px-8 md:px-12 lg:gap-20 lg:px-16 lg:py-36 xl:px-20">
      {/* White pulse travelling the connector, in the middle third of the
          cycle (after orange reaches pill 1, before blue leaves pill 2). */}
      <style>{`
        @keyframes conn-flow-h {
          0%, 30%, 100% { background-position: -40% 0; opacity: 0; }
          33% { opacity: 1; }
          62% { opacity: 1; }
          65% { background-position: 140% 0; opacity: 0; }
        }
        @keyframes conn-flow-v {
          0%, 30%, 100% { background-position: 0 -40%; opacity: 0; }
          33% { opacity: 1; }
          62% { opacity: 1; }
          65% { background-position: 0 140%; opacity: 0; }
        }
        .conn-pulse-h {
          background: linear-gradient(to right, transparent, #fff, transparent);
          background-size: 40% 100%;
          background-repeat: no-repeat;
          animation: conn-flow-h ${FLOW_CYCLE}s linear infinite;
        }
        .conn-pulse-v {
          background: linear-gradient(to bottom, transparent, #fff, transparent);
          background-size: 100% 40%;
          background-repeat: no-repeat;
          animation: conn-flow-v ${FLOW_CYCLE}s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .conn-pulse-h, .conn-pulse-v { animation: none; opacity: 0; }
        }
      `}</style>

      <Reveal className="flex flex-col items-center gap-5 text-center">
        <h2 className="max-w-3xl text-2xl font-normal leading-tight text-white sm:text-4xl 2xl:text-5xl">
          Indonesia nggak bisa emas,
          <br />
          kalau generasinya nggak emas dulu.
        </h2>
        <p className="mb-16 max-w-2xl text-lg leading-relaxed text-white/50 lg:mb-24 lg:max-w-none lg:whitespace-nowrap 2xl:text-xl">
          Maka kami bangun jalannya. Orova bukan satu produk — satu ekosistem,
          dua langkah:
        </p>
      </Reveal>

      {/* Steps — horizontal row on desktop, vertical stack on mobile:
          orange rays up → pill 1 → white line → pill 2 → blue rays down. */}
      <div className="flex w-full max-w-6xl flex-col items-center justify-between gap-0 sm:flex-row">
        {/* Mobile-only: orange rays pointing UP, above pill 1 */}
        <div className="relative -mb-14 h-28 w-full sm:hidden">
          <span className="pointer-events-none absolute bottom-0 left-1/2 size-56 -translate-x-1/2 translate-y-1/4 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.18)_0%,rgba(249,115,22,0)_70%)] blur-2xl" />
          <RayBurst
            id="ray-konten-m"
            color="#f97316"
            spread={[-300, -150, 0, 150, 300]}
            flowPhase={0}
            flowDir="in"
            flowWidth={12}
            className="pointer-events-none absolute bottom-0 left-1/2 h-52 w-32 -translate-x-1/2 -rotate-90"
          />
        </div>

        {/* Step 1 — Hasilkan dulu (Konten.com) — border fades bottom-left */}
        <div className="relative">
          {/* Orange ambient bloom behind the rays (desktop) */}
          <span className="pointer-events-none absolute right-full top-1/2 -mr-24 hidden h-64 w-64 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.18)_0%,rgba(249,115,22,0)_70%)] blur-2xl sm:block" />
          {/* Orange rays fanning out to the LEFT (mirrored) from behind the pill */}
          <RayBurst
            id="ray-konten"
            color="#f97316"
            flowPhase={0}
            flowDir="in"
            className="pointer-events-none absolute right-full top-1/2 -mr-16 hidden h-80 w-40 -translate-y-1/2 -scale-x-100 sm:block lg:w-52"
          />
          <Pill fade="bottom-left">
            <span className="relative text-sm leading-8 text-white sm:text-lg">
              HASILKAN DULU
            </span>
            <Image
              src="/logos/konten-mark.png"
              alt="Konten.com"
              width={80}
              height={66}
              className="relative h-8 w-auto sm:h-11"
            />
          </Pill>
        </div>

        {/* Mobile-only: vertical white connector between the two pills */}
        <div aria-hidden className="relative -my-3 h-40 w-4 sm:hidden">
          <span className="absolute inset-0 bg-white" />
          <span className="absolute inset-y-0 -left-2/3 w-full rounded-[50%] bg-black" />
          <span className="absolute inset-y-0 -right-2/3 w-full rounded-[50%] bg-black" />
          <span className="pointer-events-none absolute -inset-x-0.5 inset-y-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.6)_0%,rgba(255,255,255,1)_50%,rgba(255,255,255,0.6)_100%)] blur-sm" />
          {/* White pulse flowing down between the pills */}
          <span className="conn-pulse-v pointer-events-none absolute -inset-y-4 inset-x-0 blur-md" />
        </div>

        {/* Connector (desktop) — a thick white bar pinched thin in the middle by
            two black ellipses (top + bottom). Extends under both pills. */}
        <div
          aria-hidden
          className="relative hidden h-6 flex-1 sm:-mx-8 sm:block"
        >
          {/* The bar itself */}
          <span className="absolute inset-0 bg-white" />
          {/* Black ellipses pinch the bar thin in the middle */}
          <span className="absolute inset-x-0 -top-2/3 h-full rounded-[50%] bg-black" />
          <span className="absolute inset-x-0 -bottom-2/3 h-full rounded-[50%] bg-black" />
          {/* Ambient bloom radiating from the whole bar — sits ABOVE the
              ellipses so it isn't clipped. Three stacked layers: a wide soft
              halo, a mid bloom, and a tight bright core hugging the bar — the
              core is what makes the line read as if it's glowing. */}
          <span className="pointer-events-none absolute -inset-y-8 inset-x-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,rgba(255,255,255,0.4)_50%,rgba(255,255,255,0)_100%)] blur-3xl" />
          <span className="pointer-events-none absolute -inset-y-4 inset-x-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,rgba(255,255,255,0.65)_50%,rgba(255,255,255,0)_100%)] blur-xl" />
          <span className="pointer-events-none absolute -inset-y-0.5 inset-x-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.6)_0%,rgba(255,255,255,1)_50%,rgba(255,255,255,0.6)_100%)] blur-sm" />
          {/* Extra-soft white glow at each end — two stacked radial layers for a
              very smooth bloom. */}
          <span className="pointer-events-none absolute -left-12 top-1/2 size-28 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0)_70%)] blur-3xl" />
          <span className="pointer-events-none absolute -left-8 top-1/2 size-20 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0)_70%)] blur-2xl" />
          <span className="pointer-events-none absolute -right-12 top-1/2 size-28 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0)_70%)] blur-3xl" />
          <span className="pointer-events-none absolute -right-8 top-1/2 size-20 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0)_70%)] blur-2xl" />
          {/* White pulse flowing left→right along the connector */}
          <span className="conn-pulse-h pointer-events-none absolute -inset-x-4 inset-y-0 blur-md" />
        </div>

        {/* Step 2 — Lalu kembangkan (Trade With Suli) — border fades top-right */}
        <div className="relative">
          {/* Blue ambient bloom behind the rays so the whole area glows */}
          <span className="pointer-events-none absolute left-full top-1/2 -ml-24 hidden h-64 w-64 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.18)_0%,rgba(59,130,246,0)_70%)] blur-2xl sm:block" />
          {/* Blue rays fanning out from behind the pill (desktop). Shifted left
              with -ml so the roots start under the pill and emerge from it. */}
          <RayBurst
            id="ray-tws"
            color="#3b82f6"
            flowPhase={0.66}
            flowDir="out"
            className="pointer-events-none absolute left-full top-1/2 -ml-16 hidden h-80 w-40 -translate-y-1/2 sm:block lg:w-52"
          />
          <Pill fade="top-right">
            <Image
              src="/logos/tws-mark.png"
              alt="Trade With Suli"
              width={67}
              height={67}
              className="relative size-8 sm:size-11"
            />
            <span className="relative text-sm leading-8 text-white sm:text-lg">
              LALU KEMBANGKAN
            </span>
          </Pill>
        </div>

        {/* Mobile-only: blue rays pointing DOWN, below pill 2 */}
        <div className="relative -mt-14 h-28 w-full sm:hidden">
          <span className="pointer-events-none absolute left-1/2 top-0 size-56 -translate-x-1/2 -translate-y-1/4 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.18)_0%,rgba(59,130,246,0)_70%)] blur-2xl" />
          <RayBurst
            id="ray-tws-m"
            color="#3b82f6"
            spread={[-300, -150, 0, 150, 300]}
            flowPhase={0.66}
            flowDir="out"
            flowWidth={12}
            className="pointer-events-none absolute left-1/2 top-0 h-52 w-32 -translate-x-1/2 rotate-90"
          />
        </div>
      </div>

      {/* Closing tagline pill, centered below the two steps */}
      <Reveal as="div" delay={0.3} className="mt-16 lg:mt-24">
        <span className="inline-flex items-center justify-center rounded-full px-5 py-2 text-center text-base text-white outline-1 -outline-offset-1 outline-white sm:text-xl 2xl:text-2xl">
          Dari cari duit ke kembangkan duit.
        </span>
      </Reveal>
    </section>
  );
}
