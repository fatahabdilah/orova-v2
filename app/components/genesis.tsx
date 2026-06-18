import { Reveal } from "./motion/reveal";

export function Genesis() {
  return (
    <section
      id="about"
      className="flex flex-col gap-20 overflow-hidden bg-white px-6 pb-32 pt-20 sm:px-8 md:px-12 lg:gap-32 lg:px-16 lg:pb-48 lg:pt-32 xl:px-20"
    >
      <div className="h-px w-full bg-black" />

      <Reveal className="flex flex-col justify-between gap-8 lg:flex-row lg:gap-12">
        <h2 className="text-3xl font-normal leading-tight text-black sm:text-4xl 2xl:text-5xl">
          Orova Genesis
        </h2>
        <p className="max-w-xl text-lg leading-relaxed text-black 2xl:text-xl">
          <span className="font-normal">
            Nama kami berakar dari “oro” yang artinya emas, cahaya dan Genesis
            1:3 yang artinya “jadilah terang”. Menciptakan nilai dan kejelasan
            dari ketiadaan.{" "}
          </span>
          <span className="font-medium">
            Emas yang sama yang kami impikan untuk Indonesia di 2045.
          </span>
        </p>
      </Reveal>
    </section>
  );
}
