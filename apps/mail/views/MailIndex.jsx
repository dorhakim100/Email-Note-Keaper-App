const { useState, useEffect, useRef } = React

const { Link, Outlet } = ReactRouterDOM

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

export function MailIndex() {
  const MAIL_KEY = mailService.MAIL_KEY
  // localStorage.clear()
  const [mailsList, setMails] = useState([])

  const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())

  const emailComposeRef = useRef()

  const folder = useRef('received')
  let clickedFolder

  const newMails = useRef()

  const params = useParams()
  const navigate = useNavigate()

  // console.log(params)

  useEffect(() => {
    storageService
      .query(MAIL_KEY)
      .then((mails) => {
        setMails(mails.filter((mail) => mail.isReceived))
      })
      .catch((err) => {
        console.log(err)
        navigate(`/mail/${folder.current}`)
      })
  }, [filterBy])

  useEffect(() => {
    if (params.mailId === 'compose') {
      console.log('works')
    }
    //   if (params.mailId) {
    //     console.log('works')
    //     return
    //   }
    //   if (!params.mailId) return
    //   console.log(params.mailId)
  }, [params.mailId])

  useEffect(() => {
    if (!params.folder) {
      changeFolder('received')

      return
    }

    changeFolder(params.folder)
  }, [params.folder])
  // localStorage.clear()
  // console.log(mails)

  function toggleCompose() {
    const curr = emailComposeRef.current.style.display
    if (curr === 'block') {
      emailComposeRef.current.style.display = 'none'
      console.log(params.mailId)
      // navigate(`/mail/${folder.current}`)
    } else {
      emailComposeRef.current.style.display = 'block'
      if (params.mailId) return

      // navigate(`/mail/${folder.current}/compose`)
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
    folder.current = paramsFolder
    storageService.query(MAIL_KEY).then((mails) => {
      // if (mail.isTrash === false && folder.current !== 'trash') {
      // }

      newMails.current = mails
        .filter((mail) => mail[entity])
        .filter((mail) => mail.isTrash === false && folder.current !== 'trash')
      // console.log(newMails.current)
      setMails(mails.filter((mail) => mail[entity]))
      navigate(`/mail/${clickedFolder}`)
      console.log('blabla')
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
          // mailService.save(mail)
          showSuccessMsg(msg)
        })
        .catch((err) => {
          showErrorMsg('There was a problem...')
        })
        .finally(() => {
          // setIsLoading(false)
        })
    })
    // setMails(...mailsList)
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
        .finally(() => {
          // setIsLoading(false)
        })
    })
  }

  function moveToTrash(id) {
    let msg
    const mail = mailsList.find((mail) => mail.id === id)
    console.log(mail)
    if (mail.isTrash) {
      console.log(id)

      msg = 'Mail deleted successfully'
      return storageService
        .remove(MAIL_KEY, id)
        .then(() => {
          return storageService.query(MAIL_KEY).then((mails) => {
            console.log(mails)
            showSuccessMsg(msg)
            const entity = getEntity(folder.current)
            setMails(mails.filter((mail) => mail[entity]))
          })
        })
        .catch((err) => {
          console.log(err)
          showErrorMsg('There was a problem...')
        })
        .finally(() => {
          // setIsLoading(false)
        })
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
          .finally(() => {
            // setIsLoading(false)
          })
      })
    }
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
        .finally(() => {
          // setIsLoading(false)
        })
    })
  }

  function openMail(id) {
    console.log(id)
    console.log(folder.current)
    navigate(`/mail/${folder.current}/${id}`)
  }

  function setNextPrevMailId(mail, paramsFolder) {
    const entity = getEntity(paramsFolder)
    return storageService.query(MAIL_KEY).then((mails) => {
      const newMails = mails
        .filter((mail) => mail[entity])
        .filter((mail) => mail.isTrash === false && folder.current !== 'trash')
      const mailIdx = newMails.findIndex((currMail) => currMail.id === mail.id)
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

  return (
    <section className='body-container'>
      {/* <Link to={`/mail/${folder.current}`}> */}
      <EmailFolderList
        mailsList={mailsList}
        emailComposeRef={emailComposeRef}
        toggleCompose={toggleCompose}
        changeFolder={changeFolder}
        folder={folder}
      />
      {/* </Link> */}
      <SearchFilter mailsList={mailsList} setMails={setMails} />
      {/* <Routes>
        <Route
          path='/mail/received'
          element={
            <MailList
              mailsList={mailsList}
              toggleFavorite={toggleFavorite}
              toggleRead={toggleRead}
              moveToTrash={moveToTrash}
              folder={folder}
              removeFromTrash={removeFromTrash}
            />
          }
        > */}
      {/* <Link to='/mail/:mailId'> */}
      {/* </Link> */}
      {/* </Route> */}
      {/* <Route path='/mail/:mailId' element={<EmailDetails />} /> */}
      {/* </Routes> */}
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
          // path={`/mail/${folder.current}`}
          mailsList={mailsList}
          toggleFavorite={toggleFavorite}
          toggleRead={toggleRead}
          moveToTrash={moveToTrash}
          folder={folder}
          removeFromTrash={removeFromTrash}
          openMail={openMail}
        />
      )}
      <EmailCompose
        mailsList={mailsList}
        setMails={setMails}
        emailComposeRef={emailComposeRef}
        toggleCompose={toggleCompose}
      />
      {/* <EmailDetails /> */}
      {/* <Outlet /> */}
    </section>
  )
}
