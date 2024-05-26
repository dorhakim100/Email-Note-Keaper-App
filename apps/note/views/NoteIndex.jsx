const { useState, useEffect } = React
import { utilService } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'
import { storageService } from '../../../services/storage.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { VideoNote } from '../cmps/VideoNote.jsx'

export function NoteIndex() {

    const [notes, setNotes] = useState([])
    const [newNoteText, setNewNoteText] = useState('')
    const [newTodo, setNewTodo] = useState('')
    const [newImage, setNewImage] = useState(null)


    useEffect(() => {
        const initNotes = storageService.loadFromStorage(noteService.NOTE_KEY) || noteService.notes()
        setNotes(initNotes)
    }, [])

    function onRemoveNote(noteId) {
        console.log(noteId)
        const updatedNotes = notes.filter(note => note.id !== noteId)
        setNotes(updatedNotes)
        storageService.saveToStorage(noteService.NOTE_KEY, updatedNotes)
        console.log('notes after removal:', updatedNotes)
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
        storageService.saveToStorage(noteService.NOTE_KEY, updatedNotes)
        console.log('add notes:', updatedNotes)
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
        storageService.saveToStorage(noteService.NOTE_KEY, updatedNotes)
        console.log('notes after edit:', updatedNotes)
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
        storageService.saveToStorage(noteService.NOTE_KEY, updatedNotes)
        // console.log('notes after color change:', updatedNotes)
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
        storageService.saveToStorage(noteService.NOTE_KEY, updatedNotes)

    }

    function addTodo() {
        if (!newTodo.trim()) return
        const todo = {
            id: utilService.makeId(),
            type: 'ToDo',
            style: { backgroundColor: '#b0c4de' },
            info: { tasks: [{ text: newTodo, done: false }] }
        }
        const updatedNotes = [...notes, todo]
        setNotes(updatedNotes)
        storageService.saveToStorage(noteService.NOTE_KEY, updatedNotes)
        console.log('add todos:', updatedNotes)
        setNewTodo('')
    }

    function onTodoAddTask(noteId, newTask) {
        const updatedNotes = notes.map(note => {
            if (note.id === noteId && note.type === 'ToDo') {
                return {
                    ...note,
                    info: {
                        ...note.info,
                        tasks: [
                            ...note.info.tasks,
                            { text: newTask, done: false }
                        ]
                    }
                }
            }
            return note
        })
        setNotes(updatedNotes)
        storageService.saveToStorage(noteService.NOTE_KEY, updatedNotes)
    }

    function onToggleTask(noteId, taskIndex) {
        const updatedNotes = notes.map(note => {
            if (note.id === noteId && note.type === 'ToDo') {
                const updatedTasks = note.info.tasks.map((task, idx) => {
                    if (idx === taskIndex) {
                        return { ...task, done: !task.done }
                    }
                    return task
                })
                return {
                    ...note,
                    info: {
                        ...note.info,
                        tasks: updatedTasks
                    }
                }
            }
            return note
        })
        setNotes(updatedNotes)
        storageService.saveToStorage(noteService.NOTE_KEY, updatedNotes)
    }

    function onRemoveTask(noteId, taskIndex) {
        const updatedNotes = notes.map(note => {
            if (note.id === noteId && note.type === 'ToDo') {
                const updatedTasks = note.info.tasks.filter((task, index) => index !== taskIndex)
                return {
                    ...note,
                    info: {
                        ...note.info,
                        tasks: updatedTasks
                    }
                }
            }
            return note
        })

        setNotes(updatedNotes)
        storageService.saveToStorage(noteService.NOTE_KEY, updatedNotes)
    }

    function onImageUpload(event) {
        const file = event.target.files[0]
        const reader = new FileReader()

        reader.onloadend = () => {
            setNewImage(reader.result)
        }

        if (file) {
            reader.readAsDataURL(file)
        }
    }

    function addImageNote() {
        if (!newImage) return

        const note = {
            id: utilService.makeId(),
            type: 'ImageNote',
            style: { backgroundColor: '#b0c4de' },
            info: { image: newImage }
        }

        const updatedNotes = [...notes, note]
        setNotes(updatedNotes)
        storageService.saveToStorage(noteService.NOTE_KEY, updatedNotes)
        setNewImage(null)
    }

    return <section className='notes-main-page'>
        <h2>Notes:</h2>
        <div className='new-note'>
            <input
                type="text"
                value={newNoteText}
                onChange={(event) => setNewNoteText(event.target.value)}
                placeholder="Enter Note Text:"
            />
            <button onClick={addNote}>Add Note <i className="fa-solid fa-plus"></i></button>
        </div>
        <div className='new-todo'>
            <input
                type="text"
                value={newTodo}
                onChange={(event) => setNewTodo(event.target.value)}
                placeholder="Enter Todo:"
            />
            <button onClick={addTodo}>Add Todo List <i className="fa-solid fa-list"></i> </button>
        </div>
        <div className='new-image'>
            <input
                type="file"
                accept="image/*"
                onChange={onImageUpload}
            />
            <button onClick={addImageNote}>Add Image Note <i className="fa-solid fa-image"></i></button>
        </div>
        <VideoNote notes={notes} setNotes={setNotes} />

        <NoteList
            notes={notes}
            onRemoveNote={onRemoveNote}
            onEditNote={onEditNote}
            onChangeNoteColor={onChangeNoteColor}
            onDuplicateNote={onDuplicateNote}
            onTodoAddTask={onTodoAddTask}
            onToggleTask={onToggleTask}
            onRemoveTask={onRemoveTask}
        />
    </section>
}
