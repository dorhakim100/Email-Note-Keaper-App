const { useState, useEffect } = React
import { noteService } from '../services/note.service.js'
import { storageService } from '../../../services/storage.service.js'

export function AudioNote({ notes, setNotes, setFilteredNotes }) {
    const [soundCloudUrl, setSoundCloudUrl] = useState('')

    function onSoundCloudUrlChange(event) {
        setSoundCloudUrl(event.target.value)
    }

    function addAudioNote() {
        if (!soundCloudUrl) return

        const note = {
            type: 'AudioNote',
            style: { backgroundColor: '#b0c4de' },
            info: { audioUrl: soundCloudUrl }
        }

        noteService.save(note)
            .then(savedNote => {
                const updatedNotes = [...notes, savedNote]
                setNotes(updatedNotes)
                setFilteredNotes(updatedNotes)
                storageService.saveToStorage(noteService.NOTE_KEY, updatedNotes)
                setSoundCloudUrl('')
            })
            .catch(error => console.error('Error adding audio note:', error))
    }

    return (
        <div className='new-audio'>
            <input
                type="text"
                placeholder="Enter SoundCloud URL"
                value={soundCloudUrl}
                onChange={onSoundCloudUrlChange}
            />
            <button onClick={addAudioNote}>Add Audio Note <i className="fa-solid fa-music"></i></button>
        </div>
    )
}