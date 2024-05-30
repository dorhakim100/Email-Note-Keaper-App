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
    toggleFavorite(e.target.dataset.id)
  }

  function onOpenMail(id, e) {
    if (isEdit) return
    if (edit.current) return

    openMail(id)
  }

  return (
    <div
      className={`mail-container ${(mail.isRead && 'read') || 'not-read'}`}
      onClick={(event) => {
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
        <h3>
          <span>To: </span>
          {mail.to}
        </h3>
      )) || <h3>{mail.from}</h3>}

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
