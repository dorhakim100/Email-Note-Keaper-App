import { utilService } from '../../../services/util.service.js'
import { noteService, NOTE_KEY } from '../services/note.service.js'
import { storageService } from '../../../services/storage.service.js'
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

    function editNote(noteId, newText) {
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

    function changeNoteColor(noteId, newColor) {
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

    return <section>
        <h2>Notes</h2>
        <input
            type="text"
            value={newNoteText}
            onChange={(event) => setNewNoteText(event.target.value)}
            placeholder="Enter Note Text"
        />
        <button onClick={addNote}>Add Note</button>
        <ul className='noteList'>
            {notes.map(note => <li key={note.id} style={{ backgroundColor: note.style.backgroundColor }}>
                <span>{note.info.txt}</span>
                <button onClick={() => {
                    const newText = prompt('Enter new text for the note:', note.info.txt)
                    if (newText !== null) {
                        editNote(note.id, newText)
                    }
                }}>Edit</button>
                <input
                    type="color"
                    value={note.style.backgroundColor}
                    onChange={(event) => changeNoteColor(note.id, event.target.value)}
                />
                <button onClick={() => onRemoveNote(note.id)}>X</button>
            </li>)}
        </ul>
    </section>
}
