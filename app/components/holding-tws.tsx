import Image from "next/image";
import { Reveal } from "./motion/reveal";

export function HoldingTws() {
  return (
    <section className="relative flex h-dvh min-h-dvh w-full items-end justify-center overflow-hidden bg-black px-6 pb-24 sm:items-center sm:justify-start sm:px-8 sm:pb-0 md:pl-20 lg:pl-28 xl:pl-32">
      {/* Background — portrait on mobile (laptop on top), landscape on larger
          screens (laptop on the right). */}
      <Image
        src="/holding-tws-mobile.jpg"
        alt="Trade With Suli — Edukasi Finansial"
        fill
        sizes="100vw"
        className="object-cover object-top sm:hidden"
      />
      <Image
        src="/holding-tws.jpg"
        alt="Trade With Suli — Edukasi Finansial"
        fill
        sizes="100vw"
        className="hidden object-cover object-right sm:block"
      />
      {/* Darken for legibility — bottom-up on mobile (text sits below), left
          side on larger screens. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent sm:bg-linear-to-r sm:from-black sm:via-black/60 sm:to-transparent"
      />

      <Reveal className="relative flex w-full max-w-110.5 flex-col items-center gap-6 text-center sm:items-start sm:gap-10 sm:text-left">
        <div className="flex flex-col items-center gap-3 sm:items-start sm:gap-5">
          <Image
            src="/logos/tws.png"
            alt="Trade With Suli"
            width={125}
            height={47}
            className="h-7 w-auto sm:h-8 2xl:h-9"
          />
          <h2 className="text-3xl font-normal leading-tight text-white sm:text-4xl 2xl:text-5xl">
            Edukasi Finansial
          </h2>
          <p className="text-lg leading-relaxed text-white/50 2xl:text-xl">
            Platform edukasi dan komunitas seputar crypto dan investasi, lewat
            riset akurat, analisis pasar, dan pembelajaran trading dari nol.
          </p>
        </div>
        <a
          href="https://tradewithsuli.com/"
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
