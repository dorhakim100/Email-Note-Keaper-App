const { useNavigate } = ReactRouterDOM
const { useEffect } = React
export function Home({ logo, setLogo }) {
  const navigate = useNavigate()
  useEffect(() => {
    logo = {
      name: 'Home',
      src: './Icons-SVG/home.svg',
    }
    setLogo(logo)
  }, [])
  // setLogo(logo)
  return (
    <section className='home'>
      <div className='home-content'>
        <h1>Welcome to Appsus!</h1>
        <div className='description'>
          <h2>About Appsus</h2>
          <p>
            Appsus is an integrated application that seamlessly combines the
            functionality of a note-taking app and an email client, offering
            users a unified platform for productivity and communication.
          </p>
        </div>
        <div className='features'>
          <h2>Main Features</h2>
          <ul>
            <li>
              Email App:
              <ul>
                <li>
                  Compose, send, receive, and organize emails efficiently.
                </li>
                <li>
                  Support for email attachments and rich text formatting
                  enhances communication flexibility.
                </li>
                <li>Emails can be categorized and managed with ease.</li>
              </ul>
            </li>
            <li>
              Note App:
              <ul>
                <li>Users can create and edit notes effortlessly.</li>
                <li>
                  Various note types are supported, including text notes, to-do
                  lists, images, YouTube videos, and SoundCloud audio.
                </li>
                <li>
                  Notes can be customized with different colors and styles for
                  easy categorization.
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className='user-experience'>
          <h2>User Experience</h2>
          <p>
            Appsus provides a cohesive user experience by integrating both
            note-taking and email functionalities into a single application.
            Users can switch seamlessly between managing personal notes and
            handling emails.
          </p>
        </div>
        <div className='conclusion'>
          <h2>Conclusion</h2>
          <p>
            Appsus aims to streamline users' daily productivity and
            communication needs by offering a versatile platform that combines
            the power of a note-taking app with the convenience of a robust
            email client. Whether managing personal tasks, jotting down ideas,
            or staying connected through emails, Appsus provides the tools
            necessary to enhance efficiency and organization in both personal
            and professional contexts.
          </p>
        </div>
        <div className='navigation-buttons'>
          <button onClick={() => navigate('/mail')}>Go to Mail App</button>
          <button onClick={() => navigate('/note')}>Go to Note App</button>
        </div>
      </div>
    </section>
  )
}
