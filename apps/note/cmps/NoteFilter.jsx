const { useState, useEffect } = React

export function NoteFilter({ onFilter }) {
    const [filterBy, setFilterBy] = useState({ name: '', type: '' })

    function handleChange(event) {
        const { name, value } = event.target
        const updatedFilter = { ...filterBy, [name]: value }
        setFilterBy(updatedFilter)
        onFilter(updatedFilter)
    }

    return (
        <div className='filter-notes'>
            <h3>Filter <i class="fa-solid fa-sort"></i></h3>
            <input
                name="name"
                value={filterBy.name}
                onChange={handleChange}
                type="text"
                placeholder='Filter by Text'
            />
            <select
                name="type"
                value={filterBy.type}
                onChange={handleChange}
            >
                <option value="">Filter by Type</option>
                <option value="NoteTxt">Note Text</option>
                <option value="ToDo">Todo List</option>
                <option value="ImageNote">Image Note</option>
                <option value="VideoNote">Video Note</option>
                <option value="AudioNote">Audio Note</option>
            </select>
        </div>
    )
}