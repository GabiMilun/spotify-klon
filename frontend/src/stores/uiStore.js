import { makeAutoObservable } from 'mobx'

class UIStore {
  libraryCreateOpen = false
  searchQuery = ''

  constructor() {
    makeAutoObservable(this)
  }

  setSearchQuery(query) {
    this.searchQuery = query
  }

  toggleLibraryCreate() {
    this.libraryCreateOpen = !this.libraryCreateOpen
  }

  closeLibraryCreate() {
    this.libraryCreateOpen = false
  }
}

export default new UIStore()
