import './Navbar.scss'
import { MagnifyingGlass, User } from '@phosphor-icons/react'

function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="navbar-left">
            <div className="search-container">
                <MagnifyingGlass size={20} />
                <input type="text" placeholder="Search.."></input>
            </div>
        </div>
        <div className="navbar-right">

        </div>
      </div>
    </>
  )
}

export default Navbar
