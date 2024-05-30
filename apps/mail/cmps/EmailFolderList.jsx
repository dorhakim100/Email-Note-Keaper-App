import { storageService } from '../../../services/async-storage.service.js'
import { mailService } from '../services/mail.service.js'

import { MailFolder } from '../cmps/MailFolder.jsx'

const { useRef, useEffect, useState } = React
const { Link, Outlet } = ReactRouterDOM

const { useParams, useNavigate } = ReactRouter

export function EmailFolderList({
  mailsList,
  emailComposeRef,
  toggleCompose,
  changeFolder,
  folder,
}) {
  const params = useParams()
  const navigate = useNavigate()

  const [notReadCounter, setNotReadCounter] = useState(0)
  let counter = 0

  const folders = [
    {
      name: 'received',
      icon: 'fa-inbox',
    },
    {
      name: 'favorite',
      icon: 'fa-star',
    },
    {
      name: 'sent',
      icon: 'fa-paper-plane',
    },
    {
      name: 'draft',
      icon: 'fa-file',
    },
    {
      name: 'trash',
      icon: 'fa-trash',
    },
  ]

  useEffect(() => {
    storageService
      .query(mailService.MAIL_KEY)
      .then((mails) => {
        mails.forEach((mail) => {
          if (!mail.isRead && !mail.isTrash && !mail.isDraft && !mail.isSent)
            counter++
          setNotReadCounter(counter)
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }, [mailsList])

  function onChangeFolder({ target }) {
    let folderToChange = target.dataset.folder
    if (!folderToChange) folderToChange = 'received'

    changeFolder(folderToChange)
  }

  return (
    <div className='nav-bar-container'>
      {/* <Link to={`/mail/${folder.current}/compose`}> */}
      <div onClick={toggleCompose} className='folder compose'>
        <i className='fa-solid fa-pencil'></i>
        <h3 className='nav-text'>New Email</h3>
      </div>
      {/* </Link> */}

      {folders.map((folderObject) => {
        return (
          <Link to={`/mail/${folder.current}`} key={folderObject.name}>
            <MailFolder
              key={folderObject.name}
              onChangeFolder={onChangeFolder}
              name={folderObject.name}
              icon={folderObject.icon}
              activeFolder={folder}
              notReadCounter={notReadCounter}
            />
          </Link>
        )
      })}
    </div>
  )
}
