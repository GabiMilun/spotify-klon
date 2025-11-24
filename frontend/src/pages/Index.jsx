import './Index.scss'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { House, SpotifyLogo, User, Plus } from '@phosphor-icons/react'
import uiStore from '../stores/uiStore'
import SearchBar from '../components/SearchBar'
import Trending from '../components/Trending'
import SearchResults from '../components/SearchResults'

const Index = observer(() => {
  const { query } = useParams();

  return (
    <div className='index-wrapper'>
      <div className="index-navbar">
            <div className="navbar-left">
                <SpotifyLogo size={58} weight='fill' color='#FFFFFF'/>
            </div>
            <div className="navbar-center">
                <div className='center-ikonica'><House size={34} weight='fill' color='white'/></div>

                <SearchBar placeholder="Search.." />
            </div>
            <div className="navbar-right">
                <User size={34} color="#ffffff" weight="thin" />
            </div>
      </div>
        <div className="index-main-content">
            <div className="index-left-sidebar">
              <div className="index-left-sidebar__header">
                <p className="sidebar-title">Library</p>
                <button
                  type="button"
                  className={`sidebar-create${uiStore.libraryCreateOpen ? ' is-open' : ''}`}
                  onClick={() => uiStore.toggleLibraryCreate()}
                  aria-expanded={uiStore.libraryCreateOpen}
                >
                  <span className="sidebar-create__icon">
                    <Plus size={18} weight='bold' />
                  </span>
                  <span className="sidebar-create__text">Create</span>
                </button>
              </div>

              {uiStore.libraryCreateOpen && (
                <div className="sidebar-popup">
                  <h3>Create a playlist?</h3>
                  <p>Do you want to create a new playlist right now?</p>
                  <div className="sidebar-popup__actions">
                    <button type="button" onClick={() => uiStore.closeLibraryCreate()}>Not now</button>
                    <button type="button" className="confirm" onClick={() => uiStore.closeLibraryCreate()}>Create playlist</button>
                  </div>
                </div>
              )}

            </div>
            <div className="index-middle-bar">
                {query ? <SearchResults query={query} /> : <Trending />}
            </div>
            <div className="index-right-sidebar">

            </div>
        </div>
        <div className="index-footer">

        </div>
    </div>
  )
})

export default Index
