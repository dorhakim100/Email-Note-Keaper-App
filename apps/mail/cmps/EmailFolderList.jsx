import { storageService } from '../../../services/async-storage.service.js'

export function EmailFolderList({
  mailsList,
  emailComposeRef,
  toggleCompose,
  changeFolder,
}) {
  function onChangeFolder({ target }) {
    const folder = target.dataset.folder
    console.log(folder)
    console.log(mailsList)
    changeFolder(folder)
  }

  return (
    <div className='nav-bar-container'>
      <div onClick={toggleCompose}>
        <i className='fa-solid fa-pencil'></i>
        <h3 className='nav-text'>New Email</h3>
      </div>

      <div onClick={onChangeFolder} data-folder='received'>
        <i className='fa-solid fa-inbox' data-folder='received'></i>
        <h3 className='nav-text' data-folder='received'>
          Received
        </h3>
      </div>
      <div onClick={onChangeFolder} data-folder='favorite'>
        <i className='fa-regular fa-star' data-folder='favorite'></i>
        <h3 className='nav-text' data-folder='favorite'>
          Favorite
        </h3>
      </div>

      <div onClick={onChangeFolder} data-folder='sent'>
        <i className='fa-regular fa-paper-plane' data-folder='sent'></i>
        <h3 className='nav-text' data-folder='sent'>
          Sent
        </h3>
      </div>

      <div onClick={onChangeFolder} data-folder='draft'>
        <i className='fa-regular fa-file' data-folder='draft'></i>
        <h3 className='nav-text' data-folder='draft'>
          Draft
        </h3>
      </div>

      <div onClick={onChangeFolder} data-folder='trash'>
        <i className='fa-solid fa-trash' data-folder='trash'></i>
        <h3 className='nav-text' data-folder='trash'>
          Trash
        </h3>
      </div>
    </div>
  )
}
