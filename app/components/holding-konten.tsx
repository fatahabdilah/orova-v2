import Image from "next/image";
import { Reveal } from "./motion/reveal";

export function HoldingKonten() {
  return (
    <section
      id="portfolio"
      className="relative flex h-screen min-h-screen w-full items-end justify-center overflow-hidden bg-black px-6 pb-12 sm:items-center sm:justify-end sm:px-8 sm:pb-0 md:pr-20 lg:pr-28 xl:pr-32"
    >
      {/* Background — portrait on mobile (laptop on top), landscape on larger
          screens (laptop on the left). */}
      <Image
        src="/holding-konten-mobile.jpg"
        alt="Konten.com — Marketplace Clipper"
        fill
        sizes="100vw"
        className="object-cover object-top sm:hidden"
      />
      <Image
        src="/holding-konten.jpg"
        alt="Konten.com — Marketplace Clipper"
        fill
        sizes="100vw"
        className="hidden object-cover object-left sm:block"
      />
      {/* Darken for legibility — bottom-up on mobile (text sits below), right
          side on larger screens. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent sm:bg-linear-to-l sm:from-black sm:via-black/60 sm:to-transparent"
      />

      <Reveal className="relative flex w-full max-w-110.5 flex-col items-center gap-8 text-center sm:items-start sm:gap-10 sm:text-left">
        <div className="flex flex-col items-center gap-5 sm:items-start">
          <Image
            src="/logos/konten.png"
            alt="Konten.com"
            width={245}
            height={47}
            className="h-6 w-auto sm:h-7 2xl:h-8"
          />
          <h2 className="text-3xl font-normal leading-tight text-white sm:text-4xl 2xl:text-5xl">
            Marketplace Clipper
          </h2>
          <p className="text-lg leading-relaxed text-white/50 2xl:text-xl">
            Marketplace clipping berbasis performa di Indonesia yang
            menghubungkan brand dengan kreator konten di TikTok, Instagram, dan
            YouTube.
          </p>
        </div>
        <a
          href="https://konten.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-white px-4 py-1 text-lg text-black transition-opacity hover:opacity-80 2xl:text-xl"
        >
          Visit Our Website
        </a>
      </Reveal>
    </section>
  );
}
