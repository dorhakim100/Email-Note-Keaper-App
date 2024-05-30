const { useRef, useState, useEffect } = React

import { mailService } from '../services/mail.service.js'
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

import { showSuccessMsg } from '../../../services/event-bus.service.js'
import { showErrorMsg } from '../../../services/event-bus.service.js'

export function EmailCompose({
  mailList,
  setMails,
  emailComposeRef,
  toggleCompose,
}) {
  const isFromMe = useRef(true)
  const [mailSender, setMailSender] = useState(true)

  useEffect(() => {
    setMailSender(isFromMe.current)
  }, [isFromMe.current])

  const loggedUserEmail = mailService.loggedInUser.email

  const mail = {
    id: utilService.makeId,
    subject: '',
    body: ``,
    isRead: false,
    isReceived: (!isFromMe.current && true) || false,
    isFavorite: false,
    isSent: (isFromMe.current && true) || false,
    isDraft: false,
    isTrash: false,
    sentAt: Date.now(),
    removedAt: null,
    from: isFromMe.current && mailService.loggedInUser.email,
    to: !isFromMe.current || loggedUserEmail,
    profilePic: `../../../Profiles-SVG/${utilService.getRandomIntInclusive(
      1,
      8
    )}.svg`,
  }

  function handleChange(event) {
    const input = event.target.id
    switch (input) {
      case 'from':
        mail.from = event.target.value
        break
      case 'to':
        mail.to = event.target.value
        break
      case 'subject':
        mail.subject = event.target.value
        break
      case 'body':
        mail.body = event.target.value
        break
    }
    if (isFromMe.current) {
      mail.from = mailService.loggedInUser.email
      mail.isSent = true
      mail.isRead = true
    }
  }

  function onSaveMail() {
    storageService
      .post(mailService.MAIL_KEY, mail)
      .then(() => {
        storageService
          .query((mails) => {
            setMails(mails)
            const msg = 'Success'
            showSuccessMsg(msg)
          })
          .catch((err) => {
            console.log(err)
            const msg = `Couldn't complete...`
            showErrorMsg(msg)
          })
          .finally(() => {
            toggleCompose()
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <section className='email-compose-container' ref={emailComposeRef}>
      <div className='compose-header-container' onClick={toggleCompose}>
        <h2>New Message</h2>
        <i className='fa-solid fa-xmark x-btn'></i>
      </div>
      <div className='inputs-container'>
        <div className='from-container'>
          <label htmlFor='from'>From</label>
          <input
            type='checkbox'
            checked={isFromMe.current}
            onChange={() => {
              isFromMe.current = !isFromMe.current
              if (!isFromMe.current) {
                mail.from = ''
                mail.isSent = false
              }
              if (isFromMe.current) {
                mail.from = mailService.loggedInUser.email
                mail.isSent = true
                mail.isRead = true
              }
              setMailSender(isFromMe.current)
            }}
          />
          <label htmlFor=''>Me</label>
          {(isFromMe.current && (
            <h3>{mailService.loggedInUser.fullName}</h3>
          )) || (
            <input
              type='text'
              id='from'
              onKeyUp={(event) => {
                if (isFromMe.current) return
                handleChange(event)
              }}
            />
          )}
        </div>
        <div className='to-container'>
          <label htmlFor='to'>To</label>
          {!isFromMe.current && mailService.loggedInUser.fullName}
          {isFromMe.current && (
            <input
              type='text'
              id='to'
              onKeyUp={(event) => {
                if (!isFromMe.current) return
                handleChange(event)
              }}
            />
          )}
        </div>
        <div className='subject-container'>
          <label htmlFor='subject'>Subject</label>
          <input
            type='text'
            id='subject'
            onKeyUp={(event) => handleChange(event)}
          />
        </div>

        <textarea
          className='body-input'
          name='txt'
          cols='50'
          rows='20'
          id='body'
          onKeyUp={(event) => handleChange(event)}
        ></textarea>
      </div>

      <button
        className='send-btn'
        onClick={() => {
          onSaveMail()
        }}
      >
        Send
      </button>
    </section>
  )
}
