import { formatRangeLabel } from '../../utils/calendar'
import { Button } from '../shared/Button'

export function NotesPanel({
  attachSelection,
  draftDetails,
  draftHeadline,
  editingNoteId,
  isEditMode,
  onAttachSelectionChange,
  onDraftDetailsChange,
  onDraftHeadlineChange,
  onNoteOpen,
  onReset,
  onSave,
  selectedRange,
  visibleNotes,
}) {
  const rangeText = formatRangeLabel(selectedRange.start, selectedRange.end)
  const hasNotes = visibleNotes.length > 0

  return (
    <section className="notes-box mt-4">
      <div className="notes-head">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
          Monthly Notes
        </p>
        <span className="notes-count">{visibleNotes.length} saved</span>
      </div>

      {isEditMode ? (
        <form onSubmit={onSave} className="notes-editor mt-5 w-full">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <strong className="block text-base text-slate-900">
                {editingNoteId ? 'Update note' : 'Create a note'}
              </strong>
              <span className="text-sm text-slate-500">
                Keep the title short for the list and write the full message in the detail box.
              </span>
            </div>

            <div className="notes-badge">Edit mode live</div>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <label className="field-box">
              <span className="field-label">Headline</span>
              <input
                type="text"
                placeholder="Project review, family dinner, weekend trip..."
                value={draftHeadline}
                onChange={(event) => onDraftHeadlineChange(event.target.value)}
                maxLength={80}
              />
            </label>

            <label className="field-box">
              <span className="field-label">Detailed message</span>
              <textarea
                placeholder="Write the full message here. It opens in the centered popup."
                value={draftDetails}
                onChange={(event) => onDraftDetailsChange(event.target.value)}
                rows={4}
              />
            </label>
          </div>

          <label className="link-box mt-4">
            <input
              type="checkbox"
              checked={attachSelection}
              onChange={(event) => onAttachSelectionChange(event.target.checked)}
              disabled={!selectedRange.start}
              className="mt-0.5 accent-[var(--accent)]"
            />
            <span>
              {selectedRange.start
                ? `Attach this note to the current selection. ${rangeText}`
                : 'Pick a day or a date range first if you want this note linked to the calendar.'}
            </span>
          </label>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button type="submit" variant="solid" className="w-full sm:w-auto">
              {editingNoteId ? 'Update Note' : 'Save Note'}
            </Button>
            <Button onClick={onReset} className="w-full sm:w-auto">
              Clear Form
            </Button>
          </div>
        </form>
      ) : null}

      <div className="note-list mt-5">
        {hasNotes ? (
          visibleNotes.map((note) => (
            <button
              key={note.id}
              type="button"
              className="note-card"
              onClick={() => onNoteOpen(note.id)}
            >
              <span className="note-card__line" />
              <span className="note-card__title">{note.headline}</span>
              <span className="note-card__hint">Open details</span>
            </button>
          ))
        ) : (
          <div className="notes-empty">
            <strong className="block text-slate-900">No notes added for this month yet.</strong>
            {isEditMode
              ? 'Use the editor above to create the first note.'
              : 'Turn on edit mode whenever you want to add a note.'}
          </div>
        )}
      </div>
    </section>
  )
}
