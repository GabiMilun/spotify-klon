import { makeAutoObservable } from 'mobx'

class PlaylistStore {
  playlists = []

  constructor() {
    makeAutoObservable(this)
    this.loadPlaylists()
  }

  loadPlaylists() {
    const stored = localStorage.getItem('user_playlists')
    if (stored) {
      this.playlists = JSON.parse(stored)
    } else {
        this.playlists = [] // jos ih nema
    }
  }

  createPlaylist(name = 'My Playlist') {
    const newPlaylist = {
      id: Date.now(),
      name: name,
      description: 'Created by you',
      image: null, 
      tracks: []
    }
    this.playlists.push(newPlaylist)
    this.savePlaylists()
  }

  savePlaylists() {
    localStorage.setItem('user_playlists', JSON.stringify(this.playlists))
  }
  
  get myPlaylists() {
      return this.playlists
  }
}

const playlistStore = new PlaylistStore()
export default playlistStore
