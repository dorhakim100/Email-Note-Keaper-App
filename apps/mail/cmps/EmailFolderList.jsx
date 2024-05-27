import { storageService } from '../../../services/async-storage.service.js'

import { MailFolder } from '../cmps/MailFolder.jsx'

const { useRef, useEffect } = React
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

  let notReadCounter = 0

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

  console.log(mailsList)
  useEffect(() => {}, [])
  mailsList.forEach((mail) => {
    if (!mail.isRead && !mail.isTrash) notReadCounter++
  })

  console.log(notReadCounter)

  function onChangeFolder({ target }) {
    const folderToChange = target.dataset.folder
    // console.log(folderToChange)
    // folder.current = folderToChange
    // navigate(`/mail/${folderToChange}`)
    changeFolder(folderToChange)
  }
  console.log(folder)

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
          <Link to={`/mail/${folder.current}`}>
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
