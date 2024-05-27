const { useState, useEffect } = React
import { noteService } from '../services/note.service.js'
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export function NoteFilter({ onFilter }) {
    const [filterBy, setFilterBy] = useState({ name: '', type: '' })

    function handleChange(event) {
        const { name, value } = event.target
        setFilterBy(prevFilterBy => ({
            ...prevFilterBy,
            [name]: value
        }))
    }

    return (
        <div className='filter-notes'>
            <h3>Filter</h3>
            <input
                name="name"
                value={filterBy.name}
                onChange={handleChange}
                type="text"
                placeholder='Filter by name'
            />
            <input
                name="type"
                value={filterBy.type}
                onChange={handleChange}
                type="text"
                placeholder='Filter by type'
            />
        </div>
    )
}