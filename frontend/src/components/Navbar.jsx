import './Navbar.scss'
import { MagnifyingGlass, House, SpotifyLogo, DownloadSimple  } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="navbar-left">
            
            <Link to="/" className="left-left">
                <SpotifyLogo size={34} weight='fill' color='#FFFFFF'/>
            </Link>
            <div className="left-right">
                <div className="home-icon">
                    <House size={24} weight='fill' color='white'/>
                </div>
                <div className="search-container">
                    <SearchBar placeholder="Search.." />
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
                    <li className="install-button"><button type="button"><DownloadSimple size={20} weight='fill' color='white'/>Install App</button></li>
                    <li className="signup"><Link to="/register">Sign up</Link></li>
                    <li><Link to="/login">Log in</Link></li>
                </ul>
            </div>
            
        </div>
      </div>
    </>
  )
}

export default Navbar
