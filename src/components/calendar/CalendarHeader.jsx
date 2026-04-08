import { AnimatedMonthHeading } from './AnimatedMonthHeading'
import { Button } from '../shared/Button'

export function CalendarHeader({ currentMonth, onNext, onPrevious }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <AnimatedMonthHeading currentMonth={currentMonth} />

      <div className="flex flex-wrap gap-3 print:hidden">
        <Button onClick={onPrevious}>Prev</Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  )
}
