import Image from "next/image";

export function HoldingKonten() {
  return (
    <section
      id="portfolio"
      className="relative flex w-full items-center justify-end overflow-hidden bg-black px-6 py-20 sm:aspect-1441/875 sm:px-8 sm:py-0 md:pr-20 lg:pr-28 xl:pr-32"
    >
      {/* Background — laptop sits on the left, right side stays dark */}
      <Image
        src="/holding-konten.jpg"
        alt="Konten.com — Marketplace Clipper"
        fill
        sizes="100vw"
        className="object-cover object-left"
      />
      {/* Right-side darkening so the copy stays legible */}
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-l from-black via-black/60 to-transparent"
      />

      <div className="relative flex w-full max-w-110.5 flex-col items-start gap-8 sm:gap-10">
        <div className="flex flex-col items-start gap-5">
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
          href="#"
          className="inline-flex items-center justify-center rounded-full bg-white px-4 py-1 text-lg text-black transition-opacity hover:opacity-80 2xl:text-xl"
        >
          Visit Our Website
        </a>
      </div>
    </section>
  );
}
