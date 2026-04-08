import { Button } from '../shared/Button'

export function Toolbar({
  backgroundHue,
  hasCustomImage,
  isDarkMode,
  isEditMode,
  onHueChange,
  onImageUpload,
  onResetImage,
}) {
  return (
    <section className="mb-4 grid gap-4 print:hidden md:grid-cols-2">
      <div className="glass-toolbar flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">Background hue</p>
          <p className="text-xs text-slate-500">
            {isDarkMode
              ? 'Hue controls work only in light mode.'
              : 'The background shifts with this slider.'}
          </p>
        </div>

        {isDarkMode ? (
          <div className="slider-box slider-box--off sm:w-[20rem]">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Light mode only
            </span>
          </div>
        ) : (
          <div className="slider-box sm:w-[20rem]">
            <input
              type="range"
              min="0"
              max="360"
              value={backgroundHue}
              onChange={(event) => onHueChange(Number(event.target.value))}
              disabled={!isEditMode}
              aria-label="Background hue"
              className="slider-box__input"
            />
            <span
              className="h-5 w-5 shrink-0 rounded-full border border-white/70 shadow-sm"
              style={{ backgroundColor: 'var(--accent)' }}
            />
          </div>
        )}
      </div>

      <div className="glass-toolbar flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">Artwork controls</p>
          <p className="text-xs text-slate-500">Every month can use its own uploaded image.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <label
            className={`control-chip control-chip--motion control-chip--ghost ${
              !isEditMode ? 'cursor-not-allowed opacity-40' : ''
            }`}
          >
            <span className="relative z-[1]">Change Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              disabled={!isEditMode}
              className="hidden"
            />
          </label>

          <Button disabled={!isEditMode || !hasCustomImage} onClick={onResetImage}>
            Use Art
          </Button>
        </div>
      </div>
    </section>
  )
}
