export function EmailPreview({ mail, toggleFavorite, toggleRead }) {
  function onToggleFavorite({ target }) {
    toggleFavorite(target.dataset.id)
  }

  function onReadMail(id) {
    console.log(mail.isRead)
    toggleRead(id)
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
        <i className='fa-solid fa-trash'></i>
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
