const { useState, useEffect, useRef } = React

import { storageService } from '../../../services/storage.service.js'

export function MailList({ mails }) {
  const [mailsList, setMails] = useState(mails)

  console.log(mailsList)

  return (
    <div className='mail-list-container'>
      {mailsList.map((mail) => {
        return (
          <div className='mail-container'>
            <h2>{mail.from}</h2>
            <h3>{mail.subject}</h3>
            <p>{mail.body}</p>
          </div>
        )
      })}
    </div>
  )
}
