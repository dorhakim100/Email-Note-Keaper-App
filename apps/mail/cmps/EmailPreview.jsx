export function EmailPreview({
  mail,
  toggleFavorite,
  toggleRead,
  moveToTrash,
  folder,
  removeFromTrash,
}) {
  console.log(folder)
  function onToggleFavorite({ target }) {
    toggleFavorite(target.dataset.id)
  }

  function onReadMail(id) {
    toggleRead(id)
  }

  function onMoveToTrash(id) {
    moveToTrash(id)
  }

  function onremoveFromTrash(id) {
    removeFromTrash(id)
  }

  return (
    <div className={`mail-container ${mail.isRead && 'read'}`}>
      <i
        data-id={mail.id}
        className={`fa-solid fa-star ${mail.isFavorite ? ` favorite` : ``}`}
        onClick={onToggleFavorite}
      ></i>
      <h2>
        {mail.isSent && <span>To: </span>}
        {mail.from}
      </h2>
      <h3>{mail.subject}</h3>
      <p>{mail.body}</p>
      <p className='time-container'>{mail.timeStr}</p>
      <div className='edit-mail'>
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
    </div>
  )
}
