const { useState, useEffect, useRef } = React

import { EmailFolderList } from '../cmps/EmailFolderList.jsx'
import { SearchFilter } from '../cmps/SearchFilter.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { EmailCompose } from '../cmps/EmailCompose.jsx'

import { storageService } from '../../../services/async-storage.service.js'
import { mailService } from '../services/mail.service.js'

export function MailIndex() {
  const MAIL_KEY = mailService.MAIL_KEY

  const [mailsList, setMails] = useState([])

  useEffect(() => {
    storageService.query(MAIL_KEY).then((mails) => {
      console.log(mails)
      setMails(mails.received)
    })
  }, [])
  // localStorage.clear()
  // console.log(mails)

  const emailComposeRef = useRef()

  function toggleCompose() {
    const curr = emailComposeRef.current.style.display
    curr === 'block'
      ? (emailComposeRef.current.style.display = 'none')
      : (emailComposeRef.current.style.display = 'block')
  }

  function changeFolder(folder) {
    storageService.query(MAIL_KEY).then((mails) => {
      console.log(mails)
      if (folder === 'favorite') {
        console.log(mails.received[0].isFavorite)
        const mailsList = mails.received
        const favorite = mailsList.filter((mail) => mail.isFavorite === true)
        console.log(favorite)
        setMails(favorite)
        return
      }
      setMails(mails[folder])
    })
  }

  function toggleFavorite(id) {
    console.log(id)
    const mail = mailsList.find((mail) => mail.id === id)
    console.log(mail)
    mail.isFavorite ? (mail.isFavorite = false) : (mail.isFavorite = true)
    console.log(mail)
    storageService.put(MAIL_KEY, mail).then((mails) => {
      setMails(mails)
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
