"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger entrance by this many seconds. */
  delay?: number;
  /** Tag to render — defaults to a div. */
  as?: "div" | "section" | "li";
};

/**
 * Subtle fade + slide-up as the element scrolls into view. Re-plays every time
 * the element re-enters the viewport (e.g. when scrolling back up), since
 * `once` is false.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
