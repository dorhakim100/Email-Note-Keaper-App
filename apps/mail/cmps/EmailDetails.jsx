const { useState, useEffect, useRef } = React

const { Link, Outlet } = ReactRouterDOM

const { useParams, useNavigate } = ReactRouter

const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { mailService } from '../services/mail.service.js'
import { ButtonsController } from './ButtonsController.jsx'
import { DetailsEditButtons } from './DetailsEditButtons.jsx'
import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

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
    if (params.mailId === 'compose') return
    mailService
      .get(mailId)
      .then((mail) => {
        const nextPrevMail = setNextPrevMailId(mail, folder).then((mail) => {
          const date = new Date(mail.sentAt)

          const day = date.getDay()
          const month = date.getMonth()
          const monthName = utilService.getMonthName(date)
          const year = date.getFullYear()
          const hours = date.getHours()
          const minutes = date.getMinutes()

          const fullTimeStr = `${day} ${monthName} ${year}, ${hours}:${minutes}`
          mail.fullTimeStr = fullTimeStr
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
              <h2>
                {mail.subject}{' '}
                <span>
                  <Link to={`/mail/${folder}`}>{folder}</Link>
                </span>
              </h2>
              <p>{`${mail.fullTimeStr}`}</p>
            </div>
            <DetailsEditButtons
              toggleFavorite={toggleFavorite}
              toggleRead={toggleRead}
              moveToTrash={moveToTrash}
              removeFromTrash={removeFromTrash}
              mail={mail}
              folder={folder}
            />

            <img
              className='sender-info profile-pic'
              src={mail.profilePic}
              style={{ backgroundColor: mail.backgroundColor }}
              alt=''
            />
            <h3 className='sender-info name'>{mail.from}</h3>

            <p>{mail.body}</p>
          </div>
        )}
      </div>
    </React.Fragment>
  )
}
