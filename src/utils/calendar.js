export const WEEK_DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export function toMonthStart(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function addMonths(date, amount) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1)
}

export function toDateKey(date) {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function fromDateKey(value) {
  if (!value) {
    return new Date()
  }

  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function getMonthKey(date) {
  return toDateKey(toMonthStart(date)).slice(0, 7)
}

export function compareDateKeys(left, right) {
  return left.localeCompare(right)
}

export function buildCalendarDays(monthDate) {
  const year = monthDate.getFullYear()
  const month = monthDate.getMonth()
  const firstWeekday = new Date(year, month, 1).getDay()
  const totalDays = new Date(year, month + 1, 0).getDate()
  const cells = []

  for (let index = 0; index < firstWeekday; index += 1) {
    cells.push(null)
  }

  for (let day = 1; day <= totalDays; day += 1) {
    cells.push(new Date(year, month, day))
  }

  while (cells.length % 7 !== 0) {
    cells.push(null)
  }

  return cells
}

export function isWithinRange(dayKey, start, end) {
  if (!start || !end) {
    return false
  }

  return compareDateKeys(dayKey, start) >= 0 && compareDateKeys(dayKey, end) <= 0
}

export function formatReadableDate(value) {
  return fromDateKey(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatRangeLabel(start, end) {
  if (!start) {
    return 'Pick a start and end date while edit mode is on.'
  }

  if (!end) {
    return `Start selected: ${formatReadableDate(start)}. Pick an end date to complete the range.`
  }

  if (start === end) {
    return `Single day selected: ${formatReadableDate(start)}.`
  }

  return `${formatReadableDate(start)} to ${formatReadableDate(end)}`
}

export function getRangeTag(range) {
  if (!range?.start) {
    return 'Month note'
  }

  if (range.start === range.end) {
    return `Attached to ${formatReadableDate(range.start)}`
  }

  return `Attached to ${formatReadableDate(range.start)} - ${formatReadableDate(range.end)}`
}

export function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function buildGradientSets(hue) {
  return [
    [`hsla(${hue}, 92%, 68%, 1)`, `hsla(${(hue + 42) % 360}, 88%, 66%, 1)`],
    [`hsla(${(hue + 18) % 360}, 90%, 70%, 1)`, `hsla(${(hue + 96) % 360}, 84%, 64%, 1)`],
    [`hsla(${(hue + 58) % 360}, 82%, 67%, 1)`, `hsla(${(hue + 134) % 360}, 78%, 62%, 1)`],
    [`hsla(${(hue + 10) % 360}, 85%, 72%, 1)`, `hsla(${(hue + 170) % 360}, 76%, 65%, 1)`],
  ]
}
