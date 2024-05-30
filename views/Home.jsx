const { useEffect } = React

export function Home({ logo, setLogo }) {
  useEffect(() => {
    logo = { name: 'Home', src: '../Icons-SVG/home.svg' }
    setLogo(logo)
  }, [])
  return (
    <section className='home'>
      <h1>Welcome to home page!</h1>
      <p>This is ann app that integrates between mail and notes keeper</p>
    </section>
  )
}
