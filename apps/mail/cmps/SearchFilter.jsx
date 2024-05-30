const { useRef, useState } = React

import { storageService } from '../../../services/async-storage.service.js'
import { mailService } from '../services/mail.service.js'

export function SearchFilter({
  setMails,
  folder,
  getEntity,

  filter,
  filterBy,
  setFilterBy,
  filterByTxtReadUnread,
  mailsList,
  sortEmails,
  sortBy,
  navBar,
  sortBar,
}) {
  const elSearch = useRef()
  const elBtn = useRef()

  let [sort, setSort] = useState()

  let sortStatus

  function onFilterReadUnread({ target }) {
    const btnType = target.innerText
    filterBy.readStatus = btnType
    filterByTxtReadUnread()
      .then((mails) => {
        setMails(mails)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function onFilterByTxt({ target }) {
    const value = target.value
    filterBy.txt = value
    filterByTxtReadUnread()
      .then((mails) => {
        setMails(mails)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const readStatus = [
    {
      displayValue: 'All',
      key: 1,
    },
    {
      displayValue: 'Read',
      key: 2,
    },
    {
      displayValue: 'Unread',
      key: 3,
    },
  ]

  function onClearSearch() {
    elSearch.current.value = ''
    console.log(sortBy.current)
    storageService.query(mailService.MAIL_KEY).then((mails) => {
      const entity = getEntity(folder)
      const filtered = mails.filter((mail) => mail[entity] === true)
      mailsList = filtered
      setMails(filtered)
    })
  }

  function onSortingMails({ target }) {
    const currSorting = target.innerText
    switch (currSorting) {
      case 'Date':
        target.innerText = 'Date ˅'
        sortBy.current = 'Date ˅'
        break
      case 'Title':
        target.innerText = 'Title ˅'
        sortBy.current = 'Title ˅'
        break
      case 'Date ˅':
        target.innerText = 'Date ˄'
        sortBy.current = 'Date ˄'
        break
      case 'Title ˅':
        target.innerText = 'Title ˄'
        sortBy.current = 'Title ˄'
        break
      case 'Date ˄':
        target.innerText = 'Date ˅'
        sortBy.current = 'Date ˅'
        break
      case 'Title ˄':
        target.innerText = 'Title ˅'
        sortBy.current = 'Title ˅'
        break
    }
    sortEmails()
  }

  function toggleNavBar() {
    const elNavBar = navBar.current
    const curr = elNavBar.style.display
    if (curr === 'block') {
      elNavBar.style.display = 'none'
    } else {
      elNavBar.style.display = 'block'
    }
  }

  function toggleSorting() {
    const elSortBar = sortBar.current
    const curr = elSortBar.style.display
    if (curr === 'flex') {
      elSortBar.style.display = 'none'
    } else {
      elSortBar.style.display = 'flex'
    }
  }

  return (
    <div className='filter-search-container'>
      <div className='folders-button-container'>
        <button className='folders-button' onClick={toggleNavBar}>
          <i className='fa-solid fa-bars'></i>
        </button>
      </div>
      <div className='sorting-buttons-container'>
        <button className='folders-button' onClick={toggleSorting}>
          <i class='fa-solid fa-sort'></i>
        </button>
      </div>
      <div className='search-container'>
        <i className='fa-solid fa-magnifying-glass'></i>
        <input
          ref={elSearch}
          onChange={onFilterByTxt}
          type='text'
          placeholder='Search'
        />

        <i onClick={onClearSearch} className='fa-solid fa-x'></i>
      </div>

      <div className='filter-container' ref={sortBar}>
        <div className='filter-buttons read-unread'>
          <button
            onClick={onFilterReadUnread}
            className={`btn filter ${
              filterBy.readStatus === 'All' && `active`
            }`}
          >
            All
          </button>
          <button
            onClick={onFilterReadUnread}
            data-button='Unread'
            className={`btn filter ${
              filterBy.readStatus === 'Unread' && `active`
            }`}
          >
            Unread
          </button>
          <button
            onClick={onFilterReadUnread}
            className={`btn filter ${
              filterBy.readStatus === 'Read' && `active`
            }`}
          >
            Read
          </button>
        </div>
        <div className='filter-buttons sorting'>
          <button
            onClick={onSortingMails}
            className={`btn filter ${
              sortBy.current === 'Date' ||
              sortBy.current === 'Date ˅' ||
              (sortBy.current === 'Date ˄' && `active`)
            }`}
          >
            Date
          </button>
          <button
            onClick={onSortingMails}
            className={`btn filter ${
              sortBy.current === 'Title' ||
              sortBy.current === 'Title ˅' ||
              (sortBy.current === 'Title ˄' && `active`)
            }`}
          >
            Title
          </button>
        </div>
      </div>
    </div>
  )
}
