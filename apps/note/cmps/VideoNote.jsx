const { useState, useEffect } = React
import Swal from '../../../lib/swal.js'
import { noteService } from '../services/note.service.js'
import { storageService } from '../../../services/storage.service.js'

export function VideoNote({ notes, setNotes, setFilteredNotes }) {
    const [videoLink, setVideoLink] = useState('')

    function addVideoNote() {
        if (!videoLink.trim()) return

        const videoId = extractVideoId(videoLink)
        if (!videoId) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid YouTube Link!',
                text: 'Please enter a valid YouTube video link.'
            })
            return
        }

        const note = {
            type: 'VideoNote',
            style: { backgroundColor: '#b0c4de' },
            info: { videoId }
        }

        noteService.save(note)
            .then(savedNote => {
                const updatedNotes = [...notes, savedNote]
                setNotes(updatedNotes)
                setFilteredNotes(updatedNotes)
                storageService.saveToStorage(noteService.NOTE_KEY, updatedNotes)
                setVideoLink('')
            })
            .catch(error => console.error('Error adding video note:', error))
    }

    function extractVideoId(url) {
        const regex = /(?:http(?:s)?:\/\/)?(?:www\.)?youtu(?:be\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|\.be\/)([\w\-\_]*)(&(amp;)?[\w?‌​=]*)?/
        const match = url.match(regex)
        return match ? match[1] : null
    }

    return (
        <div className='new-video'>
            <input
                type='text'
                value={videoLink}
                onChange={(event) => setVideoLink(event.target.value)}
                placeholder="Enter YouTube Link:"
            />
            <button onClick={addVideoNote}>
                Add Video Note <i className="fa-solid fa-video"></i>
            </button>
        </div>
    )
}