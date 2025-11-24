import './SearchBar.scss'
import { MagnifyingGlass, Browsers } from '@phosphor-icons/react'
import { useRef } from 'react'

const SearchBar = ({ placeholder = 'What do you want to play?', value, onChange }) => {
  const inputRef = useRef(null)

  const handleSearchIconClick = () => {
    inputRef.current?.focus()
  }

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
        value={value}
        onChange={onChange}
      />
      <div className="browse-icon">
        <Browsers size={24} weight="light" />
      </div>
    </div>
  )
}

export default SearchBar
