const { useState, useEffect, useRef } = React

import { EmailFolderList } from '../cmps/EmailFolderList.jsx'
import { SearchFilter } from '../cmps/SearchFilter.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { EmailCompose } from '../cmps/EmailCompose.jsx'

import { storageService } from '../../../services/async-storage.service.js'
import { mailService } from '../services/mail.service.js'

export function MailIndex() {
  const MAIL_KEY = mailService.MAIL_KEY
  // localStorage.clear()
  const [mailsList, setMails] = useState([])

  useEffect(() => {
    storageService.query(MAIL_KEY).then((mails) => {
      console.log(mails)
      setMails(mails.filter((mail) => mail.isReceived))
    })
  }, [])
  // localStorage.clear()
  // console.log(mails)

  const emailComposeRef = useRef()

  const folder = useRef('received')

  function toggleCompose() {
    const curr = emailComposeRef.current.style.display
    curr === 'block'
      ? (emailComposeRef.current.style.display = 'none')
      : (emailComposeRef.current.style.display = 'block')
  }

  function changeFolder(folder) {
    let entity
    switch (folder) {
      case 'received':
        entity = 'isReceived'
        break
      case 'favorite':
        entity = 'isFavorite'
        break
      case 'sent':
        entity = 'isSent'
        break
      case 'draft':
        entity = 'isDraft'
        break
      case 'trash':
        entity = 'isTrash'
        break
    }
    console.log(entity)
    storageService.query(MAIL_KEY).then((mails) => {
      console.log(mails)

      setMails(mails.filter((mail) => mail[entity]))
    })
  }

  function toggleFavorite(id) {
    console.log(id)
    const mail = mailsList.find((mail) => mail.id === id)
    console.log(mail)
    mail.isFavorite ? (mail.isFavorite = false) : (mail.isFavorite = true)
    console.log(mail)
    const newMails = { ...mailsList }
    console.log(mailsList)
    storageService.put(MAIL_KEY, mail).then(() => {
      storageService.query(MAIL_KEY).then((mails) => {
        setMails(mails)
      })
    })
    // setMails(...mailsList)
  }

  return (
    <section className='body-container'>
      <EmailFolderList
        mailsList={mailsList}
        emailComposeRef={emailComposeRef}
        toggleCompose={toggleCompose}
        changeFolder={changeFolder}
        folder={folder}
      />
      <SearchFilter mailsList={mailsList} setMails={setMails} />
      <MailList mailsList={mailsList} toggleFavorite={toggleFavorite} />
      <EmailCompose
        mailsList={mailsList}
        setMails={setMails}
        emailComposeRef={emailComposeRef}
        toggleCompose={toggleCompose}
      />
    </section>
  )
}
