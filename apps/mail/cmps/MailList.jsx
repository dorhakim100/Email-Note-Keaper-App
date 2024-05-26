const { useState, useEffect, useRef } = React

const { Link, Outlet } = ReactRouterDOM

const { useParams, useNavigate } = ReactRouter

import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

import { EmailPreview } from '../cmps/EmailPreview.jsx'

export function MailList({
  mailsList,
  toggleFavorite,
  toggleRead,
  moveToTrash,
  folder,
  removeFromTrash,
  openMail,
}) {
  const params = useParams()
  const navigate = useNavigate()

  // console.log(mailsList)

  mailsList.forEach((mail) => {
    const d = new Date(mail.sentAt)

    // console.log(utilService.getMonthName(d))
    mail.timeStr = `${d.getDay()} ${utilService.getMonthName(d)}`
  })
  useEffect(() => {}, [])

  return (
    <div className='mail-list-container'>
      {(mailsList.length === 0 && <p>Folder is empty...</p>) ||
        mailsList.map((mail, index) => {
          {
            if (mail.isTrash === false && folder.current !== 'trash') {
              return (
                // <Link replace to={`/mail/${folder.current}/${mail.id}`}>
                <div key={mail.id}>
                  <EmailPreview
                    mail={mail}
                    toggleFavorite={toggleFavorite}
                    toggleRead={toggleRead}
                    moveToTrash={moveToTrash}
                    folder={folder}
                    removeFromTrash={removeFromTrash}
                    openMail={openMail}
                  />
                </div>
                // </Link>
              )
            } else if (folder.current === 'trash') {
              return (
                // <Link replace to={`/mail/${folder.current}/${mail.id}`}>
                <div key={mail.id}>
                  <EmailPreview
                    mail={mail}
                    toggleFavorite={toggleFavorite}
                    toggleRead={toggleRead}
                    moveToTrash={moveToTrash}
                    folder={folder}
                    removeFromTrash={removeFromTrash}
                    openMail={openMail}
                  />
                </div>
                // </Link>
              )
            }
          }
        })}
      {/* <Outlet /> */}
    </div>
  )
}

// ;<Link to={`/book/${book.id}`}>
//   <button className='btn full-details back' data-book-id={book.id}>
//     Full details
//   </button>
// </Link>
