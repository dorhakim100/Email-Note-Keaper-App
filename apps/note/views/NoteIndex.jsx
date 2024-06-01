const { useState, useEffect } = React
import { utilService } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'
import { storageService } from '../../../services/storage.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { VideoNote } from '../cmps/VideoNote.jsx'
import { ImageNote } from '../cmps/ImageNote.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { AudioNote } from '../cmps/AudioNote.jsx'

export function NoteIndex({ logo, setLogo }) {
  const [notes, setNotes] = useState([])
  const [filteredNotes, setFilteredNotes] = useState([])
  const [newNoteText, setNewNoteText] = useState('')
  const [newTodo, setNewTodo] = useState('')
  const [newNoteType, setNewNoteType] = useState('NoteTxt')

  useEffect(() => {
    logo = {
      name: 'Note',
      src: 'Icons-SVG/note.svg',
    }
    setLogo(logo)
    const initNotes =
      storageService.loadFromStorage(noteService.NOTE_KEY) ||
      noteService.notes()
    setNotes(initNotes)
    setFilteredNotes(initNotes)
  }, [])

  function handleNoteTypeChange(event) {
    setNewNoteType(event.target.value)
  }

  function onRemoveNote(noteId) {
    noteService
      .remove(noteId)
      .then(() => {
        const updatedNotes = notes.filter((note) => note.id !== noteId)
        setNotes(updatedNotes)
        setFilteredNotes(updatedNotes)
      })
      .catch((error) => console.error('Error removing note:', error))
  }

  function addNote() {
    if (!newNoteText.trim()) return
    const note = {
      type: 'NoteTxt',
      style: { backgroundColor: '#b0c4de' },
      info: { txt: newNoteText },
    }
    noteService
      .save(note)
      .then((savedNote) => {
        const updatedNotes = [...notes, savedNote]
        setNotes(updatedNotes)
        setFilteredNotes(updatedNotes)
        setNewNoteText('')
      })
      .catch((error) => console.error('Error adding note:', error))
  }

  function onEditNote(noteId, newText) {
    const noteToEdit = notes.find((note) => note.id === noteId)
    const updatedNote = {
      ...noteToEdit,
      info: { ...noteToEdit.info, txt: newText },
    }
    noteService
      .save(updatedNote)
      .then(() => {
        const updatedNotes = notes.map((note) =>
          note.id === noteId ? updatedNote : note
        )
        setNotes(updatedNotes)
        setFilteredNotes(updatedNotes)
      })
      .catch((error) => console.error('Error editing note:', error))
  }

  function onChangeNoteColor(noteId, newColor) {
    const noteToEdit = notes.find((note) => note.id === noteId)
    const updatedNote = {
      ...noteToEdit,
      style: { ...noteToEdit.style, backgroundColor: newColor },
    }
    noteService
      .save(updatedNote)
      .then(() => {
        const updatedNotes = notes.map((note) =>
          note.id === noteId ? updatedNote : note
        )
        setNotes(updatedNotes)
        setFilteredNotes(updatedNotes)
      })
      .catch((error) => console.error('Error changing note color:', error))
  }

  function onDuplicateNote(noteId) {
    const noteToDuplicate = notes.find((note) => note.id === noteId)

    const duplicatedNote = {
      id: utilService.makeId(),
      type: noteToDuplicate.type,
      style: { ...noteToDuplicate.style },
      info: { ...noteToDuplicate.info },
    }

    const updatedNotes = [...notes, duplicatedNote]
    setNotes(updatedNotes)
    setFilteredNotes(updatedNotes)
    storageService.saveToStorage(noteService.NOTE_KEY, updatedNotes)
  }

  function addTodo() {
    if (!newTodo.trim()) return
    const todo = {
      type: 'ToDo',
      style: { backgroundColor: '#b0c4de' },
      info: { tasks: [{ text: newTodo, done: false }] },
    }
    noteService
      .save(todo)
      .then((savedTodo) => {
        const updatedNotes = [...notes, savedTodo]
        setNotes(updatedNotes)
        setFilteredNotes(updatedNotes)
        setNewTodo('')
      })
      .catch((error) => console.error('Error adding todo:', error))
  }

  function onTodoAddTask(noteId, newTask) {
    const noteToEdit = notes.find((note) => note.id === noteId)
    const updatedNote = {
      ...noteToEdit,
      info: {
        ...noteToEdit.info,
        tasks: [...noteToEdit.info.tasks, { text: newTask, done: false }],
      },
    }
    noteService
      .save(updatedNote)
      .then(() => {
        const updatedNotes = notes.map((note) =>
          note.id === noteId ? updatedNote : note
        )
        setNotes(updatedNotes)
        setFilteredNotes(updatedNotes)
      })
      .catch((error) => console.error('Error adding task:', error))
  }

  function onToggleTask(noteId, taskIndex) {
    const noteToEdit = notes.find((note) => note.id === noteId)
    const updatedTasks = noteToEdit.info.tasks.map((task, idx) =>
      idx === taskIndex ? { ...task, done: !task.done } : task
    )
    const updatedNote = {
      ...noteToEdit,
      info: { ...noteToEdit.info, tasks: updatedTasks },
    }
    noteService
      .save(updatedNote)
      .then(() => {
        const updatedNotes = notes.map((note) =>
          note.id === noteId ? updatedNote : note
        )
        setNotes(updatedNotes)
        setFilteredNotes(updatedNotes)
      })
      .catch((error) => console.error('Error toggling task:', error))
  }

  function onRemoveTask(noteId, taskIndex) {
    const noteToEdit = notes.find((note) => note.id === noteId)
    const updatedTasks = noteToEdit.info.tasks.filter(
      (_, idx) => idx !== taskIndex
    )
    const updatedNote = {
      ...noteToEdit,
      info: { ...noteToEdit.info, tasks: updatedTasks },
    }
    noteService
      .save(updatedNote)
      .then(() => {
        const updatedNotes = notes.map((note) =>
          note.id === noteId ? updatedNote : note
        )
        setNotes(updatedNotes)
        setFilteredNotes(updatedNotes)
      })
      .catch((error) => console.error('Error removing task:', error))
  }

  function onFilter(filterBy) {
    const { name = '', type = '' } = filterBy
    noteService
      .query()
      .then((notes) => {
        const filtered = notes.filter((note) => {
          const textMatch =
            !name ||
            (note.info && note.info.txt && note.info.txt.includes(name))
          const typeMatch = !type || note.type === type
          return textMatch && typeMatch
        })
        setFilteredNotes(filtered)
      })
      .catch((error) => console.error('Error filtering notes:', error))
  }

  return (
    <section className='notes-main-page'>
      <h2>
        <i class='fa-regular fa-note-sticky'></i> Notes Dashboard{' '}
        <i class='fa-regular fa-note-sticky'></i>
      </h2>
      <NoteFilter className='filter-notes' onFilter={onFilter} />

      <div className='note-type-selector'>
        <label htmlFor='noteType'>
          Select Note Type to Add <i class='fa-solid fa-list'></i>
        </label>
        <select
          id='noteType'
          value={newNoteType}
          onChange={handleNoteTypeChange}
        >
          <option value='NoteTxt'>Text Note</option>
          <option value='ToDo'>Todo List</option>
          <option value='ImageNote'>Image Note</option>
          <option value='VideoNote'>Video Note</option>
          <option value='AudioNote'>Audio Note</option>
        </select>
      </div>

      {newNoteType === 'NoteTxt' && (
        <div className='new-note'>
          <input
            type='text'
            value={newNoteText}
            onChange={(event) => setNewNoteText(event.target.value)}
            placeholder='Enter Note Text:'
          />
          <button onClick={addNote}>
            Add Note <i className='fa-solid fa-plus'></i>
          </button>
        </div>
      )}

      {newNoteType === 'ToDo' && (
        <div className='new-todo'>
          <input
            type='text'
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
            placeholder='Enter Todo:'
          />
          <button onClick={addTodo}>
            Add Todo List <i className='fa-solid fa-list'></i>{' '}
          </button>
        </div>
      )}

      {newNoteType === 'ImageNote' && (
        <ImageNote
          notes={filteredNotes}
          setNotes={setNotes}
          setFilteredNotes={setFilteredNotes}
        />
      )}

      {newNoteType === 'VideoNote' && (
        <VideoNote
          notes={filteredNotes}
          setNotes={setNotes}
          setFilteredNotes={setFilteredNotes}
        />
      )}

      {newNoteType === 'AudioNote' && (
        <AudioNote
          notes={filteredNotes}
          setNotes={setNotes}
          setFilteredNotes={setFilteredNotes}
        />
      )}

      <NoteList
        notes={filteredNotes}
        onRemoveNote={onRemoveNote}
        onEditNote={onEditNote}
        onChangeNoteColor={onChangeNoteColor}
        onDuplicateNote={onDuplicateNote}
        onTodoAddTask={onTodoAddTask}
        onToggleTask={onToggleTask}
        onRemoveTask={onRemoveTask}
      />
    </section>
  )
}
