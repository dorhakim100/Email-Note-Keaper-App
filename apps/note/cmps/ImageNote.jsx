const { useState, useEffect } = React
import { utilService } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'
import { storageService } from '../../../services/storage.service.js'

export function ImageNote({ notes, setNotes, setFilteredNotes }) {
    const [newImage, setNewImage] = useState(null)

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
        setFilteredNotes(updatedNotes)
        storageService.saveToStorage(noteService.NOTE_KEY, updatedNotes)
        setNewImage(null)


    }
    return (
        <div className='new-image'>
            <input
                type="file"
                accept="image/*"
                onChange={onImageUpload}
            />
            <button onClick={addImageNote}>Add Image Note <i className="fa-solid fa-image"></i></button>
        </div>
    )
}