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
  toggleCompose,
  setCompose,
  searchParams,
  setSearchParams,
  compose,
  removeFromDraft,
  editMail,
}) {
  const params = useParams()
  const navigate = useNavigate()

  mailsList.forEach((mail) => {
    const d = new Date(mail.sentAt)
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
                <div key={mail.id}>
                  <EmailPreview
                    mail={mail}
                    toggleFavorite={toggleFavorite}
                    toggleRead={toggleRead}
                    moveToTrash={moveToTrash}
                    folder={folder}
                    removeFromTrash={removeFromTrash}
                    openMail={openMail}
                    toggleCompose={toggleCompose}
                    setCompose={setCompose}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    compose={compose}
                    removeFromDraft={removeFromDraft}
                    mailsList={mailsList}
                    editMail={editMail}
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
                    openMail={openMail}
                    toggleCompose={toggleCompose}
                    setCompose={setCompose}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    compose={compose}
                    removeFromDraft={removeFromDraft}
                    mailsList={mailsList}
                    editMail={editMail}
                  />
                </div>
              )
            }
          }
        })}
    </div>
  )
}
