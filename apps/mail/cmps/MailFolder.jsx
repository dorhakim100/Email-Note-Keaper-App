const { Link } = ReactRouterDOM

const { useState, useEffect, useRef } = React
const { useParams, useNavigate } = ReactRouter

export function MailFolder({ onChangeFolder, name, icon, activeFolder }) {
  return (
    // <Link to={`/mail/${activeFolder.current}`}>
    <div
      onClick={onChangeFolder}
      data-folder={name}
      className={`folder ${activeFolder.current === name && ' active-folder'}`}
    >
      <i className={`fa-solid ${icon}`} data-folder={name}></i>
      <h3 className='nav-text' data-folder={name}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h3>
    </div>
    // </Link>
  )
}