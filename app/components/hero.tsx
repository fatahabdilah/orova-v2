import { HeroVideo } from "./hero-video";
import { Rise } from "./motion/rise";

export function Hero() {
  return (
    <section className="relative flex h-svh min-h-svh items-start overflow-hidden bg-neutral-950 px-6 pt-40 sm:items-center sm:px-8 sm:pt-0 md:px-12 lg:px-16 xl:px-20">
      {/* Background video — portrait on mobile, landscape on larger screens.
          Poster stills fall back while each loads. */}
      <HeroVideo className="absolute inset-0 h-full w-full object-cover" />

      {/* Darken for legibility — top-down veil on mobile (text sits up top,
          Garuda stays visible below), left-to-right on larger screens. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-b from-black via-black/50 to-transparent sm:bg-linear-to-r sm:from-black sm:via-black/50 sm:to-transparent"
      />

      <div className="relative flex w-full max-w-2xl flex-col items-center gap-4 text-center sm:items-start sm:gap-5 sm:text-left">
        <Rise delay={0.15}>
          <h1 className="text-3xl leading-9 text-white sm:text-5xl sm:leading-[1.1] 2xl:text-6xl 2xl:leading-[1.15]">
            <span className="font-light">Kami percaya</span>
            <span className="font-normal"> Indonesia</span>
            <br />
            <span className="font-normal">bisa emas di 2045.</span>
          </h1>
        </Rise>
        <Rise delay={0.35}>
          <p className="max-w-xl text-sm leading-relaxed text-white/50 sm:text-lg 2xl:text-xl">
            Dan kami percaya itu bertumpu pada generasi yang hari ini paling
            terjepit. Bonus demografi terbesar dalam sejarah kita.
          </p>
        </Rise>
      </div>
    </section>
  );
}
