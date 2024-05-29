const { useState, useEffect } = React

const { Link, Outlet } = ReactRouterDOM
export function About() {
  return (
    <section className='about'>
      <h1>About Page</h1>
      <nav>
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
