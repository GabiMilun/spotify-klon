import './Landing.scss'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { House, SpotifyLogo, User, Plus, MusicNote } from '@phosphor-icons/react'
import uiStore from '../stores/uiStore'
import playlistStore from '../stores/playlistStore'
import SearchBar from '../components/SearchBar'
import SearchResults from '../components/SearchResults'

const Landing = observer(() => {
  const { query } = useParams();

  const handleCreatePlaylist = () => {
    playlistStore.createPlaylist(`My Playlist #${playlistStore.myPlaylists.length + 1}`)
    uiStore.closeLibraryCreate()
  }

  return (
    <div className='index-wrapper'>
      <div className="index-navbar">
            <div className="navbar-left">
                <SpotifyLogo size={58} weight='fill' color='#FFFFFF'/>
            </div>
            <div className="navbar-center">
                <div className='center-ikonica'><House size={34} weight='fill' color='white'/></div>

                <SearchBar placeholder="What do you want to play?" basePath="/index/search" />
            </div>
            <div className="navbar-right">
                <User size={34} color="#ffffff" weight="thin" />
            </div>
      </div>
        <div className="index-main-content">
            <div className="index-left-sidebar">
              <div className="index-left-sidebar__header">
                <p className="sidebar-title">Your Library</p>
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
                    <button type="button" className="confirm" onClick={handleCreatePlaylist}>Create playlist</button>
                  </div>
                </div>
              )}

              <div className="sidebar-playlists">
                {playlistStore.myPlaylists.length === 0 ? (
                    <div className="empty-state">
                        <p>Create your first playlist</p>
                        <p className="sub-text">It's easy, we'll help you.</p>
                        <button onClick={handleCreatePlaylist}>Create playlist</button>
                    </div>
                ) : (
                    <ul className="playlist-list">
                        {playlistStore.myPlaylists.map(playlist => (
                            <li key={playlist.id} className="playlist-item">
                                <div className="playlist-icon">
                                    <MusicNote size={24} />
                                </div>
                                <div className="playlist-info">
                                    <p className="playlist-name">{playlist.name}</p>
                                    <p className="playlist-desc">Playlist • You</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
              </div>

            </div>
            <div className="index-middle-bar">
                {query ? (
                    <SearchResults />
                ) : (
                    <div className="my-playlists-grid">
                        <h2>Your Playlists</h2>
                        <div className="grid-container">
                            {playlistStore.myPlaylists.slice(0, 8).map(playlist => (
                                <div key={playlist.id} className="grid-item">
                                    <div className="grid-image">
                                        <MusicNote size={48} />
                                    </div>
                                    <p className="grid-title">{playlist.name}</p>
                                    <p className="grid-desc">By You</p>
                                </div>
                            ))}
                            {playlistStore.myPlaylists.length === 0 && (
                                <p>No playlists yet. Create one!</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className="index-right-sidebar">

            </div>
        </div>
        <div className="index-footer">

        </div>
    </div>
  )
})

export default Landing
