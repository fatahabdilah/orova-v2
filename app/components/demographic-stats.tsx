const stats = [
  {
    label: "Dominasi Gen Z",
    value: "74.9 JT",
    note: "Gen Z Indonesia, 27.94% populasi",
  },
  {
    label: "Susah Kerja",
    value: "16%",
    note: "Pengangguran muda, tertinggi di ASEAN (Nasional 4.85)",
  },
  {
    label: "Generasi Sandwich",
    value: "46.3%",
    note: "Generasi sandwich, nopang diri, orang tua, keluarga",
  },
  {
    label: "Burnout Finansial",
    value: "40%",
    note: "Mengalami stres & burnout finansial",
  },
];

export function DemographicStats() {
  return (
    <section className="flex flex-col gap-20 overflow-hidden bg-white px-6 py-20 sm:px-8 md:px-12 lg:px-16 lg:py-28 xl:px-20 xl:py-32">
      <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end lg:gap-12">
        <h2 className="max-w-xl text-3xl font-normal leading-tight text-black sm:text-4xl 2xl:text-5xl">
          Bonus demografi
          <br />
          bisa jadi beban demografi.
        </h2>
        <p className="max-w-sm text-lg leading-relaxed text-black/50 2xl:text-xl">
          Generasi yang harus membawa Indonesia ke emas dibiarkan terjepit
          tanpa jalan
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col justify-between gap-8 border-l border-black px-6 py-6 sm:min-h-72 lg:px-10"
          >
            <h3 className="text-lg font-medium leading-tight text-black sm:text-xl sm:leading-9">
              {stat.label}
            </h3>
            <div className="flex flex-col gap-4 sm:gap-5">
              <span className="text-5xl font-medium leading-none text-black 2xl:text-7xl">
                {stat.value}
              </span>
              <p className="text-base leading-tight text-black/30 sm:max-w-56 sm:text-lg">
                {stat.note}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
