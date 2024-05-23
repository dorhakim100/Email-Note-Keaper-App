const { useState, useEffect, useRef } = React

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
}) {
  mailsList.forEach((mail) => {
    const d = new Date(mail.sentAt)

    console.log(utilService.getMonthName(d))
    mail.timeStr = `${d.getDay()} ${utilService.getMonthName(d)}`
  })

  return (
    <div className='mail-list-container'>
      {(mailsList.length === 0 && <p>Folder is empty...</p>) ||
        mailsList.map((mail, index) => {
          {
            if (mail.isTrash === false && folder.current !== 'trash') {
              return (
                <div key={mail.id}>
                  <EmailPreview
                    mail={mail}
                    toggleFavorite={toggleFavorite}
                    toggleRead={toggleRead}
                    moveToTrash={moveToTrash}
                    folder={folder}
                    removeFromTrash={removeFromTrash}
                  />
                </div>
              )
            } else if (folder.current === 'trash') {
              return (
                <div key={mail.id}>
                  <EmailPreview
                    mail={mail}
                    toggleFavorite={toggleFavorite}
                    toggleRead={toggleRead}
                    moveToTrash={moveToTrash}
                    folder={folder}
                    removeFromTrash={removeFromTrash}
                  />
                </div>
              )
            }
          }
        })}
    </div>
  )
}
