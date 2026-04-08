import { GreatThings, Thursday } from 'moving-letters'
import { MONTH_NAMES } from '../../utils/calendar'

export function AnimatedMonthHeading({ currentMonth }) {
  const monthName = MONTH_NAMES[currentMonth.getMonth()]
  const year = `${currentMonth.getFullYear()}`

  return (
    <div className="min-w-0">
      <div className="hidden print:block">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
          {year}
        </p>
        <h2 className="mt-2 font-serif text-4xl leading-none text-slate-900">
          {monthName}
        </h2>
      </div>

      <div className="print:hidden">
        <div key={year} className="moving-year text-[0.45rem] sm:text-[0.52rem]">
          <Thursday text={year} />
        </div>
        <div
          key={monthName}
          className="moving-title mt-1 text-[0.56rem] sm:text-[0.7rem] lg:text-[0.8rem]"
        >
          <GreatThings text={monthName} />
        </div>
      </div>
    </div>
  )
}
