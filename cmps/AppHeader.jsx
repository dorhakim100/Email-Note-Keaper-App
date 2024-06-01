const { Link, NavLink } = ReactRouterDOM
const { useRef, useState, useEffect } = React

export function AppHeader({ logo }) {
  const [isHidden, setIsHidden] = useState(useRef(true))

  function onToggleNavMenu() {
    if (isHidden.current) {
      isHidden.current = false
      setIsHidden({ isHidden, current: false })
    } else {
      isHidden.current = true
      setIsHidden({ isHidden, current: true })
    }
  }

  return (
    <React.Fragment>
      <header className='app-header'>
        <Link to='/'>
          <div className='logo-container'>
            <img className='logo' src={logo.src} alt='' />
            <h3>{logo.name}</h3>
          </div>
        </Link>
        <i className='fa-solid fa-grip menu-btn' onClick={onToggleNavMenu}></i>
      </header>
      <nav className={`nav-menu ${isHidden.current && `hidden`}`}>
        <NavLink to='/'>
          <img
            className='icon'
            src='Icons-SVG/home.svg'
            alt=''
            onClick={onToggleNavMenu}
          />
        </NavLink>
        <NavLink to='/about'>
          <img
            className='icon'
            src='Icons-SVG/about.svg'
            alt=''
            onClick={onToggleNavMenu}
          />
        </NavLink>
        <NavLink to='/mail'>
          <img
            className='icon'
            src='Icons-SVG/gmail.svg'
            alt=''
            onClick={onToggleNavMenu}
          />
        </NavLink>
        <NavLink to='/note'>
          <img
            className='icon'
            src='Icons-SVG/note.svg'
            alt=''
            onClick={onToggleNavMenu}
          />
        </NavLink>
      </nav>
    </React.Fragment>
  )
}
