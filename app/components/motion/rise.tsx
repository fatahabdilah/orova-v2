"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RiseProps = {
  children: ReactNode;
  className?: string;
  /** Stagger entrance by this many seconds. */
  delay?: number;
};

/**
 * Fade + slide-up that plays once on mount — for content already in view on
 * first paint (e.g. the hero), where a scroll-triggered reveal never fires.
 */
export function Rise({ children, className, delay = 0 }: RiseProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
