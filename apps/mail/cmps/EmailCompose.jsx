const { useRef, useState, useEffect } = React

// const { useSearchParams } = ReactRouterDOM

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
  compose,
  setCompose,
  searchParams,
  setSearchParams,
}) {
  const isFromMe = useRef(true)
  const [mailSender, setMailSender] = useState(true)

  const to = useRef()
  const subject = useRef()
  const body = useRef()

  useEffect(() => {
    setMailSender(isFromMe.current)
  }, [isFromMe.current])

  useEffect(() => {
    to.current.value = compose.to
    subject.current.value = compose.subject
    body.current.value = compose.body
    setCompose(compose)
  }, [searchParams])

  const loggedUserEmail = mailService.loggedInUser.email

  const mail = useRef({
    id: utilService.makeId,
    subject: '',
    body: '',
    isRead: false,
    isReceived: (!isFromMe.current && true) || false,
    isFavorite: false,
    isSent: (isFromMe.current && true) || false,
    isDraft: false,
    isTrash: false,
    sentAt: Date.now(),
    removedAt: null,
    from: isFromMe.current && mailService.loggedInUser.email,
    to: '',
    profilePic: `Profiles-SVG/${utilService.getRandomIntInclusive(1, 8)}.svg`,
    backgroundColor: utilService.getRandomColor(),
  })

  function handleChange(event) {
    const input = event.target.id
    switch (input) {
      case 'from':
        mail.current.from = event.target.value
        break
      case 'to':
        mail.current.to = event.target.value
        compose.to = event.target.value
        break
      case 'subject':
        mail.current.subject = event.target.value
        compose.subject = event.target.value
        break
      case 'body':
        mail.current.body = event.target.value
        compose.body = event.target.value
        break
    }
    console.log(mail.current)
    setCompose(compose)
    setSearchParams(compose)
    if (isFromMe.current) {
      mail.current.from = mailService.loggedInUser.email
      mail.current.isSent = true
      mail.current.isRead = true
    }
  }

  function onSaveMail() {
    console.log(mail.current)
    if (
      mail.current.body === '' &&
      mail.current.subject === '' &&
      mail.current.to === ''
    ) {
      toggleCompose()
      return
    }
    storageService
      .post(mailService.MAIL_KEY, mail.current)
      .then(() => {
        storageService
          .query((mails) => {
            setMails(mails)
            const msg = 'Success'
            showSuccessMsg(msg)
            mails
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
      <div
        className='compose-header-container'
        onClick={() => {
          mail.current.isRead = false
          mail.current.isReceived = false
          mail.current.isSent = false
          mail.current.isDraft = true
          onSaveMail()
        }}
      >
        <h2>New Message</h2>
        <i className='fa-solid fa-xmark x-btn'></i>
      </div>
      <div className='inputs-container'>
        <div className='from-container'>
          <label htmlFor='from'>From</label>
          {/* <input
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
          <label htmlFor=''>Me</label> */}
          {(isFromMe.current && (
            <h3 className='sender'>{mailService.loggedInUser.fullName}</h3>
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
              ref={to}
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
            ref={subject}
            type='text'
            id='subject'
            onKeyUp={(event) => handleChange(event)}
          />
        </div>

        <textarea
          ref={body}
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
