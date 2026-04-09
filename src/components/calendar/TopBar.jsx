import { Button } from '../shared/Button'

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-2">
      <path d="M21 12.8A9 9 0 1 1 11.2 3 7.4 7.4 0 0 0 21 12.8Z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-2">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1" />
    </svg>
  )
}

export function TopBar({ isDarkMode, isEditMode, onToggleDarkMode, onToggleEdit }) {
  return (
    <section className="mb-5 flex flex-col gap-4 print:hidden lg:flex-row lg:items-start lg:justify-between">
      <div className="animate__animated animate__fadeInDown max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.38em] text-slate-600 sm:text-sm">
          Wall Planner Studio
        </p>
        <h1 className="mt-2 max-w-3xl font-serif text-3xl leading-[0.98] text-slate-900 sm:text-4xl lg:text-5xl">
          Monthly planner with motion, notes, and a wall-calendar feel
        </h1>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
        <button
          type="button"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          className="theme-toggle self-end sm:self-auto"
          onClick={onToggleDarkMode}
        >
          {isDarkMode ? <SunIcon /> : <MoonIcon />}
        </button>

        <Button
          variant={isEditMode ? 'solid' : 'ghost'}
          className="w-full sm:w-auto"
          onClick={onToggleEdit}
        >
          {isEditMode ? 'Editing On' : 'Enable Edit'}
        </Button>
      </div>
    </section>
  )
}
