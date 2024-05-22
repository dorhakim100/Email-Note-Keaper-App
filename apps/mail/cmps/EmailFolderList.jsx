import { storageService } from '../../../services/async-storage.service.js'

const { useRef } = React

export function EmailFolderList({
  mailsList,
  emailComposeRef,
  toggleCompose,
  changeFolder,
  folder,
}) {
  function onChangeFolder({ target }) {
    const folder = target.dataset.folder

    changeFolder(folder)
  }
  console.log(folder)

  return (
    <div className='nav-bar-container'>
      <div onClick={toggleCompose} className='folder'>
        <i className='fa-solid fa-pencil'></i>
        <h3 className='nav-text'>New Email</h3>
      </div>

      <div
        onClick={onChangeFolder}
        data-folder='received'
        className={`folder active-folder`}
      >
        <i className='fa-solid fa-inbox' data-folder='received'></i>
        <h3 className='nav-text' data-folder='received'>
          Received
        </h3>
      </div>
      <div onClick={onChangeFolder} data-folder='favorite' className='folder'>
        <i className='fa-regular fa-star' data-folder='favorite'></i>
        <h3 className='nav-text' data-folder='favorite'>
          Favorite
        </h3>
      </div>

      <div onClick={onChangeFolder} data-folder='sent' className='folder'>
        <i className='fa-regular fa-paper-plane' data-folder='sent'></i>
        <h3 className='nav-text' data-folder='sent'>
          Sent
        </h3>
      </div>

      <div onClick={onChangeFolder} data-folder='draft' className='folder'>
        <i className='fa-regular fa-file' data-folder='draft'></i>
        <h3 className='nav-text' data-folder='draft'>
          Draft
        </h3>
      </div>

      <div onClick={onChangeFolder} data-folder='trash' className='folder'>
        <i className='fa-solid fa-trash' data-folder='trash'></i>
        <h3 className='nav-text' data-folder='trash'>
          Trash
        </h3>
      </div>
    </div>
  )
}
