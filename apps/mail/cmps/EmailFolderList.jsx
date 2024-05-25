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

  // console.log(params.folder)

  useEffect(() => {
    // navigate(`/mail/${folder.current}`)
    // changeFolder('received')
    console.log(params.folder)
  }, [params.folder])

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
      <Link to={`/mail/compose`}>
        <div onClick={toggleCompose} className='folder compose'>
          <i className='fa-solid fa-pencil'></i>
          <h3 className='nav-text'>New Email</h3>
        </div>
      </Link>

      {folders.map((folderObject) => {
        return (
          <Link to={`/mail/${folder.current}`}>
            <MailFolder
              key={folderObject.name}
              onChangeFolder={onChangeFolder}
              name={folderObject.name}
              icon={folderObject.icon}
              activeFolder={folder}
            />
          </Link>
        )
      })}
    </div>
  )
}
