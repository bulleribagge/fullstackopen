import React from 'react'

const SearchResult = ({ countries, handleClick }) => (
    <ul>
        {countries.map(c => 
            <li>{c.name} <button onClick={(e) => handleClick(e, c.name)}>show</button></li>
        )}
    </ul>
)

export default SearchResult
