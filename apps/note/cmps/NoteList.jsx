
export function NoteList({ notes, onRemoveNote, onEditNote, onChangeNoteColor, onDuplicateNote, onTodoAddTask, onToggleTask, onRemoveTask }) {

    return (
        <section className='note-list-container'>
            <ul className='noteList'>
                {notes.map(note => (
                    <li key={note.id} style={{ backgroundColor: note.style.backgroundColor }}>
                        {note.type === 'NoteTxt' && (
                            <div>
                                <span>{note.info.txt}</span>
                                <button onClick={() => {
                                    const newText = prompt('Enter new text for the note:', note.info.txt)
                                    if (newText !== null) {
                                        onEditNote(note.id, newText)
                                    }
                                }}>
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
                                <button onClick={() => {
                                    const newTask = prompt('Enter a new task:')
                                    if (newTask !== null) {
                                        onTodoAddTask(note.id, newTask)
                                    }
                                }}>
                                    <i className="fa-solid fa-list-check"></i>
                                </button>
                            </div>
                        )}
                        <button onClick={() => onDuplicateNote(note.id)}>
                            <i className="fa-solid fa-copy"></i>
                        </button>
                        <input
                            type="color"
                            value={note.style.backgroundColor}
                            onChange={(event) => onChangeNoteColor(note.id, event.target.value)}
                        />
                        <button onClick={() => onRemoveNote(note.id)}>
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    )
}