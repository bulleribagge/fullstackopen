import React from 'react'

const Search = ({ searchTerm, handleSearchTermChange }) => (
    <div>
        <input type="text" value={searchTerm} onChange={(e) => handleSearchTermChange(e)}/>
    </div>
)

export default Search
