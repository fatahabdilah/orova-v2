import Image from "next/image";
import { Reveal } from "./motion/reveal";

const cards = [
  {
    glow: "/card-glow-konten.png",
    logo: "/logos/konten-white.png",
    logoAlt: "Konten.com",
    logoClass: "h-7 w-auto 2xl:h-8",
    text: "Konten.com ambil komisi kecil saat clipper dapat kerja — kami cuma tumbuh kalau kamu tumbuh.",
  },
  {
    glow: "/card-glow-tws.png",
    logo: "/logos/tws-white.png",
    logoAlt: "Trade With Suli",
    logoClass: "h-8 w-auto 2xl:h-9",
    text: "TWS hidup dari edukasi & komunitas, bukan janji return. Kami jual ilmu, bukan mimpi.",
  },
];

export function ValueCards() {
  return (
    <section className="flex flex-col items-center gap-12 overflow-hidden border-t border-black/20 bg-black px-6 py-20 sm:px-8 md:px-12 lg:gap-20 lg:px-16 lg:py-32 xl:px-20">
      <Reveal as="div" className="w-full">
        <h2 className="mx-auto max-w-4xl text-center text-2xl font-normal leading-tight text-white sm:text-4xl 2xl:text-5xl">
          Kami untung saat kamu untung.
          <br />
          Orova bukan amal, bukan skema.
        </h2>
      </Reveal>

      <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
        {cards.map((card, i) => (
          <Reveal
            as="div"
            key={card.logoAlt}
            delay={i * 0.12}
            className="relative flex aspect-918/500 flex-col justify-start gap-5 overflow-hidden rounded-lg px-8 pb-12 pt-8 sm:justify-between sm:gap-12 sm:px-10 sm:pb-8"
          >
            {/* Glow texture fills the card */}
            <Image
              src={card.glow}
              alt=""
              aria-hidden
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />

            <Image
              src={card.logo}
              alt={card.logoAlt}
              width={245}
              height={47}
              className={`relative w-auto self-start ${card.logoClass}`}
            />
            <p className="relative max-w-md text-lg leading-relaxed text-white/60 2xl:text-xl">
              {card.text}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
