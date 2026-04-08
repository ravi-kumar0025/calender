import { useEffect, useRef, useState } from 'react'
import {
  addMonths,
  compareDateKeys,
  createId,
  fromDateKey,
  getMonthKey,
  toDateKey,
  toMonthStart,
} from '../utils/calendar'
import { useLocalStorage } from './useLocalStorage'

const STORAGE = {
  hue: 'wall-calendar-hue',
  images: 'wall-calendar-images',
  month: 'wall-calendar-month',
  notes: 'wall-calendar-notes',
  range: 'wall-calendar-range',
}

function emptyRange() {
  return { start: null, end: null }
}

export function useCalendarState() {
  const timerRef = useRef(null)
  const today = toDateKey(new Date())

  const [monthText, setMonthText] = useLocalStorage(
    STORAGE.month,
    toDateKey(toMonthStart(new Date())),
  )
  const [range, setRange] = useLocalStorage(STORAGE.range, emptyRange())
  const [notes, setNotes] = useLocalStorage(STORAGE.notes, [])
  const [hue, setHue] = useLocalStorage(STORAGE.hue, 24)
  const [images, setImages] = useLocalStorage(STORAGE.images, {})

  const [isEditMode, setIsEditMode] = useState(false)
  const [direction, setDirection] = useState(1)
  const [animKey, setAnimKey] = useState(0)
  const [isTurning, setIsTurning] = useState(false)
  const [noteTitle, setNoteTitle] = useState('')
  const [noteText, setNoteText] = useState('')
  const [linkToRange, setLinkToRange] = useState(true)
  const [editNoteId, setEditNoteId] = useState(null)
  const [openNoteId, setOpenNoteId] = useState(null)

  const monthDate = fromDateKey(monthText)
  const monthId = getMonthKey(monthDate)
  const image = images[monthId] ?? ''
  const monthNotes = notes.filter((note) => note.monthKey === monthId)
  const openNote = notes.find((note) => note.id === openNoteId) ?? null

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [])

  function clearForm() {
    setNoteTitle('')
    setNoteText('')
    setLinkToRange(true)
    setEditNoteId(null)
  }

  function startMonthAnimation(step) {
    setDirection(step > 0 ? 1 : -1)
    setAnimKey((value) => value + 1)
    setIsTurning(true)

    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
    }

    timerRef.current = window.setTimeout(() => {
      setIsTurning(false)
    }, 650)
  }

  function changeMonth(step) {
    startMonthAnimation(step)
    setMonthText(toDateKey(addMonths(monthDate, step)))
    clearForm()
    setOpenNoteId(null)
  }

  function selectDay(day) {
    if (!isEditMode || !day) {
      return
    }

    const dayText = toDateKey(day)

    setRange((oldRange) => {
      if (!oldRange.start || oldRange.end) {
        return { start: dayText, end: null }
      }

      if (compareDateKeys(dayText, oldRange.start) < 0) {
        return { start: dayText, end: oldRange.start }
      }

      return { start: oldRange.start, end: dayText }
    })
  }

  function clearRange() {
    setRange(emptyRange())
  }

  function saveNote(event) {
    event.preventDefault()

    if (!isEditMode) {
      return
    }

    const title = noteTitle.trim()
    const text = noteText.trim()

    if (!title || !text) {
      return
    }

    const noteRange =
      linkToRange && range.start
        ? {
            start: range.start,
            end: range.end ?? range.start,
          }
        : null

    const savedAt =
      notes.find((note) => note.id === editNoteId)?.createdAt ?? new Date().toISOString()

    const nextNote = {
      id: editNoteId ?? createId(),
      monthKey: monthId,
      headline: title,
      details: text,
      range: noteRange,
      createdAt: savedAt,
      updatedAt: new Date().toISOString(),
    }

    setNotes((oldNotes) => {
      if (editNoteId) {
        return oldNotes.map((note) => (note.id === editNoteId ? nextNote : note))
      }

      return [nextNote, ...oldNotes]
    })

    clearForm()
  }

  function editNote(note) {
    if (!isEditMode) {
      return
    }

    setEditNoteId(note.id)
    setNoteTitle(note.headline)
    setNoteText(note.details)
    setLinkToRange(Boolean(note.range))

    if (note.range?.start) {
      setRange({
        start: note.range.start,
        end: note.range.end ?? note.range.start,
      })
    }

    setOpenNoteId(null)
  }

  function deleteNote(noteId) {
    if (!isEditMode) {
      return
    }

    setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId))

    if (openNoteId === noteId) {
      setOpenNoteId(null)
    }

    if (editNoteId === noteId) {
      clearForm()
    }
  }

  function uploadImage(event) {
    if (!isEditMode) {
      return
    }

    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImages((oldImages) => ({
          ...oldImages,
          [monthId]: reader.result,
        }))
      }
    }

    reader.readAsDataURL(file)
    event.target.value = ''
  }

  function clearImage() {
    setImages((oldImages) => {
      const nextImages = { ...oldImages }
      delete nextImages[monthId]
      return nextImages
    })
  }

  function toggleEdit() {
    setIsEditMode((value) => !value)
    clearForm()
  }

  return {
    animKey,
    changeMonth,
    clearForm,
    clearImage,
    clearRange,
    closeNote: () => setOpenNoteId(null),
    currentMonth: monthDate,
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
    openNoteById: setOpenNoteId,
    range,
    saveNote,
    selectDay,
    setHue,
    setLinkToRange,
    setNoteText,
    setNoteTitle,
    themeHue: hue,
    today,
    toggleEdit,
    uploadImage,
  }
}
