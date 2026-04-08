import { CalendarHeader } from './components/calendar/CalendarHeader'
import { DateGrid } from './components/calendar/DateGrid'
import { HeroPanel } from './components/calendar/HeroPanel'
import { NoteModal } from './components/calendar/NoteModal'
import { NotesPanel } from './components/calendar/NotesPanel'
import { Toolbar } from './components/calendar/Toolbar'
import { TopBar } from './components/calendar/TopBar'
import { BinderRings } from './components/calendar/BinderRings'
import { AnimatedGradientCanvas } from './components/shared/AnimatedGradientCanvas'
import { Button } from './components/shared/Button'
import { HERO_ART } from './data/heroArt'
import { useCalendarState } from './hooks/useCalendarState'
import { useLocalStorage } from './hooks/useLocalStorage'
import { formatRangeLabel } from './utils/calendar'

function getCoverArt(monthDate, image) {
  const defaultArt = HERO_ART[monthDate.getMonth()]

  if (!image) {
    return defaultArt
  }

  return {
    url: image,
    eyebrow: 'Custom Artwork',
    caption: 'Your uploaded image fits automatically into the calendar layout.',
  }
}

function getThemeStyle(hue) {
  return {
    '--calendar-hue': hue,
    '--accent': `hsl(${hue} 76% 53%)`,
    '--accent-soft': `hsl(${hue} 88% 95%)`,
    '--accent-deep': `hsl(${hue} 56% 24%)`,
  }
}

function App() {
  const [isDarkMode, setIsDarkMode] = useLocalStorage('wall-calendar-dark-mode', false)
  const {
    animKey,
    changeMonth,
    clearForm,
    clearImage,
    clearRange,
    closeNote,
    currentMonth,
    deleteNote,
    direction,
    editNote,
    editNoteId,
    image,
    isEditMode,
    isTurning,
    linkToRange,
    monthNotes,
    monthText,
    noteText,
    noteTitle,
    openNote,
    openNoteById,
    range,
    saveNote,
    selectDay,
    setHue,
    setLinkToRange,
    setNoteText,
    setNoteTitle,
    themeHue,
    today,
    toggleEdit,
    uploadImage,
  } = useCalendarState()

  const coverArt = getCoverArt(currentMonth, image)
  const rangeText = formatRangeLabel(range.start, range.end)
  const sheetClass =
    direction > 0
      ? 'paper-sheet relative overflow-hidden animate-tilt-in-right'
      : 'paper-sheet relative overflow-hidden animate-tilt-in-left'

  function toggleTheme() {
    setIsDarkMode((oldValue) => {
      const nextValue = !oldValue

      if (nextValue) {
        setHue(24)
      }

      return nextValue
    })
  }

  return (
    <div
      className={isDarkMode ? 'app-shell theme-dark' : 'app-shell'}
      style={getThemeStyle(themeHue)}
    >
      <AnimatedGradientCanvas hue={themeHue} />
      <div className="ambient-orb ambient-orb--left" />
      <div className="ambient-orb ambient-orb--right" />

      <main className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <TopBar
          isDarkMode={isDarkMode}
          isEditMode={isEditMode}
          onToggleDarkMode={toggleTheme}
          onToggleEdit={toggleEdit}
        />

        <Toolbar
          backgroundHue={themeHue}
          hasCustomImage={Boolean(image)}
          isDarkMode={isDarkMode}
          isEditMode={isEditMode}
          onHueChange={setHue}
          onImageUpload={uploadImage}
          onResetImage={clearImage}
        />

        <section className="paper-card relative px-4 pb-4 pt-8 sm:px-5 sm:pb-5">
          <BinderRings />

          <div className="grid gap-4 lg:grid-cols-[minmax(320px,0.96fr)_minmax(420px,1.14fr)]">
            <HeroPanel art={coverArt} currentMonth={currentMonth} rangeLabel={rangeText} />

            <div key={`${monthText}-${animKey}`} className={sheetClass}>
              {isTurning ? (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70 backdrop-blur-[2px] print:hidden">
                  <div className="flex items-center gap-3 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                    <span className="loader-dot" />
                    Turning page...
                  </div>
                </div>
              ) : null}

              <CalendarHeader
                currentMonth={currentMonth}
                onNext={() => changeMonth(1)}
                onPrevious={() => changeMonth(-1)}
              />

              <DateGrid
                currentMonth={currentMonth}
                isEditMode={isEditMode}
                onDateClick={selectDay}
                selectedRange={range}
                todayKey={today}
                visibleNotes={monthNotes}
              />

              <div className="range-box mt-4 flex flex-col gap-3 rounded-[1.25rem] p-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                    Selected stretch
                  </p>
                  <strong className="mt-2 block text-base leading-6 text-slate-900">
                    {rangeText}
                  </strong>
                </div>

                <Button
                  className="print:hidden"
                  disabled={!isEditMode || !range.start}
                  onClick={clearRange}
                >
                  Clear Range
                </Button>
              </div>

              <NotesPanel
                attachSelection={linkToRange}
                draftDetails={noteText}
                draftHeadline={noteTitle}
                editingNoteId={editNoteId}
                isEditMode={isEditMode}
                onAttachSelectionChange={setLinkToRange}
                onDraftDetailsChange={setNoteText}
                onDraftHeadlineChange={setNoteTitle}
                onNoteOpen={openNoteById}
                onReset={clearForm}
                onSave={saveNote}
                selectedRange={range}
                visibleNotes={monthNotes}
              />
            </div>
          </div>
        </section>
      </main>

      <NoteModal
        isEditMode={isEditMode}
        note={openNote}
        onClose={closeNote}
        onDelete={deleteNote}
        onEdit={editNote}
      />
    </div>
  )
}

export default App
