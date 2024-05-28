const { useRef, useState } = React

import { storageService } from '../../../services/async-storage.service.js'
import { mailService } from '../services/mail.service.js'

export function SearchFilter({
  setMails,
  folder,
  getEntity,
  filterReadUnread,
}) {
  const elSearch = useRef()

  let mailsList

  function onFilterReadUnread({ target }) {
    const btnType = target.innerText
    console.log(btnType)
    const entity = getEntity(folder)
    switch (btnType) {
      case 'Unread':
        storageService.query(mailService.MAIL_KEY).then((mails) => {
          const filtered = mails.filter(
            (mail) => mail[entity] === true && mail.isRead === false
          )

          setMails(filtered)
        })
        break
      case 'Read':
        storageService.query(mailService.MAIL_KEY).then((mails) => {
          const filtered = mails.filter(
            (mail) => mail[entity] === true && mail.isRead === true
          )

          setMails(filtered)
        })
        break
      case 'All':
        storageService.query(mailService.MAIL_KEY).then((mails) => {
          const filtered = mails.filter((mail) => mail[entity] === true)

          setMails(filtered)
        })
        break
    }
  }

  function onFilterByTxt({ target }) {
    const value = target.value
    console.log(value)
    const entity = getEntity(folder)
    if (!mailsList) {
      storageService.query(mailService.MAIL_KEY).then((mails) => {
        const filtered = mails.filter((mail) => mail[entity] === true)
        const regExp = new RegExp(value, 'i')
        const searched = filtered.filter(
          (mail) =>
            regExp.test(mail.subject) ||
            regExp.test(mail.to) ||
            regExp.test(mail.from) ||
            regExp.test(mail.subject) ||
            regExp.test(mail.body)
        )
        mailsList = searched
        setMails(mailsList)
      })
    } else {
      const searched = mailsList.filter(
        (mail) =>
          regExp.test(mail.subject) ||
          regExp.test(mail.to) ||
          regExp.test(mail.from) ||
          regExp.test(mail.subject) ||
          regExp.test(mail.body)
      )
      mailsList = searched
      setMails(mailsList)
    }
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
        <button onClick={onFilterReadUnread} className='btn filter date'>
          Unread
        </button>
        <button onClick={onFilterReadUnread} className='btn filter subject'>
          Read
        </button>
        <button onClick={onFilterReadUnread} className='btn filter all'>
          All
        </button>
      </div>
    </div>
  )
}
