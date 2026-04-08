import {
  WEEK_DAYS,
  buildCalendarDays,
  compareDateKeys,
  isWithinRange,
  toDateKey,
} from '../../utils/calendar'
import { cn } from '../../utils/cn'

export function DateGrid({
  currentMonth,
  isEditMode,
  onDateClick,
  selectedRange,
  todayKey,
  visibleNotes,
}) {
  const calendarDays = buildCalendarDays(currentMonth)

  return (
    <>
      <div className="mt-5 grid grid-cols-7 gap-2">
        {WEEK_DAYS.map((day) => (
          <span
            key={day}
            className="rounded-full py-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
          >
            {day}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} className="day-cell day-cell--empty" />
          }

          const dayKey = toDateKey(day)
          const isToday = dayKey === todayKey
          const isStart = selectedRange.start === dayKey
          const isEnd = selectedRange.end === dayKey
          const isSelected = isWithinRange(dayKey, selectedRange.start, selectedRange.end)
          const hasLinkedNote = visibleNotes.some(
            (note) =>
              note.range?.start &&
              compareDateKeys(dayKey, note.range.start) >= 0 &&
              compareDateKeys(dayKey, note.range.end ?? note.range.start) <= 0,
          )

          return (
            <button
              key={dayKey}
              type="button"
              onClick={() => onDateClick(day)}
              className={cn(
                'day-cell',
                isToday && 'day-cell--today',
                isSelected && 'day-cell--range',
                (isStart || isEnd) && 'day-cell--edge',
                !isEditMode && 'cursor-default',
              )}
            >
              <span>{day.getDate()}</span>
              {hasLinkedNote ? (
                <span className="absolute bottom-2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-current" />
              ) : null}
            </button>
          )
        })}
      </div>
    </>
  )
}
