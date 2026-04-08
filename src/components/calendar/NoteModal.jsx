import { useEffect } from 'react'
import { getRangeTag } from '../../utils/calendar'
import { Button } from '../shared/Button'

export function NoteModal({ isEditMode, note, onClose, onDelete, onEdit }) {
  useEffect(() => {
    if (!note) {
      return undefined
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [note, onClose])

  if (!note) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 px-4 backdrop-blur-md print:hidden"
      onClick={onClose}
    >
      <div
        className="note-modal-card animate__animated animate__zoomIn"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              Note details
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900">{note.headline}</h3>
          </div>

          <Button onClick={onClose}>Close</Button>
        </div>

        <p className="mt-4 text-sm text-slate-500">{getRangeTag(note.range)}</p>
        <p className="mt-4 whitespace-pre-wrap text-base leading-7 text-slate-700">{note.details}</p>

        {isEditMode ? (
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="solid" onClick={() => onEdit(note)}>
              Edit Note
            </Button>
            <Button variant="danger" onClick={() => onDelete(note.id)}>
              Delete Note
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
