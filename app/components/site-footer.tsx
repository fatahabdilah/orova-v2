function Wordmark({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span className="font-medium">OROVA</span>
      <span className="font-normal"> GROUP</span>
    </span>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-black/20 bg-white px-6 py-12 sm:px-8 md:px-12 md:py-16 lg:px-16 lg:py-20 xl:px-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <Wordmark className="text-2xl text-black lg:text-3xl" />
        <p className="text-sm text-black/40 sm:text-right lg:text-xl">
          © 2026 Orova Group. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
