const { useState, useEffect, useRef } = React

import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export function MailList({ mailsList }) {
  console.log(mailsList)
  mailsList.forEach((mail) => {
    console.log(mail.sentAt)
    const d = new Date(mail.sentAt)
    console.log(d)
    mail.timeStr = d.toUTCString()
  })

  console.log(mailsList)

  console.log(utilService.getDayName(mailsList[0].sentAt))

  return (
    <div className='mail-list-container'>
      {mailsList.map((mail) => {
        return (
          <div className='mail-container'>
            <h2>{mail.from}</h2>
            <h3>{mail.subject}</h3>
            <p>{mail.body}</p>
            <p>{mail.timeStr}</p>
          </div>
        )
      })}
    </div>
  )
}
