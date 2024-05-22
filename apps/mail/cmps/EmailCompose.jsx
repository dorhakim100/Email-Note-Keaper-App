export function EmailCompose({
  mailList,
  setMails,
  emailComposeRef,
  toggleCompose,
}) {
  return (
    <section className='email-compose-container' ref={emailComposeRef}>
      <div className='compose-header-container' onClick={toggleCompose}>
        <h2>New Message</h2>
        <i className='fa-solid fa-xmark x-btn'></i>
      </div>
      <div className='inputs-container'>
        <div className='from-container'>
          <label htmlFor='from'>From</label>
          <input type='text' id='from' />
        </div>
        <div className='to-container'>
          <label htmlFor='to'>To</label>
          <input type='text' id='to' />
        </div>
        <div className='subject-container'>
          <label htmlFor='subject'>Subject</label>
          <input type='text' id='subject' />
        </div>

        <textarea
          className='body-input'
          name='txt'
          cols='50'
          rows='20'
        ></textarea>
      </div>

      <button className='send-btn'>Send</button>
    </section>
  )
}
