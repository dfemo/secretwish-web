/** Decorative fanned cards: a wishlist, the surprise itself and the secret verification code. */
export function HeroCards() {
  return (
    <div className="relative mx-auto mt-16 h-[300px] max-w-3xl md:h-[360px]" aria-hidden>
      {/* floating tiles */}
      <span className="absolute -top-6 left-2 grid size-14 -rotate-12 place-items-center rounded-2xl bg-white text-2xl shadow-[0_10px_30px_rgb(43_23_54/0.12)] md:-left-10">💐</span>
      <span className="absolute top-24 -right-2 grid size-14 rotate-12 place-items-center rounded-2xl bg-white text-2xl shadow-[0_10px_30px_rgb(43_23_54/0.12)] md:-right-12">🎂</span>
      <span className="absolute bottom-6 -left-4 hidden size-16 rotate-6 place-items-center rounded-2xl bg-gold-500 text-2xl shadow-[0_10px_30px_rgb(43_23_54/0.18)] md:grid">🎁</span>

      {/* left: wishlist card */}
      <div className="absolute top-8 left-[4%] h-[260px] w-[42%] -rotate-3 rounded-[22px] bg-gradient-to-b from-plum-200 to-plum-300 p-5 shadow-[0_20px_50px_rgb(43_23_54/0.15)] md:h-[320px] md:w-[38%]">
        <div className="h-3 w-24 rounded-full bg-white/70" />
        <div className="mt-3 h-3 w-40 rounded-full bg-white/50" />
        <ul className="mt-6 space-y-3">
          {["👛", "🧺", "📿"].map((e, i) => (
            <li key={e} className="flex items-center gap-3 rounded-xl bg-white/60 p-2">
              <span className="grid size-8 place-items-center rounded-lg bg-white text-lg">{e}</span>
              <span className="h-2 flex-1 rounded-full bg-plum-300" style={{ maxWidth: `${80 - i * 15}%` }} />
              {i === 1 && <span className="rounded-full bg-success-600 px-2 py-0.5 text-[9px] font-bold text-white">GIFTED</span>}
            </li>
          ))}
        </ul>
        <span className="absolute top-1/2 -right-3 size-6 rounded-full bg-white" />
      </div>

      {/* right: secret code card */}
      <div className="absolute top-8 right-[4%] h-[260px] w-[42%] rotate-3 rounded-[22px] bg-gradient-to-b from-plum-200 to-plum-300 p-5 shadow-[0_20px_50px_rgb(43_23_54/0.15)] md:h-[320px] md:w-[38%]">
        <div className="ml-auto h-3 w-24 rounded-full bg-white/70" />
        <div className="mt-3 ml-auto h-3 w-36 rounded-full bg-white/50" />
        <div className="absolute right-5 bottom-5 rounded-xl bg-white p-2.5 shadow">
          <div className="grid grid-cols-7 gap-[3px]">
            {Array.from({ length: 49 }).map((_, i) => (
              <span key={i} className={`size-[5px] rounded-[1px] ${[0, 1, 2, 7, 9, 14, 15, 16, 4, 5, 6, 11, 13, 18, 19, 20, 28, 29, 30, 35, 37, 42, 43, 44, 24, 26, 32, 39, 46, 22].includes(i) ? "bg-ink-900" : "bg-transparent"}`} />
            ))}
          </div>
        </div>
        <span className="absolute bottom-6 left-5 rounded-lg bg-white/80 px-2 py-1 font-mono text-[11px] font-bold tracking-widest text-plum-800">K7QF-29XM</span>
        <span className="absolute top-1/2 -left-3 size-6 rounded-full bg-white" />
      </div>

      {/* centre: the surprise */}
      <div className="absolute top-0 left-1/2 h-[300px] w-[44%] -translate-x-1/2 overflow-hidden rounded-[22px] bg-plum-700 p-5 text-white shadow-[0_30px_60px_rgb(43_23_54/0.35)] md:h-[360px] md:w-[36%]">
        <svg className="absolute inset-0 h-full w-full opacity-25" viewBox="0 0 200 300" preserveAspectRatio="none">
          <path d="M0 0 L100 60 L0 120 Z M200 0 L100 60 L200 120 Z M0 120 L100 180 L0 240 Z M200 120 L100 180 L200 240 Z M100 60 L200 120 L100 180 L0 120 Z" fill="#9c7ab0" />
        </svg>
        <p className="relative text-right text-lg font-semibold text-white/80">SecretWish</p>
        <div className="relative mt-10 grid place-items-center text-center md:mt-16">
          <span className="grid size-16 place-items-center rounded-2xl bg-white/15 text-4xl backdrop-blur">🎁</span>
          <p className="mt-4 text-sm font-semibold">A surprise is on its way</p>
          <p className="mt-1 text-[11px] text-plum-200">Details hidden until it arrives</p>
        </div>
      </div>
    </div>
  );
}
