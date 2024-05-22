export function SearchFilter({ setMails }) {
  return (
    <div className='filter-search-container'>
      <div className='search-container'>
        <i className='fa-solid fa-magnifying-glass'></i>
        <input type='text' placeholder='Search' />
      </div>

      <div className='filter-container'>
        <button className='btn filter date'>Date</button>
        <button className='btn filter subject'>Subject</button>
        <button className='btn filter all'>All</button>
      </div>
    </div>
  )
}
