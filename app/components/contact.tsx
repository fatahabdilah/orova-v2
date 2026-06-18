import Image from "next/image";
import { Reveal } from "./motion/reveal";

export function Contact() {
  return (
    <section className="relative flex min-h-174.25 flex-col overflow-hidden bg-white px-6 py-20 sm:px-8 md:px-12 lg:px-16 lg:py-28 xl:px-20 xl:py-32">
      {/* Decorative halftone bleeding in from the right edge */}
      <Image
        src="/contact-bg.jpg"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="pointer-events-none absolute inset-0 object-cover object-right opacity-80"
      />

      <Reveal className="relative flex flex-1 flex-col justify-between gap-12">
        <h2 className="max-w-2xl text-4xl font-medium leading-tight text-black sm:text-5xl lg:text-6xl 2xl:text-7xl">
          Generasi emas dimulai dari kamu.
        </h2>

        <div className="flex flex-col items-start gap-5">
          <p className="max-w-md text-lg leading-relaxed text-black/60 2xl:text-xl">
            Hasilkan dulu. Tumbuhkan setelahnya. Mulai dari yang kamu punya
            menuju Indonesia yang emas.
          </p>
          <a
            href="mailto:official@orovagroup.id"
            className="inline-flex w-fit items-center justify-center rounded-full px-5 py-2 text-lg text-black outline-1 -outline-offset-1 outline-black transition-colors hover:bg-black hover:text-white 2xl:text-xl"
          >
            official@orovagroup.id
          </a>
        </div>
      </Reveal>
    </section>
  );
}
