import './Home.scss'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Plus  } from '@phosphor-icons/react'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
function Home() {
  const [openPopup, setOpenPopup] = useState(false)
  return (
    <>
      <div className="wrapper">
        <Navbar />
        <div className='main-content'>

          <div className="content-left">
            <div className="content-left-top">
              <h3>Your library</h3>

              <a href=""><Plus size={20} weight="light" /></a>
            </div>
            <div className="content-left-main">
              <div className='main-child'>
                <div className="child-top">
                  <h4>Create your first playlist</h4>
                  <p>It's easy, we'll help you</p>
                </div>
                <div className="child-bottom">
                  <a href="#" onClick={(event) => {
                    event.preventDefault()
                    setOpenPopup(true)
                  }}>Create playlist</a>
                </div>
              </div>
              <div className='main-child'>
                <div className="child-top">
                  <h4>Let's find some podcasts to follow</h4>
                  We'll keep you updated on new episodes
                </div>
                
                <div className="child-bottom">
                  <a href="#" onClick={(event) => event.preventDefault()}>Browse podcasts</a>
                </div>
              </div>
                
              
            </div>
            <div className="content-left-footer">
              <ul>
                <li>Legal</li>
                <li>Safety & Privacy Center</li>
                <li>Privacy Policy</li>
                <li>Cookie Settings</li>
                <li>About Ads</li>
                <li>Accessibility</li>
              </ul>
            </div>
          </div>

          <div className="content-right">
            <Outlet />
          </div>

        {openPopup && (
          <div className="playlist-popup">
            <div className="playlist-popup__header">
              <h3>Create a playlist</h3>
              <p>Log in to create and share playlists.</p>
            </div>
            <div className="playlist-popup__actions">
              <a href="#" onClick={(event) => {
                event.preventDefault()
                setOpenPopup(false)
              }}>Not now</a>
              <a href="#" onClick={(event) => event.preventDefault()}>Log in</a>
            </div>
          </div>
        )}

      </div>
        <Footer />
      </div>
    </>
  )
}

export default Home
