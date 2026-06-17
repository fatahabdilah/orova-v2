import Image from "next/image";

export function HoldingTws() {
  return (
    <section className="relative flex w-full items-center justify-start overflow-hidden bg-black px-6 py-20 sm:aspect-1441/875 sm:px-8 sm:py-0 md:pl-20 lg:pl-28 xl:pl-32">
      {/* Background — laptop sits on the right, left side stays dark */}
      <Image
        src="/holding-tws.jpg"
        alt="Trade With Suli — Edukasi Finansial"
        fill
        sizes="100vw"
        className="object-cover object-right"
      />
      {/* Left-side darkening so the copy stays legible */}
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-r from-black via-black/60 to-transparent"
      />

      <div className="relative flex w-full max-w-110.5 flex-col items-start gap-8 sm:gap-10">
        <div className="flex flex-col items-start gap-5">
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
          href="#"
          className="inline-flex items-center justify-center rounded-full bg-white px-4 py-1 text-lg text-black transition-opacity hover:opacity-80 2xl:text-xl"
        >
          Visit Our Website
        </a>
      </div>
    </section>
  );
}
