export function DetailsEditButtons({
  mail,
  folder,
  toggleFavorite,
  toggleRead,
  moveToTrash,
  removeFromTrash,
}) {
  function onToggleFavorite({ target }) {
    toggleFavorite(target.dataset.id)
  }

  function onReadMail(id) {
    toggleRead(id)
  }

  function onMoveToTrash(id) {
    moveToTrash(id)
  }

  function onRemoveFromTrash(id) {
    removeFromTrash(id)
  }

  return (
    <div className='edit-mail'>
      <i
        data-id={mail.id}
        className={`fa-solid fa-star ${mail.isFavorite ? ` favorite` : ``}`}
        onClick={onToggleFavorite}
      ></i>
      <i
        className='fa-solid fa-trash'
        onClick={() => onMoveToTrash(mail.id)}
      ></i>
      {folder.current === 'trash' && (
        <i
          className='fa-solid fa-rotate-left'
          onClick={() => onremoveFromTrash(mail.id)}
        ></i>
      )}
      <i
        className={`fa-regular ${
          (mail.isRead && 'fa-envelope') ||
          (mail.isRead === false && 'fa-envelope-open')
        }`}
        onClick={() => onReadMail(mail.id)}
      ></i>
    </div>
  )
}
