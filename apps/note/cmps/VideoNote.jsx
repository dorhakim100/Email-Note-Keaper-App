const { useState, useEffect } = React
import { utilService } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'
import { storageService } from '../../../services/storage.service.js'

export function VideoNote({ notes, setNotes }) {
    const [videoLink, setVideoLink] = useState('')

    function addVideoNote() {
        if (!videoLink.trim()) return

        const videoId = extractVideoId(videoLink)
        if (!videoId) {
            alert('Invalid Link!')
            return
        }

        const note = {
            id: utilService.makeId(),
            type: 'VideoNote',
            style: { backgroundColor: '#b0c4de' },
            info: { videoId }
        }

        const updatedNotes = [...notes, note]
        setNotes(updatedNotes)
        storageService.saveToStorage(noteService.NOTE_KEY, updatedNotes)
        setVideoLink('')
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