import Image from "next/image";
import { Reveal } from "./motion/reveal";
import { CountUp } from "./motion/count-up";

const stats = [
  {
    image: "/stat-1.png",
    value: "74.9 JT",
    note: "Gen Z Indonesia, 27.94% populasi",
  },
  {
    image: "/stat-2.png",
    value: "16%",
    note: "Pengangguran muda, tertinggi di ASEAN (Nasional 4.85)",
  },
  {
    image: "/stat-3.png",
    value: "46.3%",
    note: "Generasi sandwich, nopang diri, orang tua, keluarga",
  },
  {
    image: "/stat-4.png",
    value: "40%",
    note: "Mengalami stres & burnout finansial",
  },
];

export function DemographicStats() {
  return (
    <section className="flex flex-col gap-12 overflow-hidden bg-black px-6 py-20 sm:px-8 md:px-12 lg:gap-20 lg:px-16 lg:py-28 xl:px-20 xl:py-32">
      <Reveal className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end lg:gap-12">
        <h2 className="max-w-xl text-2xl font-medium leading-tight text-white sm:text-4xl 2xl:text-5xl">
          Bonus demografi
          <br />
          bisa jadi beban demografi.
        </h2>
        <p className="max-w-sm text-base leading-relaxed text-white/50 sm:text-lg 2xl:text-xl">
          Generasi yang harus membawa Indonesia ke emas dibiarkan terjepit
          tanpa jalan
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal
            as="div"
            key={stat.image}
            delay={i * 0.1}
            className="relative flex aspect-3/4 flex-col justify-end overflow-hidden rounded-xl p-8 sm:aspect-auto sm:h-125 lg:h-143"
          >
            {/* Photo background, darkened for legibility */}
            <Image
              src={stat.image}
              alt=""
              aria-hidden
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover object-top"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent"
            />
            {/* Border on top of the photo so it isn't covered */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10 rounded-xl ring-1 ring-inset ring-[#1a1a1a]"
            />

            <div className="relative flex flex-col gap-5">
              <span className="text-5xl font-medium leading-none text-white 2xl:text-6xl">
                <CountUp value={stat.value} />
              </span>
              <p className="text-base leading-snug text-white/40 lg:min-h-[2lh]">
                {stat.note}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
