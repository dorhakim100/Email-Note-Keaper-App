import { utilService } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'
import { storageService } from '../../../services/storage.service.js'
const { useState, useEffect } = React

const NOTE_KEY = 'noteDB'

export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const [newNoteText, setNewNoteText] = useState('')

    useEffect(() => {
        const initNotes = storageService.loadFromStorage(NOTE_KEY) || []
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
            style: { backgroundColor: '#00d' },
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
                };
            }
            return note
        })
        setNotes(updatedNotes)
        storageService.saveToStorage(NOTE_KEY, updatedNotes)
    }

    return <section>
        <h2>Notes</h2>
        <input
            type="text"
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            placeholder="Enter Note Text"
        />
        <button onClick={addNote}>Add Note</button>
        <ul className='noteList'>
            {notes.map(note => <li key={note.id}>
                <span>{note.info.txt}</span>
                <button onClick={() => {
                    const newText = prompt('Enter new text for the note:', note.info.txt)
                    if (newText !== null) {
                        editNote(note.id, newText)
                    }
                }}>Edit</button>
                <button onClick={() => onRemoveNote(note.id)}>X</button>
            </li>)}
        </ul>
    </section>
}
