import React from 'react'

const Filter = ({ searchTerm, handleSearchTermChange }) => (
    <div>
        filter shown with <input value={searchTerm} onChange={(e) => handleSearchTermChange(e)} />
    </div>
)

export default Filter