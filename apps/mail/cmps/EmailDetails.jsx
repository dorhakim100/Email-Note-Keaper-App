const { useState, useEffect, useRef } = React

const { Link, Outlet } = ReactRouterDOM

const { useParams, useNavigate } = ReactRouter

const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { mailService } from '../services/mail.service.js'

export function EmailDetails({
  mailId,
  folder,
  toggleFavorite,
  toggleRead,
  moveToTrash,
  removeFromTrash,
}) {
  const [mail, setMail] = useState(null)

  // console.log(mailId)
  mailService.get(mailId).then((mail) => {
    // console.log(mail)
    setMail(mail)
  })

  function onToggleFavorite({ target }) {
    toggleFavorite(target.dataset.id)
  }

  function onReadMail(id) {
    toggleRead(id)
  }

  function onMoveToTrash(id) {
    moveToTrash(id)
  }

  function onRemoveFromTrash(id) {
    removeFromTrash(id)
  }

  return (
    <React.Fragment>
      <div className='email-details-container'>
        {!mail && <p>Loading...</p>}
        {mail && (
          <div className='email-details'>
            <div className='details-header-container'>
              <h2>{mail.subject}</h2>
              <div className='edit-mail'>
                <i
                  data-id={mail.id}
                  className={`fa-solid fa-star ${
                    mail.isFavorite ? ` favorite` : ``
                  }`}
                  onClick={onToggleFavorite}
                ></i>
                <i
                  className='fa-solid fa-trash'
                  onClick={() => onMoveToTrash(mail.id)}
                ></i>
                {folder.current === 'trash' && (
                  <i
                    className='fa-solid fa-rotate-left'
                    onClick={() => onremoveFromTrash(mail.id)}
                  ></i>
                )}
                <i
                  className={`fa-regular ${
                    (mail.isRead && 'fa-envelope') ||
                    (mail.isRead === false && 'fa-envelope-open')
                  }`}
                  onClick={() => onReadMail(mail.id)}
                ></i>
              </div>
            </div>
            <p>{mail.body}</p>
          </div>
        )}
      </div>
      {/* <div className='button-container'>
        <Link to={`/mail/${mail.prevMailId}`}>
          <button className='btn'>Prev</button>
        </Link>
        <Link to={`/mail/${mail.mailMailId}`}>
          <button className='btn'>Next</button>
        </Link>
      </div> */}
    </React.Fragment>
  )
}
