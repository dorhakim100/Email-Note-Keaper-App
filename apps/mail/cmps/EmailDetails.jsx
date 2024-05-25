const { useState, useEffect, useRef } = React

const { Link, Outlet } = ReactRouterDOM

const { useParams, useNavigate } = ReactRouter

const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { mailService } from '../services/mail.service.js'

export function EmailDetails() {
  console.log('works')
  const [mail, setMail] = useState(null)

  const params = useParams()
  const navigate = useNavigate()
  mailService.get(params.mailId).then((mail) => {
    console.log(mail)
    console.log(params.mailId)
  })
  useEffect(() => {
    console.log('works')
    mailService.get(params.mailId).then((mail) => {
      console.log('mail:', mail)
      setMail(mail)
    })
    // mailService
    //   .get(params.mailId)
    //   .then((mail) => {
    //     console.log('works')
    //     setMail(mail)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //     navigate('/mail')
    //   })
    //   .finally(() => {})
  }, [params.mailId])

  return (
    <React.Fragment>
      <div className='email-details'>
        <h2>bla</h2>
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
