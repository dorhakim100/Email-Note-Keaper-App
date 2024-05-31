const { useRef } = React
const { useParams, useNavigate } = ReactRouter

import { PreviewEditController } from './PreviewEditController.jsx'

export function EmailPreview({
  mail,
  toggleFavorite,
  toggleRead,
  moveToTrash,
  folder,
  removeFromTrash,
  openMail,
  toggleCompose,
  setCompose,
  searchParams,
  setSearchParams,
  compose,
  removeFromDraft,
  mailsList,
  editMail,
}) {
  let isEdit = false
  const edit = useRef()

  const navigate = useNavigate()

  function onToggleFavorite(id, e) {
    toggleFavorite(e.target.dataset.id)
  }

  function onOpenMail(id, e) {
    if (isEdit) return
    if (edit.current) return

    openMail(id)
  }

  function onEditMail(e) {
    const id = e.target.dataset.id
    // const mail = mailsList.find((mail) => mail.id === id)
    // removeFromDraft(id)
    // toggleCompose()
    // compose.to = mail.to
    // compose.subject = mail.subject
    // compose.body = mail.body
    // setCompose(compose)
    // navigate(
    //   `/mail/draft?to=${compose.to}&subject=${compose.subject}&body=${compose.body}`
    // )
    editMail(id)
  }

  return (
    <div
      className={`mail-container ${(mail.isRead && 'read') || 'not-read'}`}
      onClick={(event) => {
        onOpenMail(mail.id, event)
      }}
    >
      <div className='edit-container'>
        <i
          data-id={mail.id}
          className={`fa-solid fa-star ${mail.isFavorite ? ` favorite` : ``}`}
          onClick={(event) => {
            isEdit = true
            onToggleFavorite(mail.id, event)
          }}
        ></i>
        {folder.current === 'draft' && (
          <i
            data-id={mail.id}
            onClick={(event) => {
              isEdit = true
              onEditMail(event)
            }}
            className='fa-solid fa-pen-to-square'
          ></i>
        )}
      </div>

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
      <img className='preview-pic' src={mail.profilePic} alt='' />
    </div>
  )
}
