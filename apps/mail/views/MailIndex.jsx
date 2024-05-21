const { useState, useEffect, useRef } = React

import { NavBar } from '../cmps/NavBar.jsx'
import { SearchFilter } from '../cmps/SearchFilter.jsx'
import { MailList } from '../cmps/MailList.jsx'

import { storageService } from '../../../services/storage.service.js'
import { mailService } from '../services/mail.service.js'

export function MailIndex() {
  const MAIL_KEY = mailService.MAIL_KEY

  const mails = storageService.loadFromStorage(MAIL_KEY)

  const [mailsList, setMails] = useState(mails)

  return (
    <section className='body-container'>
      <NavBar mailsList={mailsList} />
      <SearchFilter mailsList={mailsList} setMails={setMails} />
      <MailList mailsList={mailsList} />
    </section>
  )
}
