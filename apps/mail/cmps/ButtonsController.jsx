const { useParams, useNavigate } = ReactRouter

import { mailService } from '../services/mail.service.js'

export function ButtonsController({ setMail, folder }) {
  const params = useParams()
  const navigate = useNavigate()

  function onChangeMail({ target }) {
    const navBtn = target.innerText
    switch (navBtn) {
      case '˃':
        mailService
          .get(mail.nextMailId)
          .then((mail) => {
            setMail(mail)
          })
          .catch((err) => {
            console.log(err)
            navigate(`/mail/${folder.current}`)
          })
          .finally(() => {
            console.log('changed')
          })
        break
      case '˂':
        mailService
          .get(mail.prevMailId)
          .then((mail) => {
            setMail(mail)
          })
          .catch((err) => {
            console.log(err)
            navigate(`/mail/${folder.current}`)
          })
          .finally(() => {
            console.log('changed')
          })
        break
    }
  }

  return (
    <div className='btn-container'>
      <button
        onClick={() => navigate(`/mail/${folder}`)}
        className='fa-solid fa-x'
      ></button>
      <div className='nav-btns'>
        <button onClick={onChangeMail}>˂</button>
        <button onClick={onChangeMail}>˃</button>
      </div>
    </div>
  )
}
