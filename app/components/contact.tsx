import Image from "next/image";

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

      <div className="relative flex flex-1 flex-col justify-between gap-12">
        <h2 className="max-w-2xl text-4xl font-medium leading-tight text-black sm:text-5xl lg:text-6xl 2xl:text-7xl">
          Generasi emas dimulai dari kamu.
        </h2>

        <div className="flex flex-col items-start gap-5">
          <p className="max-w-md text-lg leading-relaxed text-black/60 2xl:text-xl">
            Hasilkan dulu. Tumbuhkan setelahnya. Mulai dari yang kamu punya
            menuju Indonesia yang emas.
          </p>
          <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2 text-lg text-white outline-1 -outline-offset-1 outline-white transition-opacity hover:opacity-80 2xl:text-xl"
            >
              Gabung sekarang
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center rounded-full px-5 py-2 text-lg text-black outline-1 -outline-offset-1 outline-black transition-colors hover:bg-black hover:text-white 2xl:text-xl"
            >
              Pelajari ekosistem
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
