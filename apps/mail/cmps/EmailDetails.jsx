const { useState, useEffect, useRef } = React

const { Link, Outlet } = ReactRouterDOM

const { useParams, useNavigate } = ReactRouter

const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { mailService } from '../services/mail.service.js'
import { ButtonsController } from './ButtonsController.jsx'
import { DetailsEditButtons } from './DetailsEditButtons.jsx'

export function EmailDetails({
  mailId,
  folder,
  toggleFavorite,
  toggleRead,
  moveToTrash,
  removeFromTrash,
}) {
  const [mail, setMail] = useState(null)

  const params = useParams()
  const navigate = useNavigate()

  console.log(folder)
  mailService.get(mailId).then((mail) => {
    // console.log(mail)
    setMail(mail)
  })

  return (
    <React.Fragment>
      <div className='email-details-container'>
        {!mail && <p>Loading...</p>}
        {mail && (
          <div className='email-details'>
            <ButtonsController setMail={setMail} folder={folder} />
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
            <p>{mail.body}</p>
          </div>
        )}
      </div>
    </React.Fragment>
  )
}
