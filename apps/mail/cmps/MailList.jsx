const { useState, useEffect, useRef } = React

import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

import { EmailPreview } from '../cmps/EmailPreview.jsx'

export function MailList({ mailsList, toggleFavorite }) {
  console.log(mailsList)
  mailsList.forEach((mail) => {
    console.log(mail.sentAt)
    const d = new Date(mail.sentAt)

    console.log(utilService.getMonthName(d))
    mail.timeStr = `${d.getDay()} ${utilService.getMonthName(d)}`
    console.log(mail.timeStr)
  })

  console.log(mailsList)

  // console.log(utilService.getDayName(mailsList[0].sentAt))
  // console.log(mailsList[0].sentAt)

  return (
    <div className='mail-list-container'>
      {mailsList.map((mail) => {
        return <EmailPreview mail={mail} toggleFavorite={toggleFavorite} />
      })}
    </div>
  )
}
