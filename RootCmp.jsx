const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

const { useRef, useState, useEffect } = React

const { useParams, useNavigate } = ReactRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { About } from './views/About.jsx'
import { Home } from './views/Home.jsx'
import { MailIndex } from './apps/mail/views/MailIndex.jsx'
import { NoteIndex } from './apps/note/views/NoteIndex.jsx'

import { EmailCompose } from './apps/mail/cmps/EmailCompose.jsx'
import { MailList } from './apps/mail/cmps/MailList.jsx'
import { EmailDetails } from './apps/mail/cmps/EmailDetails.jsx'

import { UserMsg } from './cmps/UserMsg.jsx'
import { Team } from './cmps/Teams.jsx'
import { Vision } from './cmps/Vision.jsx'

export function App() {
  const [logo, setLogo] = useState({
    name: 'Home',
    src: './Icons-SVG/home.svg',
  })

  return (
    <Router>
      <section className='app'>
        <AppHeader logo={logo} setLogo={setLogo} />
        <Routes>
          <Route path='/' element={<Home logo={logo} setLogo={setLogo} />} />
          <Route
            path='/about'
            element={<About logo={logo} setLogo={setLogo} />}
          >
            <Route path='/about/team' element={<Team />} />
            <Route path='/about/vision' element={<Vision />} />
          </Route>
          <Route
            path='/mail'
            element={<MailIndex logo={logo} setLogo={setLogo} />}
          >
            <Route path='/mail/:folder' element={<MailList />}>
              <Route path='/mail/:folder/:mailId' element={<EmailDetails />} />
            </Route>
            {/* <Route path='/mail/compose' element={<EmailCompose />} /> */}
          </Route>
          <Route
            path='/note'
            element={<NoteIndex logo={logo} setLogo={setLogo} />}
          />
        </Routes>
      </section>
      <UserMsg />
    </Router>
  )
}
