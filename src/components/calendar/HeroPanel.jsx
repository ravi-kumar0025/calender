import { MONTH_NAMES } from '../../utils/calendar'

export function HeroPanel({ art, currentMonth, rangeLabel }) {
  return (
    <aside className="relative min-h-full overflow-hidden rounded-[1.8rem] bg-slate-950 text-white shadow-[0_28px_70px_rgba(15,23,42,0.22)]">
      <div className="absolute right-5 top-5 h-16 w-16 rounded-full border-t-4 border-r-4 border-white/90" />

      <div className="relative aspect-[4/5] min-h-[20rem] lg:min-h-[24rem]">
        <img
          src={art.url}
          alt={`${MONTH_NAMES[currentMonth.getMonth()]} cover artwork`}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 grid gap-4 bg-gradient-to-b from-transparent via-slate-950/65 to-slate-950/95 p-5">
        <div className="animate-focus-in">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/65">
            {art.eyebrow}
          </p>
          <h2 className="mt-2 font-serif text-5xl leading-none">
            {MONTH_NAMES[currentMonth.getMonth()]}
          </h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/78">{art.caption}</p>
        </div>

        <div className="rounded-[1.3rem] border border-white/15 bg-white/10 p-4 backdrop-blur-md">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white/55">
            Selected range
          </p>
          <strong className="mt-2 block text-base leading-6 text-white">{rangeLabel}</strong>
        </div>
      </div>
    </aside>
  )
}
