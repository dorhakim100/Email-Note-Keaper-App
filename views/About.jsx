const { useState, useEffect } = React

const { Link, Outlet } = ReactRouterDOM
export function About({ logo, setLogo }) {
  useEffect(() => {
    logo = {
      name: 'Home',
      src: './Icons-SVG/home.svg',
    }
    setLogo(logo)
  }, [])
  return (
    <section className='about'>
      <h1>About Page</h1>
      <nav className='about-nav-container'>
        <Link replace to='/about/team'>
          Team
        </Link>
        <Link replace to='/about/vision'>
          Vision
        </Link>
      </nav>
      <Outlet />
    </section>
  )
}
