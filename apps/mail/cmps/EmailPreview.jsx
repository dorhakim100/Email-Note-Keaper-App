const { useRef } = React

import { PreviewEditController } from './PreviewEditController.jsx'

export function EmailPreview({
  mail,
  toggleFavorite,
  toggleRead,
  moveToTrash,
  folder,
  removeFromTrash,
  openMail,
}) {
  let isEdit = false
  const edit = useRef()

  function onToggleFavorite(id, e) {
    // e.preventDefault()
    toggleFavorite(e.target.dataset.id)
  }

  function onOpenMail(id, e) {
    console.log(isEdit)
    if (isEdit) return
    if (edit.current) return

    // e.preventDefault()
    console.log(e.target)
    openMail(id)
    // e.target.addEventListener('onclick', console.log(id))
    // e.target.addEventListener('click', openMail(id))
  }

  return (
    <div
      className={`mail-container ${mail.isRead && 'read'}`}
      onClick={(event) => {
        // isEdit = false
        onOpenMail(mail.id, event)
      }}
    >
      <i
        data-id={mail.id}
        className={`fa-solid fa-star ${mail.isFavorite ? ` favorite` : ``}`}
        onClick={(event) => {
          isEdit = true
          onToggleFavorite(mail.id, event)
        }}
      ></i>

      {(mail.isSent && (
        <h2>
          <span>To: </span>
          {mail.to}
        </h2>
      )) || <h2>{mail.from}</h2>}

      <h3>{mail.subject}</h3>
      <p className='preview-body'>
        {(mail.body.length > 50 && mail.body) || mail.body}
      </p>
      <p className='time-container'>{mail.timeStr}</p>
      <PreviewEditController
        mail={mail}
        toggleFavorite={toggleFavorite}
        toggleRead={toggleRead}
        moveToTrash={moveToTrash}
        folder={folder}
        removeFromTrash={removeFromTrash}
        edit={edit}
      />
    </div>
  )
}
