export function EmailPreview({ mail, toggleFavorite }) {
  function onToggleFavorite({ target }) {
    toggleFavorite(target.dataset.id)
  }

  return (
    <div className='mail-container'>
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
      <p>{mail.timeStr}</p>
    </div>
  )
}
