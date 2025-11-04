import './Navbar.scss'
import { MagnifyingGlass, House, SpotifyLogo, DownloadSimple  } from '@phosphor-icons/react'

function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="navbar-left">
            
            <div className="left-left">
                <SpotifyLogo size={34} weight='fill' color='white'/>
            </div>
            <div className="left-right">
                <div className="home-icon">
                    <House size={24} weight='fill' color='white'/>
                </div>
                <div className="search-container">
                    {/* <MagnifyingGlass size={34} /> */}
                    <input type="text" placeholder="Search.."></input>
                </div>
            </div>
            
        </div>
        <div className="navbar-right">
            <div className="right-left">
            <ul>
                <li>Premium</li>
                <li>Support</li>
                <li>Download</li>
            </ul>
            </div>
            <div className="right-right">
                <ul>
                    <li><DownloadSimple size={20} weight='fill' color='white'/>Install App</li>
                    <li className="signup">Sign up</li>
                    <li>Log in</li>
                </ul>
            </div>
            
        </div>
      </div>
    </>
  )
}

export default Navbar
