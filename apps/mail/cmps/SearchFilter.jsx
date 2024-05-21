export function SearchFilter({ setMails }) {
  return (
    <div className='filter-search-container'>
      <div className='search-container'>
        <i class='fa-solid fa-magnifying-glass'></i>
        <input type='text' placeholder='Search' />
      </div>

      <div className='filter-container'>
        <button>Date</button>
        <button>Subject</button>
        <button>All</button>
      </div>
    </div>
  )
}
