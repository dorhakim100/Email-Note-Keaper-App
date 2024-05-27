const { useState, useEffect, useRef } = React

const { Link, Outlet } = ReactRouterDOM

const { useParams, useNavigate } = ReactRouter

const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { mailService } from '../services/mail.service.js'
import { ButtonsController } from './ButtonsController.jsx'
import { DetailsEditButtons } from './DetailsEditButtons.jsx'
import { storageService } from '../../../services/async-storage.service.js'

export function EmailDetails({
  mailId,
  folder,
  toggleFavorite,
  toggleRead,
  moveToTrash,
  removeFromTrash,
  newMails,
  setNextPrevMailId,
}) {
  const [mail, setMail] = useState(null)

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    mailService
      .get(mailId)
      .then((mail) => {
        const nextPrevMail = setNextPrevMailId(mail, folder).then((mail) => {
          setMail(mail)
        })
      })
      .catch((err) => {
        console.log(err)
        navigate(`/mail/${folder.current}`)
      })
      .finally(() => {
        console.log('changed')
      })
  }, [params.mailId])

  return (
    <React.Fragment>
      <div className='email-details-container'>
        {!mail && <p>Loading...</p>}
        {mail && (
          <div className='email-details'>
            <ButtonsController setMail={setMail} folder={folder} mail={mail} />
            <div className='details-header-container'>
              <h2>{mail.subject}</h2>
              <DetailsEditButtons
                toggleFavorite={toggleFavorite}
                toggleRead={toggleRead}
                moveToTrash={moveToTrash}
                removeFromTrash={removeFromTrash}
                mail={mail}
                folder={folder}
              />
            </div>
            <div className='sender-info'>
              <h3>{mail.from}</h3>
            </div>
            <p>{mail.body}</p>
          </div>
        )}
      </div>
    </React.Fragment>
  )
}
