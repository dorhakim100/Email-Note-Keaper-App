import { utilService } from '../../../services/util.service.js'
import { noteService, NOTE_KEY } from '../services/note.service.js'
import { storageService } from '../../../services/storage.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
const { useState, useEffect } = React

export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const [newNoteText, setNewNoteText] = useState('')

    useEffect(() => {
        // const initNotes = storageService.loadFromStorage(NOTE_KEY) || []
        const initNotes = noteService.notes() || []
        setNotes(initNotes)
    }, [])

    function onRemoveNote(noteId) {
        console.log(noteId)
        const updatedNotes = notes.filter(note => note.id !== noteId)
        setNotes(updatedNotes)
        storageService.saveToStorage(NOTE_KEY, updatedNotes)
    }

    function addNote() {
        if (!newNoteText.trim()) return
        const note = {
            id: utilService.makeId(),
            type: 'NoteTxt',
            style: { backgroundColor: '#b0c4de' },
            info: { txt: newNoteText }
        }
        const updatedNotes = [...notes, note]
        setNotes(updatedNotes)
        storageService.saveToStorage(NOTE_KEY, updatedNotes)
        setNewNoteText('')
    }

    function onEditNote(noteId, newText) {
        const updatedNotes = notes.map(note => {
            if (note.id === noteId) {
                return {
                    ...note,
                    info: {
                        ...note.info,
                        txt: newText
                    }
                }
            }
            return note//note to self:test with prompt and other method
        })
        setNotes(updatedNotes)
        storageService.saveToStorage(NOTE_KEY, updatedNotes)
    }

    function onChangeNoteColor(noteId, newColor) {
        const updatedNotes = notes.map(note => {
            if (note.id === noteId) {
                return {
                    ...note,
                    style: {
                        ...note.style,
                        backgroundColor: newColor
                    }
                }
            }
            return note//note to self:test with color wheel and other method
        })
        setNotes(updatedNotes)
        storageService.saveToStorage(NOTE_KEY, updatedNotes)
    }

    function onDuplicateNote(noteId) {
        const noteToDuplicate = notes.find(note => note.id === noteId)

        const duplicatedNote = {
            id: utilService.makeId(),
            type: noteToDuplicate.type,
            style: { ...noteToDuplicate.style },
            info: { ...noteToDuplicate.info }
        }

        const updatedNotes = [...notes, duplicatedNote]
        setNotes(updatedNotes)
        storageService.saveToStorage(NOTE_KEY, updatedNotes)

    }

    return <section className='notes-main-page'>
        <h2>Notes:</h2>
        <input
            type="text"
            value={newNoteText}
            onChange={(event) => setNewNoteText(event.target.value)}
            placeholder="Enter Note Text:"
        />
        <button onClick={addNote}>Add Note <i className="fa-solid fa-plus"></i></button>
        <NoteList
            notes={notes}
            onRemoveNote={onRemoveNote}
            onEditNote={onEditNote}
            onChangeNoteColor={onChangeNoteColor}
            onDuplicateNote={onDuplicateNote}
        />
    </section>
}
