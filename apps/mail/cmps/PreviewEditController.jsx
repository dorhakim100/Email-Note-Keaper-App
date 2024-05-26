export function PreviewEditController({
  toggleRead,
  moveToTrash,
  removeFromTrash,
  folder,
  mail,
  edit,
}) {
  let isEdit = false

  function onReadMail(id) {
    toggleRead(id).then(() => {
      edit.current = false
    })
  }

  function onMoveToTrash(id) {
    moveToTrash(id).then(() => {
      edit.current = false
    })
  }

  function onRemoveFromTrash(id) {
    removeFromTrash(id).then(() => {
      edit.current = false
    })
  }

  return (
    <div className='edit-mail'>
      <i
        className='fa-solid fa-trash'
        onClick={(event) => {
          edit.current = true
          onMoveToTrash(mail.id, event)
        }}
      ></i>
      {folder.current === 'trash' && (
        <i
          className='fa-solid fa-rotate-left'
          onClick={(event) => {
            edit.current = true
            onRemoveFromTrash(mail.id, event)
          }}
        ></i>
      )}
      <i
        className={`fa-regular ${
          (mail.isRead && 'fa-envelope') ||
          (mail.isRead === false && 'fa-envelope-open')
        }`}
        onClick={(event) => {
          edit.current = true
          onReadMail(mail.id, event)
        }}
      ></i>
    </div>
  )
}
