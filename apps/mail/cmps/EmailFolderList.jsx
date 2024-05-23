import { storageService } from '../../../services/async-storage.service.js'

import { MailFolder } from '../cmps/MailFolder.jsx'

const { useRef } = React

export function EmailFolderList({
  mailsList,
  emailComposeRef,
  toggleCompose,
  changeFolder,
  folder,
}) {
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
    folder.current = folderToChange
    changeFolder(folderToChange)
  }
  console.log(folder)

  return (
    <div className='nav-bar-container'>
      <div onClick={toggleCompose} className='folder'>
        <i className='fa-solid fa-pencil'></i>
        <h3 className='nav-text'>New Email</h3>
      </div>

      {folders.map((folderObject) => {
        return (
          <MailFolder
            key={folderObject.name}
            onChangeFolder={onChangeFolder}
            name={folderObject.name}
            icon={folderObject.icon}
            activeFolder={folder}
          />
        )
      })}
    </div>
  )
}
