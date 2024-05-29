import Swal from '../../../lib/swal.js'

export function NoteList({ notes, onRemoveNote, onEditNote, onChangeNoteColor, onDuplicateNote, onTodoAddTask, onToggleTask, onRemoveTask }) {

    function handleChangeNote(noteId, currentText) {
        Swal.fire({
            text: 'Enter new text for the note:',
            input: 'text',
            inputValue: currentText,
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then((result) => {
            if (result.isConfirmed && result.value !== currentText) {
                onEditNote(noteId, result.value)
            }
        })
    }

    function handleChangeTask(noteId) {
        Swal.fire({
            text: 'Enter a new task:',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Add Task',
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                onTodoAddTask(noteId, result.value)
            }
        })
    }

    function handleRemoveNote(noteId) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this note!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                onRemoveNote(noteId)
                Swal.fire(
                    'Deleted!',
                    'Your note has been deleted.',
                    'success'
                )
            }
        })
    }

    return (
        <section className='note-list-container'>
            <ul className='note-list'>
                {notes.map(note => (
                    <li key={note.id} style={{ backgroundColor: note.style.backgroundColor }}>
                        {note.type === 'NoteTxt' && (
                            <div className="note-txt">
                                <span>{note.info.txt}</span>
                                <button onClick={() => handleChangeNote(note.id, note.info.txt)}>
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                            </div>
                        )}
                        {note.type === 'ToDo' && (
                            <div>
                                <ul className="todo-list">
                                    {note.info.tasks.map((task, idx) => (
                                        <li key={idx} className={task.done ? 'done' : ''}>
                                            <span onClick={() => onToggleTask(note.id, idx)}>{task.text}</span>
                                            <div className="task-action">
                                                <button onClick={() => onRemoveTask(note.id, idx)}><i className="fa-solid fa-trash"></i></button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={() => handleChangeTask(note.id)}>
                                    <i className="fa-solid fa-list-check"></i>
                                </button>
                            </div>
                        )}
                        {note.type === 'ImageNote' && (
                            <div className="image-note">
                                <img src={note.info.image} alt="Note" style={{ maxWidth: '100%', maxHeight: '1fr', marginBottom: '10px' }} />
                            </div>
                        )}
                        {note.type === 'VideoNote' && (
                            <div className="video-note">
                                <iframe
                                    width="100%"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${note.info.videoId}`}
                                    allowFullScreen
                                    title="Video Player"
                                ></iframe>
                            </div>
                        )}
                        <div className="edit-buttons">
                            <button onClick={() => onDuplicateNote(note.id)}>
                                <i className="fa-solid fa-copy"></i>
                            </button>
                            <input
                                type="color"
                                value={note.style.backgroundColor}
                                onChange={(event) => onChangeNoteColor(note.id, event.target.value)}
                            />
                            <button onClick={() => handleRemoveNote(note.id)}>
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}