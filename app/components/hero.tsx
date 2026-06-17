import Image from "next/image";

export function Hero() {
  return (
    <section className="relative flex h-screen min-h-screen items-start overflow-hidden bg-neutral-950 px-6 pt-28 sm:items-center sm:px-8 sm:pt-0 md:px-12 lg:px-16 xl:px-20">
      {/* Background — portrait crop on mobile (Garuda centered), landscape on
          larger screens (Garuda on the right). */}
      <Image
        src="/hero-mobile.jpg"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="object-cover object-center sm:hidden"
      />
      <Image
        src="/hero.jpg"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="hidden object-cover object-right sm:block"
      />
      {/* Darken for legibility — top-down veil on mobile (text sits up top,
          Garuda stays visible below), left-to-right on larger screens. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-b from-black via-black/50 to-transparent sm:bg-linear-to-r sm:from-black sm:via-black/50 sm:to-transparent"
      />

      <div className="relative flex w-full max-w-2xl flex-col items-center gap-4 text-center sm:items-start sm:gap-5 sm:text-left">
        <h1 className="text-3xl leading-9 text-white sm:text-5xl sm:leading-[1.1] 2xl:text-6xl 2xl:leading-[1.15]">
          <span className="font-light">Kami percaya</span>
          <span className="font-normal"> Indonesia</span>
          <br className="hidden sm:block" />
          <span className="font-normal"> bisa emas di 2045.</span>
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-white/50 2xl:text-xl">
          Dan kami percaya itu bertumpu pada generasi yang hari ini paling
          terjepit. Bonus demografi terbesar dalam sejarah kita.
        </p>
      </div>
    </section>
  );
}
