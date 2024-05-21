import { utilService } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'

const { useState, useEffect } = React

export function NoteIndex() {

    const [notes, setNotes] = useState([])

    useEffect(() => {
        const initNotes = noteService.notes()
        setNotes(initNotes)
    }, [])

    function onRemoveNote(noteId) {
        console.log(noteId)
        setNotes(prevNotes => prevNotes.filter(note => note.id != noteId))
    }

    function addNote() {
        const note = {
            id: utilService.makeId(),
            type: 'NoteTxt',
            style: { backgroundColor: '#00d' },
            info: { txt: 'Lorem ipsum dolor sit amet' }
        }
        setNotes(prevNotes => [...prevNotes, note])
    }

    return <section>
        <h2>Notes</h2>
        <button onClick={addNote}>Add Note</button>
        <ul className='noteList'>
            {notes.map(note => <li key={note.id}>
                <span>{note.info.txt}</span>
                <button onClick={() => onRemoveNote(note.id)}>X</button>
            </li>)}
        </ul>
    </section>
}
