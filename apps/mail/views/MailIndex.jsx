const { useState, useEffect, useRef } = React

const { Link, Outlet, useSearchParams } = ReactRouterDOM

const { useParams, useNavigate } = ReactRouter

const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { EmailFolderList } from '../cmps/EmailFolderList.jsx'
import { SearchFilter } from '../cmps/SearchFilter.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { EmailCompose } from '../cmps/EmailCompose.jsx'
import { EmailDetails } from '../cmps/EmailDetails.jsx'

import { storageService } from '../../../services/async-storage.service.js'
import { mailService } from '../services/mail.service.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js'
import { showErrorMsg } from '../../../services/event-bus.service.js'

export function MailIndex({ logo, setLogo }) {
  const MAIL_KEY = mailService.MAIL_KEY

  const [mailsList, setMails] = useState([])

  const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())

  const emailComposeRef = useRef()

  const folder = useRef('received')
  let clickedFolder

  const sortBy = useRef()

  const newMails = useRef()

  const navBar = useRef()

  const sortBar = useRef()

  const params = useParams()
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams()
  const [compose, setCompose] = useState(
    mailService.getComposeFromSearchParams(searchParams)
  )

  console.log(compose)

  // localStorage.clear()

  useEffect(() => {
    logo = {
      name: 'Gmail',
      src: 'Icons-SVG/gmail.svg',
    }

    setLogo(logo)

    if (!params.folder) {
      changeFolder('received')

      return
    }

    changeFolder(params.folder)
  }, [params.folder])

  useEffect(() => {
    setCompose(compose)
  }, [searchParams])

  function filterByTxtReadUnread() {
    const entity = getEntity(folder.current)
    const regExp = new RegExp(filterBy.txt, 'i')
    switch (filterBy.readStatus) {
      case 'Unread':
        return storageService.query(mailService.MAIL_KEY).then((mails) => {
          if (!filterBy.txt) {
            return mails.filter(
              (mail) => mail[entity] === true && mail.isRead === false
            )
          } else {
            return mails
              .filter((mail) => mail[entity] === true && mail.isRead === false)
              .filter(
                (mail) =>
                  regExp.test(mail.subject) ||
                  regExp.test(mail.to) ||
                  regExp.test(mail.from) ||
                  regExp.test(mail.subject) ||
                  regExp.test(mail.body)
              )
          }
        })
        break
      case 'Read':
        return storageService.query(mailService.MAIL_KEY).then((mails) => {
          if (!filterBy.txt) {
            return mails.filter(
              (mail) => mail[entity] === true && mail.isRead === true
            )
          } else {
            return mails
              .filter((mail) => mail[entity] === true && mail.isRead === true)
              .filter(
                (mail) =>
                  regExp.test(mail.subject) ||
                  regExp.test(mail.to) ||
                  regExp.test(mail.from) ||
                  regExp.test(mail.subject) ||
                  regExp.test(mail.body)
              )
          }
        })
        break
      case 'All':
        return storageService.query(mailService.MAIL_KEY).then((mails) => {
          if (!filterBy.txt) {
            return mails.filter((mail) => mail[entity] === true)
          } else {
            return mails
              .filter((mail) => mail[entity] === true)
              .filter(
                (mail) =>
                  regExp.test(mail.subject) ||
                  regExp.test(mail.to) ||
                  regExp.test(mail.from) ||
                  regExp.test(mail.subject) ||
                  regExp.test(mail.body)
              )
          }
        })
        break
    }
  }

  function toggleCompose() {
    const curr = emailComposeRef.current.style.display
    if (curr === 'block') {
      emailComposeRef.current.style.display = 'none'
      if (params.mailId) {
        navigate(`/mail/${folder.current}/${params.mailId}`)
      } else {
        navigate(`/mail/${folder.current}`)
      }
    } else {
      emailComposeRef.current.style.display = 'block'
      setSearchParams(compose)

      if (params.mailId) return
    }
  }

  function getEntity(folder) {
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
    return entity
  }

  function changeFolder(paramsFolder) {
    const entity = getEntity(paramsFolder)

    clickedFolder = paramsFolder
    console.log(clickedFolder)
    folder.current = paramsFolder
    storageService.query(MAIL_KEY).then((mails) => {
      newMails.current = mails
        .filter((mail) => mail[entity])
        .filter((mail) => mail.isTrash === false && folder.current !== 'trash')

      setMails(mails.filter((mail) => mail[entity]))
      navigate(`/mail/${clickedFolder}`)
    })
  }

  function toggleFavorite(id) {
    let msg
    const mail = mailsList.find((mail) => mail.id === id)
    if (mail.isFavorite) {
      mail.isFavorite = false
      msg = 'Removed from favorite successfully'
    } else {
      mail.isFavorite = true
      msg = 'Added to favorite successfully'
    }
    const newMails = { ...mailsList }
    storageService.put(MAIL_KEY, mail).then(() => {
      storageService
        .query(MAIL_KEY)
        .then((mails) => {
          const entity = getEntity(folder.current)
          setMails(mails.filter((mail) => mail[entity]))
          showSuccessMsg(msg)
        })
        .catch((err) => {
          showErrorMsg('There was a problem...')
        })
        .finally(() => {})
    })
  }

  function toggleRead(id) {
    let msg
    const mail = mailsList.find((mail) => mail.id === id)
    if (mail.isRead) {
      mail.isRead = false
      msg = 'Mail set as unread successfully'
    } else {
      mail.isRead = true
      msg = 'Mail set as read successfully'
    }

    const newMails = { ...mailsList }
    return storageService.put(MAIL_KEY, mail).then(() => {
      return storageService
        .query(MAIL_KEY)
        .then((mails) => {
          const entity = getEntity(folder.current)
          setMails(mails.filter((mail) => mail[entity]))
          showSuccessMsg(msg)
        })
        .catch((err) => {
          showErrorMsg('There was a problem...')
        })
        .finally(() => {})
    })
  }

  function moveToTrash(id) {
    let msg
    const mail = mailsList.find((mail) => mail.id === id)

    if (mail.isTrash) {
      msg = 'Mail deleted successfully'
      return storageService
        .remove(MAIL_KEY, id)
        .then(() => {
          return storageService.query(MAIL_KEY).then((mails) => {
            showSuccessMsg(msg)
            const entity = getEntity(folder.current)
            setMails(mails.filter((mail) => mail[entity]))
          })
        })
        .catch((err) => {
          console.log(err)
          showErrorMsg('There was a problem...')
        })
        .finally(() => {})
    } else if (!mail.isTrash) {
      msg = 'Mail moved to trash successfully'
      const newMails = { ...mailsList }
      mail.isTrash = true
      return storageService.put(MAIL_KEY, mail).then(() => {
        return storageService
          .query(MAIL_KEY)
          .then((mails) => {
            const entity = getEntity(folder.current)
            setMails(mails.filter((mail) => mail[entity]))
            showSuccessMsg(msg)
          })
          .catch((err) => {
            showErrorMsg('There was a problem...')
          })
          .finally(() => {})
      })
    }
  }

  function removeFromDraft(id) {
    const mail = mailsList.find((mail) => mail.id === id)

    return storageService.remove(MAIL_KEY, id).then(() => {
      return storageService
        .query(MAIL_KEY)
        .then((mails) => {
          const entity = getEntity(folder.current)
          // setMails(mails.filter((mail) => mail[entity]))
          return mails
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {})
    })
  }

  function removeFromTrash(id) {
    const mail = mailsList.find((mail) => mail.id === id)
    if (!mail.isTrash) return
    mail.isTrash = false
    const msg = 'Mail removed from trash successfully'
    storageService.put(MAIL_KEY, mail).then(() => {
      storageService
        .query(MAIL_KEY)
        .then((mails) => {
          const entity = getEntity(folder.current)
          setMails(mails.filter((mail) => mail[entity]))
          showSuccessMsg(msg)
        })
        .catch((err) => {
          showErrorMsg('There was a problem...')
        })
        .finally(() => {})
    })
  }

  function openMail(id) {
    const mail = mailsList.find((mail) => mail.id === id)
    mail.isRead = true
    const newMails = { ...mailsList }
    navigate(`/mail/${folder.current}/${id}`)
    storageService.put(MAIL_KEY, mail).then(() => {
      return storageService
        .query(MAIL_KEY)
        .then((mails) => {
          const entity = getEntity(folder.current)
          setMails(mails.filter((mail) => mail[entity]))
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {})
    })
  }

  function setNextPrevMailId(mail, paramsFolder) {
    const entity = getEntity(paramsFolder)
    return storageService.query(MAIL_KEY).then((mails) => {
      let newMails
      if (folder.current === 'trash') {
        newMails = mails.filter((mail) => mail[entity])
      } else {
        newMails = mails
          .filter((mail) => mail[entity])
          .filter(
            (mail) => mail.isTrash === false && folder.current !== 'trash'
          )
      }
      const mailIdx = newMails.findIndex((currMail) => currMail.id === mail.id)
      console.log(mailIdx)
      const nextMail = newMails[mailIdx + 1]
        ? newMails[mailIdx + 1]
        : newMails[0]
      const prevMail = newMails[mailIdx - 1]
        ? newMails[mailIdx - 1]
        : newMails[newMails.length - 1]

      mail.nextMailId = nextMail.id
      mail.prevMailId = prevMail.id
      return mail
    })
  }

  function sortEmails() {
    let entity
    let sorted

    if (
      sortBy.current === 'Date' ||
      sortBy.current === 'Date ˅' ||
      sortBy.current === 'Date ˄'
    ) {
      entity = 'sentAt'
      sorted = mailsList.sort((a, b) => {
        if (a.sentAt < b.sentAt) return -1
        if (a.sentAt > b.sentAt) return 1
        return 0
      })
    } else if (
      sortBy.current === 'Title' ||
      sortBy.current === 'Title ˅' ||
      sortBy.current === 'Title ˄'
    ) {
      entity = 'subject'
      sorted = mailsList.sort((a, b) => {
        if (a.subject.toUpperCase() < b.subject.toUpperCase()) return -1
        if (a.subject.toUpperCase() > b.subject.toUpperCase()) return 1
        return 0
      })
    }
    if (sortBy.current === 'Date ˄' || sortBy.current === 'Title ˄') {
      sorted.reverse()
    }
    setMails((prevMails) => [...prevMails])
    return sorted
  }

  function editMail(id) {
    const mail = mailsList.find((mail) => mail.id === id)
    removeFromDraft(id).then((mailsList) => {
      toggleCompose()
      compose.to = mail.to
      compose.subject = mail.subject
      compose.body = mail.body
      setCompose(compose)
      navigate(
        `/mail/draft?to=${compose.to}&subject=${compose.subject}&body=${compose.body}`
      )
      console.log(mailsList)
      const entity = getEntity(folder.current)
      setMails(mailsList.filter((mail) => mail[entity]))
    })
  }

  return (
    <section className='body-container'>
      <EmailFolderList
        mailsList={mailsList}
        emailComposeRef={emailComposeRef}
        toggleCompose={toggleCompose}
        changeFolder={changeFolder}
        folder={folder}
        navBar={navBar}
      />

      <SearchFilter
        mailsList={mailsList}
        setMails={setMails}
        folder={folder.current}
        getEntity={getEntity}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        filterByTxtReadUnread={filterByTxtReadUnread}
        sortEmails={sortEmails}
        sortBy={sortBy}
        navBar={navBar}
        sortBar={sortBar}
      />

      {params.mailId && params.mailId !== 'compose' && (
        <EmailDetails
          mailId={params.mailId}
          folder={folder.current}
          toggleFavorite={toggleFavorite}
          toggleRead={toggleRead}
          moveToTrash={moveToTrash}
          removeFromTrash={removeFromTrash}
          newMails={newMails}
          setNextPrevMailId={setNextPrevMailId}
        />
      )}
      {(!params.mailId || params.mailId === 'compose') && (
        <MailList
          mailsList={mailsList}
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
          editMail={editMail}
        />
      )}
      <EmailCompose
        mailsList={mailsList}
        setMails={setMails}
        emailComposeRef={emailComposeRef}
        toggleCompose={toggleCompose}
        compose={compose}
        setCompose={setCompose}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      <button onClick={toggleCompose} className='compose-btn'>
        <i className='fa-solid fa-pencil'></i> Compose
      </button>
    </section>
  )
}
