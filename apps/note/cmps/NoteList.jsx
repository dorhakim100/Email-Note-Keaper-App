
export function NoteList({ notes, onRemoveNote, onEditNote, onChangeNoteColor, onDuplicateNote }) {

    return <section className="note-list-container">
        <ul className='noteList'>
            {notes.map(note => <li key={note.id} style={{ backgroundColor: note.style.backgroundColor }}>
                <span>{note.info.txt}</span>
                <button onClick={() => {
                    const newText = prompt('Enter new text for the note:', note.info.txt)
                    if (newText !== null) {
                        onEditNote(note.id, newText)
                    }
                }}><i className="fa-solid fa-pen-to-square"></i></button>
                <button onClick={() => onDuplicateNote(note.id)}><i className="fa-solid fa-copy"></i></button>
                <input
                    type="color"
                    value={note.style.backgroundColor}
                    onChange={(event) => onChangeNoteColor(note.id, event.target.value)}
                />
                <button onClick={() => onRemoveNote(note.id)}><i className="fa-solid fa-trash"></i></button>
            </li>)}
        </ul>
    </section>
}
