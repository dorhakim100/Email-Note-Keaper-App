import { storageService } from '../../../services/async-storage.service.js'
import { mailService } from '../services/mail.service.js'

export function SearchFilter({ setMails, mailsList, folder, getEntity }) {
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

  return (
    <div className='filter-search-container'>
      <div className='search-container'>
        <i className='fa-solid fa-magnifying-glass'></i>
        <input type='text' placeholder='Search' />
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
