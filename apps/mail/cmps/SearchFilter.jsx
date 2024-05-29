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
}) {
  const elSearch = useRef()
  const elBtn = useRef()

  function onFilterReadUnread({ target }) {
    console.log(target)
    const btnType = target.innerText
    console.log(btnType)
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
    console.log(value)
    filterBy.txt = value
    filterByTxtReadUnread()
      .then((mails) => {
        setMails(mails)
      })
      .catch((err) => {
        console.log(err)
      })
    // setMails(mailsList)
    // const entity = getEntity(folder)
    // if (!mailsList) {
    //   storageService.query(mailService.MAIL_KEY).then((mails) => {
    //     const filtered = mails.filter((mail) => mail[entity] === true)
    //     const regExp = new RegExp(value, 'i')
    //     const searched = filtered.filter(
    //       (mail) =>
    //         regExp.test(mail.subject) ||
    //         regExp.test(mail.to) ||
    //         regExp.test(mail.from) ||
    //         regExp.test(mail.subject) ||
    //         regExp.test(mail.body)
    //     )
    //     mailsList = searched
    //     setMails(mailsList)
    //   })
    // } else {
    //   const searched = mailsList.filter(
    //     (mail) =>
    //       regExp.test(mail.subject) ||
    //       regExp.test(mail.to) ||
    //       regExp.test(mail.from) ||
    //       regExp.test(mail.subject) ||
    //       regExp.test(mail.body)
    //   )
    //   mailsList = searched
    //   setMails(mailsList)
    // }
  }

  function onClearSearch() {
    console.log(elSearch.current)
    elSearch.current.value = ''
    storageService.query(mailService.MAIL_KEY).then((mails) => {
      const entity = getEntity(folder)
      const filtered = mails.filter((mail) => mail[entity] === true)
      mailsList = filtered
      setMails(filtered)
    })
  }

  return (
    <div className='filter-search-container'>
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

      <div className='filter-container'>
        <button
          ref={elBtn}
          onClick={onFilterReadUnread}
          data-button='Unread'
          className={`btn filter ${
            filterBy.readStatus === 'Unread' && `active`
          }`}
        >
          Unread
        </button>
        <button
          ref={elBtn}
          onClick={onFilterReadUnread}
          className={`btn filter ${filterBy.readStatus === 'Read' && `active`}`}
        >
          Read
        </button>
        <button
          ref={elBtn}
          onClick={onFilterReadUnread}
          className={`btn filter ${filterBy.readStatus === 'All' && `active`}`}
        >
          All
        </button>
      </div>
    </div>
  )
}
