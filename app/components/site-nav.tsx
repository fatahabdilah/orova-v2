"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between px-6 transition-colors duration-300 sm:px-8 md:h-20 md:px-12 lg:h-24 lg:px-16 xl:px-20 ${
        scrolled
          ? "border-b border-white/10 bg-black/40 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Link
        href="/"
        aria-label="Orova Group"
        className="text-base text-white sm:text-xl lg:text-2xl"
      >
        <span className="font-medium">OROVA</span>
        <span className="font-normal"> GROUP</span>
      </Link>
      <div className="flex items-center gap-6 text-sm font-medium text-white sm:gap-7 lg:text-lg">
        <a href="#about" className="transition-opacity hover:opacity-70">
          About Us
        </a>
        <a href="#portfolio" className="transition-opacity hover:opacity-70">
          Holding
        </a>
      </div>
    </nav>
  );
}
