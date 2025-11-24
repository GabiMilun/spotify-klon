import './SearchBar.scss'
import { MagnifyingGlass, Browsers } from '@phosphor-icons/react'
import { useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import uiStore from '../stores/uiStore'

const SearchBar = observer(({ placeholder = 'What do you want to play?' }) => {
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const { query } = useParams()
  const searchQuery = uiStore.searchQuery

  useEffect(() => {
    if (document.activeElement !== inputRef.current) {
      uiStore.setSearchQuery(query || '')
    }
  }, [query])

  const handleSearchIconClick = () => {
    inputRef.current?.focus()
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    uiStore.setSearchQuery(value)
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        if (searchQuery !== query) {
          navigate(`/search/${encodeURIComponent(searchQuery)}`)
        }
      } else if (searchQuery === '' && query) {
        navigate('/')
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchQuery, navigate, query])

  return (
    <div className="search-bar-container">
      <div className="search-icon" onClick={handleSearchIconClick}>
        <MagnifyingGlass size={24} weight="light" />
      </div>
      <input
        ref={inputRef}
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleInputChange}
      />
      <div className="browse-icon">
        <Browsers size={24} weight="light" />
      </div>
    </div>
  )
})

export default SearchBar
