"use client";

import {
  animate,
  useInView,
  useReducedMotion,
  type AnimationPlaybackControls,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Counts a numeric value up from 0 when it scrolls into view.
 *
 * Accepts a formatted string like "74.9 JT", "16%", or "46.3%": the leading
 * number animates, while any prefix/suffix (units, %, " JT") is preserved and
 * the original decimal precision is kept.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  const match = value.match(/^(\D*)([\d.,]+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const numberText = match?.[2] ?? value;
  const suffix = match?.[3] ?? "";

  const target = parseFloat(numberText.replace(/,/g, ""));
  const decimals = numberText.includes(".")
    ? numberText.split(".")[1].length
    : 0;

  const [display, setDisplay] = useState(reduce ? numberText : "0");

  useEffect(() => {
    if (!inView || reduce || Number.isNaN(target)) {
      if (reduce || Number.isNaN(target)) setDisplay(numberText);
      return;
    }

    const controls: AnimationPlaybackControls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(latest.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, reduce, target, decimals, numberText]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
